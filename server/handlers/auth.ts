






/**
 * a couple of handlers to deal with subscription updates.
 * 
 * scheduleUpdate sends an email to the user with a tokenized link.
 * 
 * verifyUpdate verifies the tokenized link, and sends the user's
 * subscription data back to the client, along with a JWT.
 * 
 * we also house our checkTable function here, which 
 * checks if a table exists on a whitelist, but
 * doesn't exist on a black list.
 * we use this to validate getData queries from the client.
 */







import   jwt             from 'jsonwebtoken';

import   db              from './database';
import   email           from './email';

import { Request, 
         Response,
         NextFunction  } from 'express';
import { v4 as uuidv4  } from 'uuid';

const  { pool          } = db;

const  { updateMail    } = email;






// sends a tokenized link to the user's email address.
async function scheduleUpdate ( request: Request, response: Response ) {




    try {

            // destructure the email from the request body
            const { email }    = request.body;

            console.log(`scheduling a subscription update for ${email}...`);

            // check if there is a subscription attached to that email address.
            const checkQuery   = `
                                    SELECT donees.id 
                                    FROM donees
                                    JOIN subscriptions ON donees.customer_id = subscriptions.customer_id
                                    WHERE donees.email = $1;
                                 `;

            // if there is no subscription, return an error.
            const checkResult  = await pool.query(checkQuery, [ email ]);
            
            // if ther'es a row, there's a subscription.
            const updateExits  = checkResult.rows.length > 0;

            // if there's no subscription, return an error.
            if  (!updateExits) { return response.status(400).send('No subscription attached to that email exists.'); }

            // if there is a subscription, get the donee id,
            // and generate a token and a token expiry.
            const doneeId      = checkResult.rows[0].id;

            const token        = uuidv4();

            const tokenExpiry = Math.floor(Date.now() / 1000) + 3600;  // Current time + 1 hour, in seconds

            const updateQuery  = `
                                    INSERT INTO updates (donee_id, token, token_expiry)
                                    VALUES ($1, $2, $3)
                                    ON CONFLICT (donee_id)
                                    DO UPDATE SET token = $2, token_expiry = $3;
                                 `;

            // insert the token and token expiry into the database.
            await pool.query(updateQuery, [doneeId, token, tokenExpiry]);

            // Send an email to the user with the tokenized link.
            // the function will handle sending a response
            // to the client during cleanup.
            updateMail(email, token, response);


    } catch (error) {

        console.error(error);

        // if there's an error, send a 500 response.
        response.status(500).send('Internal server error.');

    }

}







// verifies the tokenized link, and sends the user's
// subscription data back to the client, along with a JWT.
async function verifyUpdate ( request: Request, response: Response ) {





    // destructure the email from the request body
    const { email }    = request.body;



    // helper function to generate JWT for subscribers.
    function subscriberJWT ( email: string ) {

        const payload = {
            email: email,
            role: 'subscriber' 
        };

        return jwt.sign( payload, process.env.JWT_SECRET as string, { expiresIn: '1h' } ); 
    }



   
    try {




         // query to check the validity and expiry of the token
         const tokenQuery  =  `
                                SELECT *
                                FROM updates
                                WHERE token = $1 AND token_expiry > EXTRACT(EPOCH FROM NOW());
                              `;
     

        const tokenResult  = await pool.query( tokenQuery, [ request.body.token ]);

        const validToken   = tokenResult.rows.length > 0;
        
        // if the token is invalid or expired, return an error.
        if ( !validToken ) { return response.status(400).send( 'Invalid or expired token.' ); }


        // if the token is valid, get the donee id,
        const doneeId      = tokenResult.rows[0].donee_id;

        // and query to retrieve the donee data
        const doneeQuery   = `  SELECT donees.name, donees.email, donees.customer_id, subscriptions.subscription_id
                                FROM   donees
                                JOIN   subscriptions
                                ON     donees.customer_id = subscriptions.customer_id
                                WHERE  donees.id = $1;
                             `;

        const doneeResult  = await pool.query( doneeQuery, [ doneeId ] );

        const noDonee      = doneeResult.rows.length === 0;

        // if there's no donee, return an error.
        if  ( noDonee )    { return response.status(500).send('Donee not found.'); }

        // if there is a donee, send the donee data and a JWT to the client,
        response.json( {  doneeInfo: doneeResult.rows[0], token: subscriberJWT(email) } );

    } catch (error) {

        console.error(error);

        response.status(500).send('Server error.');

    }
}




// we use this to validate getData and getAdminData queries.
// for getData, we only allow access to a whitelist of tables.
// for getAdminData, we allow access to the whitelist and a graylist.
function checkTable ( request : Request, response : Response, next : NextFunction ) {


    const path  : string = request.path;
    const table : string = request.body[0];                     console.log(`checking table ${table} for ${path}...`)


    const whitelist : string[] = [ 
                                    'board',
                                    'items',
                                    'updates',
                                    'news_releases',
                                    'faq',
                                    'ig_token',
                                    'stories',
                                    'admin', 
                                    'site_settings',
                                 ];  // since site_settings' only job is tracking maintenance mode, we'll include it here for convenience.
                                     // if we graylist it, we windup with a race condition when we try moving to the admin dashboard.

    const graylist  : string[] = [
                                    'journalists',
                                    'emails',
                                    'donees',
                                    'donations',
                                    'subscriptions',
                                 ];

    // if we don't meet muster, return an error.
    if ( 
            ( path === '/getData'      && !whitelist.includes(table)                              )
         || ( path === '/getAdminData' && !whitelist.includes(table) && !graylist.includes(table) )
    
    )    { console.log('error!!!'); return response.status(400).send('invalid table');                                     }   


    // otherwise, move on to the next handler.
    next();

}



export default { scheduleUpdate, verifyUpdate, checkTable }