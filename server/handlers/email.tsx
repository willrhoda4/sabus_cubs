







import    nodemailer   from 'nodemailer';

  
import  { Request,
          Response }   from 'express';


// takes care of all email endpoints
function emailHandler (req : Request, res : Response) {

    console.log('launching the emailHandler...');



    const { 
            // cc,
            // name, 
            // type,
            email, 
            // token, 
            // phone,
            // origin,
            // invite,
            message, 
            // resetId,
            subject  } = req.body


    type mailOptions = {       
                            from:     string,
                            to:       string,
                            subject?: string,
                            text?:    string,
                            html?:    string
                       }

    // helper function that delivers email using nodemailer
    async function deliverEmail (   response        : Response, 
                                    options         : mailOptions,  
                                    successMsg      : string, 
                                    errorMsg        : string, 
                                    cleanUpSuccess? : (...args: unknown[]) => unknown, 
                                    cleanUpError?   : (...args: unknown[]) => unknown
                                ) {

        // create  transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({

                                                            host:  'smtp.gmail.com',
                                                            port:   465,
                                                            secure: true,
                                                            auth:   {
                                                            user:     process.env.EMAIL,
                                                            pass:     process.env.EMAILPASS 
                                                                    }
                                                    });

        // send mail with defined transport object
        return new Promise((resolve, reject) => {

            transporter.sendMail(options, (err, info) => {

                // if there's an error, log it and send a response or run cleanUpError if it exists.
                if (err) { console.error(`\n${errorMsg}\n${err.message}`);

                    if (!cleanUpError)   {    return response.status(400).send(errorMsg);   }
                    else                 {    cleanUpError();                               }
                    reject(err);
                } 
                // if there's no error, log it and send a response or run cleanUpSuccess if it exists.
                else     {    console.log(`\n${successMsg}\n${info.response}`);

                    if (!cleanUpSuccess) {    return response.send(successMsg);             }
                    else                 {    cleanUpSuccess();                             }                     
                    resolve(info);
                }
            });
        });
    }          


    // receives email from contact form
    async function formMail() {

  



        const options : mailOptions= {       from: email,
                                               to: process.env.EMAIL || '',
                                          subject: `WEBSITE MSG: ${subject}`,
                                             text: message
                                     };
        
        deliverEmail(   res, 
                        options,
                        `Message succesfully received from ${email}.`, 
                        `Error receiving message from ${email}`
                    );
    }

    formMail()
}


export default { emailHandler };
