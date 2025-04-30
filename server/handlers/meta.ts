








// this module contains the handlers for the Instagram token.

import   fs         from 'fs';
import   path       from 'path';
import   Axios      from 'axios';
import { Request, 
         Response } from 'express';
import   db         from './database';
import   email      from './email';



const { pool         } = db;
const { deliverEmail } = email;



// interface for Instagram token data
interface IGData {
  id:           string;
  token:        string;
  refresh_date: Date;
}




// helper function to retrieve the Instagram data from the database.
async function getIGTokenData(): Promise<IGData | null> {

    try {

        const { rows }  = await pool.query(`SELECT * FROM ig_token WHERE id = 'api_token'`);
        const tokenData = rows[0] as IGData;

        if (!tokenData) {

        console.error('No token data found');
        return null;
        }

        return tokenData;

    } catch (err) {

        console.error('Failed to retrieve data for Instagram token:', err);
        return null;
    }
}







// gets a new token from the Instagram API and updates the database.
async function refreshIGToken(currentToken: string): Promise<void> {


    
    // helper function to append log entries to the log file
    function logEntry ( message : string ) {

        // define the path for the log file
        const logFilePath = path.join(__dirname, './logs/IGToken.txt')
        const timestamp   = new Date().toISOString();
        const logMessage  = `${ timestamp } - ${ message }\n`;

        fs.appendFile(logFilePath, logMessage, (err) => {

            if (err) console.error('Failed to write to log file:', err);
        } );
    }


    // helper function to send an email notification
    async function sendEmailNotification ( error : string ) {

        //  
        const mailOptions = {

            from:     `"Sabu's Cubs" ${process.env.EMAIL}` || '',
            to:      'willrhoda4@gmail.com',
            subject: 'Failed to Refresh Instagram Token',
            text:    `An error occurred while refreshing the Instagram token: ${error}`,
        };
    
        try {

            await deliverEmail(mailOptions);
            console.log('Email notification sent.');
            
        } catch (err) { console.error( 'Failed to send email notification:', err ); }
    }
  

    const tokenGetter = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&&access_token=${currentToken}`;

    
    try {

        const { data }  = await Axios.get(tokenGetter);`"Skene Stunts" ${ process.env.EMAIL }`
        const newToken  = data.access_token;
        const newExpiry = data.expires_in;

        // Calculate new refresh date, 14 days before actual expiration
        const newRefreshDate = new Date();
              newRefreshDate.setSeconds( newRefreshDate.getSeconds() + newExpiry - 1209600 ); // 14 days buffer

        // Update the token in the database
        const updateQuery = `UPDATE ig_token SET token = $1, refresh_date = $2 WHERE id = 'api_token'`;
        await pool.query( updateQuery, [ newToken, newRefreshDate ] );

        // Log successi
        const        success = `Instagram token refreshed successfully.`;
        console.log( success );
        logEntry(    success );

    } catch ( error ) {

        const err = error as Error;
        
        console.error( 'Failed to refresh Instagram token:', err );
        logEntry( `Failed to refresh Instagram token: ${ err.message }`);

        // Send an email notification
        sendEmailNotification( err.message ); 
    }
}



// retrieves the Instagram token from the database and sends it to the client.
async function getIGToken( request: Request, response: Response ) {

    const tokenData = await getIGTokenData();

    if (!tokenData)   return response.status(500).send('Server error');

    const { token, refresh_date } = tokenData;

    response.json( { token } );

    // this is a redundancy that in theory should never see any action.
    // while our cron job should refresh the token monthly, this is a backup
    // that will refresh the token if it's within 14 days of expiration.
    if (new Date() >= new Date(refresh_date)) refreshIGToken(token);
    
}



// leveraged by cron job to update the Instagram token monthly.
// grabs the current token from the database and, as long as it
// exists, uses it to get a new token from the Instagram API.
async function updateIGToken () {

  const   tokenData = await getIGTokenData();

  if    (!tokenData)  return console.error('No token data found for refresh!');

  const { token }   = tokenData;

  await refreshIGToken(token);

}



export default { getIGToken, updateIGToken };




