



import   db         from './database.ts';

import   ejs        from 'ejs';
import   pdf        from 'html-pdf';


import { Request,
         Response, 
         NextFunction } from 'express';






function generateHTML(request: Request, response: Response, next: NextFunction) {


    console.log('generating HTML for a news release...')

    const {
            date, 
            content,
            headline 
          } = request.body;


    const   template = `
                            <html>
                            <head>
                                <title><%= headline %></title>
                            </head>
                            <body>
                                <h1><%= headline %></h1>
                                <p><%= content %></p>
                                <p>Date: <%= date %></p>
                            </body>
                            </html>
                       `;

    response.locals.html = ejs.render( template, { date, content, headline } );

    next();

    }



function generatePDF(request: Request, response: Response, next: NextFunction) {

    console.log('generating a PDF with the HTML...')

    pdf.create(response.locals.html).toBuffer( (err: Error, buffer: Buffer ) => {

        if (err) return response.status(500).send('Error generating PDF');
        
        else  {
                        response.locals.buffer = buffer;
                        next();
              }   
    });
}
        

function logger( request: Request, response: Response ) {


    console.log('logging a news release in the database...');

const   {
            date,
            content,
            headline, 

        } = request.body;

const   {
            html,
            pdf_url,

        } = response.locals;


const     query  =   `
                        INSERT INTO news_releases ( date, html, content, headline, pdf_url)
                        VALUES ($1, $2, $3, $4, $5)
                    `;

const parameters = [ date, html, content, headline, pdf_url ];

db.simpleQuery(response, query, parameters, undefined);

// note that simple query will handle delivering the response to the client.
}




export default { 
                    generateHTML, 
                    generatePDF, 
                    logger,
               }