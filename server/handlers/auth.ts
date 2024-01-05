









import   db              from './database';
import   email           from './email';

import { Request, 
         Response      } from 'express';
import { v4 as uuidv4  } from 'uuid';

const  { pool          } = db;

const  { updateMail    } = email;







async function scheduleUpdate(request: Request, response: Response) {




    try {

            const { email }    = request.body;

            console.log(`scheduling a subscription update for ${email}...`);

            const checkQuery   = `
                                    SELECT donees.id 
                                    FROM donees
                                    JOIN subscriptions ON donees.customer_id = subscriptions.customer_id
                                    WHERE donees.email = $1;
                                 `;

            const checkResult  = await pool.query(checkQuery, [ email ]);
            
            const updateExits  = checkResult.rows.length > 0;

            if  (!updateExits) { return response.status(400).send('No subscription attached to that email exists.'); }

            const doneeId      = checkResult.rows[0].id;

            const token        = uuidv4();

            const tokenExpiry = Math.floor(Date.now() / 1000) + 3600;  // Current time + 1 hour, in seconds

            const updateQuery  = `
                                    INSERT INTO updates (donee_id, token, token_expiry)
                                    VALUES ($1, $2, $3)
                                    ON CONFLICT (donee_id)
                                    DO UPDATE SET token = $2, token_expiry = $3;
                                 `;

            await pool.query(updateQuery, [doneeId, token, tokenExpiry]);

            // Send an email to the user with the tokenized link.
            // the function will handle sending a response
            // to the client during cleanup.
            updateMail(email, token, response);


    } catch (error) {

        console.error(error);

        response.status(500).send('Internal server error.');

    }

}








async function verifyUpdate(request: Request, response: Response) {








   
    try {




         // Query to check the validity and expiry of the token
         const tokenQuery  =  `
                                SELECT *
                                FROM updates
                                WHERE token = $1 AND token_expiry > EXTRACT(EPOCH FROM NOW());
                              `;
     

        const tokenResult  = await pool.query( tokenQuery, [ request.body.token ]);

        const validToken   = tokenResult.rows.length > 0;

        if ( !validToken ) { return response.status(400).send( 'Invalid or expired token.' ); }

        const doneeId      = tokenResult.rows[0].donee_id;

        // Query to retrieve the donee data
        const doneeQuery   = `  SELECT donees.name, donees.email, donees.customer_id, subscriptions.subscription_id
                                FROM   donees
                                JOIN   subscriptions
                                ON     donees.customer_id = subscriptions.customer_id
                                WHERE  donees.id = $1;
                             `;

        const doneeResult  = await pool.query( doneeQuery, [ doneeId ] );

        const noDonee      = doneeResult.rows.length === 0;

        if  ( noDonee )    { return response.status(500).send('Donee not found.'); }


        response.send(doneeResult.rows[0]);

    } catch (error) {

        console.error(error);

        response.status(500).send('Server error.');

    }
}




export default { scheduleUpdate, verifyUpdate }