





/**
 * handler script for login routes.
 * 
 * in order to avoid clutter, this file is only for admin login routes,
 * while authentication routes for user subscription updates are handled
 * in server/handlers/auth.ts.
 */






import      jwt              from 'jsonwebtoken';

import      bcrypt           from 'bcrypt';

import      crypto           from 'crypto';

import      db               from './database';

import { 
            Request, 
            Response,
            NextFunction,    } from 'express';





// retrieves hashed password from database
// and stores it in response.locals.passwordData
// before tagging checkPassword in.
function getPasswordData ( request: Request, response: Response, next: NextFunction ) {


    console.log('Getting password data...');

    const email       =  request.body[0].email;
    const query       = `SELECT password FROM admin WHERE email = $1;`;

    const stashedPass = ( data: unknown[] ) => {   

        if ( data.length === 0 ) { 
                                    console.log('email not found in database.')
                                    return response.send('no user'); 
                                 }

        response.locals.password = ( data[0] as { password: string } ).password;
    };

    return db.simpleQuery( response, query, [ email ], stashedPass, next );
}




// helper function to generate JWT for admins.
// checkPassword and returnToken both use this.
function adminJWT ( email: string ) {

    const payload = {
        email: email,
        role: 'admin' 
    };

    return jwt.sign( payload, process.env.JWT_SECRET as string, { expiresIn: '2h' } ); 
}




// receives a password from the client and 
// compares it to the hashed password retrieved by getPasswordData.
async function checkPassword ( request: Request, response: Response ) {



    console.log('Checking password...');



    const email    : string = request.body[0].email;
    const password : string = request.body[0].password;
    const passHash : string = response.locals.password;

    try {

        const match = await bcrypt.compare(password, passHash);

        if (match)  {
                        console.log('passwords match!');

                        const           token = adminJWT(email);
                        response.json({ token }); // Send the token to the client
                    } 
        else        {
                        console.log(  'invalid password.'  );
                        response.send('invalid');
                    }
    } catch (error) {

        if ( error instanceof Error )   {
                                            console.error('Password verification error: ', error.message );
                                            response.status(500).send('validation failed');
                                        } 
        else                            {
                                            console.error( error );
                                            response.status(500).send('an unknown error occurred.');
                                        }
    }
}

    
   







// generates an admin reset token and stores it in the database,
// then stores the token in response.locals.resetToken
// before tagging sendResetLink in (lives in email handlers script).
function registerReset ( request: Request, response: Response, next: NextFunction ) {

    const                 date = Date.now();
    const                email = request.body[0];
    const           resetToken = crypto.randomBytes(32).toString("hex");
    response.locals.resetToken = resetToken;        console.log(resetToken, response.locals.resetToken);

    const query                = `UPDATE admin SET reset_token = $1, reset_at = $2 WHERE email = $3 RETURNING id;`;

    const stashData            = (data : unknown[]) => { console.log('DEE DATA: ', data); response.locals.resetId = ( data[0] as { id: number } ).id;}

    return db.simpleQuery(   response,
                             query,
                           [ resetToken, date, email  ],
                             stashData,
                             next
                         );
}




// retrieves the reset token from the database
// and stores it in response.locals.tokenData
// before tagging verifyTokenData in.
function getTokenData ( request: Request, response: Response, next: NextFunction ) {


    console.log('Grabbing token data...');

    const id        = request.body[2];

    const query     = `SELECT * FROM admin WHERE id = $1;`;

    const stashData = (data : unknown[]) => response.locals.tokenData = data[0];

    return db.simpleQuery( response, query, [ id ], stashData, next);
}

//[ formState.password, token, id ]



// compares the reset token passed from the client
// to the reset token retrieved by getTokenData.
// if the tokens match, the token is valid.
// if the token is valid, verifyTokenData tags resetPassword in.
function verifyTokenData ( request: Request, response: Response, next: NextFunction ) {


    console.log('Verifying validity of token...'); console.log(response.locals.tokenData);

    const passedToken  = request.body[1];
    const stashedToken = response.locals.tokenData.reset_token;
    
    const generatedAt  = response.locals.tokenData.reset_at;
    const expiry       = Date.now() - 900000; // 15 minutes

         if (passedToken !== stashedToken)  { return response.send('invalid token'); }  // if the tokens don't match, it's a scam.
    else if (generatedAt  <  expiry      )  { return response.send('expired token'); }  // if the token is expired, they're too slow.
    else                                    { next();                                }  // otherwise, move on to resetPassword.
}




// third stop after checkPassword and verifyTokenData.
// hashes the new password and stores it in the database,
// then passes the request returnToken to wrap things up.
async function resetPassword ( request: Request, response: Response, next: NextFunction ) {

    console.log('Resetting password...');
    
    const id         =  request.body[2];
    const newPass    =  request.body[0];
    const hashedPass =  await bcrypt.hash(newPass, 10);
    const query      = `UPDATE admin SET password = $1 WHERE id = $2;`


    return db.simpleQuery(    response,
                              query,
                            [ hashedPass, id  ],
                              undefined,
                              next
                         );
}


// last stop after resetPassword.
// generates a new JWT and sends it to the client.
function returnToken ( request : Request, response : Response ) {


    console.log('Returning token...');

    const email = request.body[1];


    const           token = adminJWT(email);
    response.json({ token }); // Send the token to the client

}






// retrieves donation data from the database
// for the admin dashboard.
// sends different columns back depending on the type of data requested.
function getDonationData ( request : Request, response : Response ) {


    const type = request.body[0];

    const validType = type === 'donees'
                   || type === 'donations'
                   || type === 'subscriptions';

    if (!validType) return response.status(400).send('invalid type');

    const query = type === 'donees'             ?  `SELECT name, 
                                                           email, 
                                                           created_on 
                                                     FROM  donees;`

                : type === 'donations'          ?  `SELECT donees.name, 
                                                           donations.date,
                                                           donations.amount,
                                                           donations.subscription_id 
                                                      FROM donations
                                                      JOIN donees
                                                        ON donations.customer_id = donees.customer_id;`
              
                :                                   `SELECT donees.name,
                                                            subscriptions.amount,
                                                            subscriptions.created_on,
                                                            subscriptions.cancelled_on,
                                                            subscriptions.cancelled_because
                                                       FROM subscriptions
                                                       JOIN donees
                                                         ON subscriptions.customer_id = donees.customer_id;`

    return db.simpleQuery( response, query );

}






  
export default  { 
                   getTokenData,
                   checkPassword, 
                   registerReset,
                   resetPassword,
                   returnToken,
                   verifyTokenData,
                   getPasswordData,
                   getDonationData,
                };





