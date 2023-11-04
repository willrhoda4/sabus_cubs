









import      db               from './database.ts';

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





async function deliverEmail(options: MailOptions): Promise<void> {

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
                        resolve();
                     }
        } );
    } );
}




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





async function updateMail(email: string, token: string, res: Response) {


    console.log('\nsending out a subscription-update link...\n');

    const updateURL = `http://localhost:5173/subscription-update?token=${token}`;

    const message   = `Click the link below to update your subscription preferences:\n\n${updateURL}`;

    const options: MailOptions = {

        from:     process.env.EMAIL || '',
        to:       email,
        subject: `Subscription update`,
        text:     message
    };


    try           {
                    await deliverEmail(options);
                    res.send(`Update link successfully sent to ${email}.`);
                  } 
    catch (error) {
                    res.status(400).send(`Error scheduling update for ${email}`);
                  }
}






async function deliverNewsRelease(request: Request, response: Response, next: NextFunction) {


    if (process.env.EMAIL === undefined) { return response.status(400).send('No email address found.'); }

    console.log('emailing news release...');

    let     errorCount                = 0;

    const   publish                   = request.body.publish;

    const   source                    = publish ? request.body : response.locals;

    const { headline, pdf_url, html } = source;


    async function deliver( email : string ) {


        const mailOptions: MailOptions = {

            from:        process.env.EMAIL || '',
            to:          email,
            subject:    `NEWS RELEASE: ${headline}`,
            html:        html,
            attachments: [ {
                            filename: `${headline}.pdf`,
                            path:      pdf_url,
                            encoding: 'base64'
                         } ]
        };

        try           {  await deliverEmail(mailOptions);  }

        catch (error) {  publish  ?  errorCount++  
                                  :  response.status(400).send('Newsletter delivery failed'); 
                      }
    }



    async function deliverToJournalists(data: unknown) {

        const { rows } =  data as { rows: { email: string }[] };

        const             emailPromises = rows.map((row: { email: string }) => deliver(row.email));

        await Promise.all(emailPromises);

        response.send(`Newsletter delivered to ${rows.length} journalists with ${errorCount} errors.`);

    }



    if (!publish) {     
                        deliver(process.env.EMAIL);  
                        next();
                  }
    else          {
                        const emails = await db.pool.query(`SELECT email FROM journalists;`);
                        deliverToJournalists(emails);
                  }
}




export default  { 
                    formMail, 
                    updateMail, 
                    deliverNewsRelease 
                };

















// import    nodemailer   from 'nodemailer';

  
// import  { NextFunction, Request,
//           Response }   from 'express';








// type mailOptions = {       
//     from:     string,
//     to:       string,
//     subject?: string,
//     text?:    string,
//     html?:    string
// }

// // helper leveraged by all mailer functions to deliver email via nodemailer
// async function deliverEmail (   response        : Response, 
//                                 options         : mailOptions,  
//                                 successMsg      : string, 
//                                 errorMsg        : string, 
//                                 cleanUpSuccess? : (...args: unknown[]) => unknown, 
//                                 cleanUpError?   : (...args: unknown[]) => unknown
//                             ) {

//     // create  transporter object using the default SMTP transport
//     const transporter = nodemailer.createTransport({

//                                                 host:  'smtp.gmail.com',
//                                                 port:   465,
//                                                 secure: true,
//                                                 auth:   {
//                                                 user:     process.env.EMAIL,
//                                                 pass:     process.env.EMAILPASS 
//                                                         }
//                                         });

//     // send mail with defined transport object
//     return new Promise((resolve, reject) => {

//         transporter.sendMail(options, (err, info) => {

//             // if there's an error, log it and send a response or run cleanUpError if it exists.
//             if (err) { console.error(`\n${errorMsg}\n${err.message}`);

//                 if (!cleanUpError)   {    return response.status(400).send(errorMsg);   }
//                 else                 {    cleanUpError();                               }
//                 reject(err);
//             } 
//             // if there's no error, log it and send a response or run cleanUpSuccess if it exists.
//             else     { console.log(`\n${successMsg}\n${info.response}`);

//                 if (!cleanUpSuccess) {    return response.send(successMsg);             }
//                 else                 {    cleanUpSuccess();                             }                     
//                 resolve(info);
//             }
//         });
//     });
// }          

















// // receives email from contact form
// function formMail (req : Request, res : Response) {

    
    
//     console.log('\nreceiving a note from the email form...\n');

//     const { email,  message, subject  } = req.body


//     const options : mailOptions= {     from: email,
//                                          to: process.env.EMAIL || '',
//                                     subject: `WEBSITE MSG: ${subject}`,
//                                        text: message
//                                  };
    
//     deliverEmail(    res, 
//                      options,
//                     `Message succesfully received from ${email}.`, 
//                     `Error receiving message from ${email}`
//                 );


// }





// // receives email from contact form
// function updateMail ( email : string, token : string, res : Response ) {

    
    
//     console.log('\nsending out a subscription-update link...\n');

//     const updateURL = `http://localhost:5173/subscription-update?token=${token}`;

//     const message   = `Click the link below to update your subscription preferences:\n\n${updateURL}`;

//     const options : mailOptions= {     from:  process.env.EMAIL || '',
//                                          to:  email,
//                                     subject: `subscription update`,
//                                        text:  message
//                                  };
    
//     deliverEmail(    res, 
//                      options,
//                     `Update link successfully sent to ${email}.`, 
//                     `Error scheduling update for ${email}`
//                 );


// }




// async function deliverNewsRelease ( request : Request, response : Response, next : NextFunction ) {





//     console.log('emailing news release...');


//     if (process.env.EMAIL === undefined) { return response.status(400).send('No email address found.'); }

//     const mailOptions = {
//                                    from:  process.env.EMAIL,
//                                      to:  process.env.EMAIL,      
//                                 subject: 'News Release',
//                                    html:  response.locals.html,
//                             attachments: [{
//                                             filename: 'news-release.pdf',
//                                                 path:  response.locals.pdfUrl,
//                                             encoding: 'base64',
//                                           }],
//                         };
    
//     await deliverEmail(  
//                             response,
//                             mailOptions, 
//                             'Newsletter delivered successfully', 
//                             'Newsletter delivery failed'
//                         );

//     next();
// }








// export default { 
//                     formMail, 
//                     updateMail, 
//                     deliverNewsRelease, 
//              };
