





/**
 * handlers for all email-related requests.
 */



import      db               from './database';

import      nodemailer       from 'nodemailer';
import { 
            Request, 
            Response,
            NextFunction, 
                           } from 'express';







type MailOptions = {
    from:            string,
    to:              string,
    subject?:        string,
    text?:           string,
    html?:           string,
    attachments?: { filename: string, path: string, encoding: string }[]
};




// helper leveraged by all mailer functions to deliver email via nodemailer
// accepts a MailOptions object and returns a promise.
async function deliverEmail(options : MailOptions, cleanUp? : () => void): Promise<void> {

    const transporter = nodemailer.createTransport({

        host:  'smtp.gmail.com',
        port:   465,
        secure: true,
        auth:   {
                    user: process.env.EMAIL,
                    pass: process.env.EMAILPASS
                }
    } );

    return new Promise((resolve, reject) => {

        transporter.sendMail(options, (err, info) => {

            if (err) {
                        console.error(`Error sending email: ${err.message}`);
                        reject(err);
                     } 
            else     {
                        console.log(`Email sent: ${info.response}`);
                        cleanUp && cleanUp()
                        resolve();
                     }
        } );
    } );
}






// receives email from contact form and sets it to the email address in the .env file.
async function formMail(request: Request, response: Response) {


    console.log('\nreceiving a note from the email form...\n');


    const { 
            email, 
            message, 
            subject,

          } = request.body;


    const   options: MailOptions = {

        from:     email,
        to:       process.env.EMAIL || '',
        subject: `WEBSITE MSG: ${subject}`,
        text:     message
    };


    try           {
                        await deliverEmail(options);
                        response.send(`Message successfully received from ${email}.`);
                  } 
    catch (error) {
                        response.status(400).send(`Error receiving message from ${email}`);
                  }
}






// emails a login link to subscribers who wish to update or cancel their subscription.
async function updateMail(email: string, token: string, res: Response) {


    console.log('\nsending out a subscription-update link...\n');

    const updateURL = `${process.env.URL}/subscription-update?token=${token}`;

    const message   = `Click the link below to update your subscription preferences:\n\n${updateURL}`;

    const htmlMessage = `
        <p>You can update your subscription preferences using the link below:</p>
        <a href="${updateURL}" style="color: #1a73e8; text-decoration: none;">Update Subscription</a>
        <p>If you did not request this email, you can safely ignore it.</p>
        <p>Thank you!</p>
    `;

    const options: MailOptions = {
        from: process.env.EMAIL || '',
        to: email,
        subject: `Subscription Update`,
        text: message, // Fallback for email clients that don't support HTML
        html: htmlMessage,
    };

    try           {
                    await deliverEmail(options);
                    res.send(`Update link successfully sent to ${email}.`);
                  } 
    catch (error) {
                    res.status(400).send(`Error scheduling update for ${email}`);
                  }
}







/**
 * delivers news releases generated by the admin panel.
 * 
 * it first gets called immediately after the release is generated,
 * to send a sample to the admin for review.
 * 
 * following admin approval, it gets called again with the 
 * publish prop, which sends it to all the journalists in the database.
 */
async function deliverNewsRelease(request: Request, response: Response, next: NextFunction) {


    if (process.env.EMAIL === undefined) { return response.status(400).send('No email address found.'); }

    console.log('emailing news release...');

    // tracks how many releases failed to send.
    let     errorCount                = 0;

    // if publish is true, the release will be sent to all the journalists in the database.
    // if publish is false, the release will be sent to the admin for review.
    const   publish                   = request.body.publish;

    // if we're publishing, the data came from the client in the request body.
    // otherwise, the previous middleware stashed it in response.locals.
    const   source                    = publish ? request.body : response.locals;

    // destructure the source object.
    const { id, headline, pdf_url, html } = source;


    // helper function that gets called directly to send a sample,
    // or gets called by deliverToJournalists to send the full release.
    async function deliver( email : string ) {


        const mailOptions: MailOptions = {

            from:      `"Sabu's Cubs" ${process.env.EMAIL}` || '',
            to:          email,
            subject:    `NEWS RELEASE: ${headline}`,
            html:        html,
            attachments: [ {
                            filename: `${headline}.pdf`,
                            path:      pdf_url,
                            encoding: 'base64'
                         } ]
        };

        try           {  await deliverEmail( mailOptions );  }

        catch (error) {  publish  ?  errorCount++  
                                  :  response.status(400).send('Newsletter delivery failed'); 
                      }
    }
    



    // helper function that gets called if publish is true,
    // to send the release to all the journalists in the database.
    async function deliverToJournalists( data: unknown ) {

        const { rows }        =  data as { rows: { email: string }[] };

        const   emailPromises = rows.map( ( row: { email: string } ) => deliver( row.email ) );

        await Promise.all( emailPromises );

        response.send(`Newsletter delivered to ${rows.length} journalists with ${errorCount} errors.`);

    }


    // if publish is false, send a sample to the admin for review.
    // otherwise, send the release to all the journalists in the database.
    if (!publish) {     
                        deliver(process.env.EMAIL);  
                        next();
                  }
    else          {
                        const emails = await db.pool.query(`SELECT email FROM journalists;`);
                        deliverToJournalists(emails);
                        db.pool.query('UPDATE news_releases SET published = true WHERE id = $1;', [ id ]);
                  }
}





// sends a reset link from the website's gmail account.
function sendResetLink( request: Request, response: Response ) {


    console.log('preparing to send reset link...');  console.log(response.locals);

    const email = request.body[0];

    const url   = `${process.env.URL}/simba?id=${response.locals.resetId}&token=${response.locals.resetToken}`;

    const resetLinkOptions = {      
                                to:        email as string,
                                from:    `"Sabu's Cubs" ${process.env.EMAIL}`,
                                subject:  `Password Reset`,
                                text:     `Reset your password here => ${url}`
                            } 
    
    const cleanUp = () => response.send('reset link sent');

    deliverEmail(resetLinkOptions, cleanUp);
}





function addEmail( request: Request, response: Response ) {

    // Extract the email from the request body 
    const email = request.body[0];

    // Define the SQL query for inserting the email
    const query = 'INSERT INTO emails (email) VALUES ($1)';

    // Define the parameters to be used in the SQL query
    const parameters = [ email ];

    // Call simpleQuery to execute the insertion
    db.simpleQuery(response, query, parameters);
}






export default  { 
                    addEmail,
                    formMail, 
                    updateMail,
                    deliverEmail,
                    sendResetLink,
                    deliverNewsRelease, 
                };











