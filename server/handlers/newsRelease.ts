



import   db         from './database';

import   ejs        from 'ejs';
// import   pdf        from 'html-pdf';


import { Request,
         Response, 
         NextFunction   } from 'express';



import { execFile       } from 'child_process';
import { tmpdir         } from 'os';
import { mkdtempSync, 
         writeFileSync, 
         readFileSync, 
         rmSync         } from 'fs';
import { join           } from 'path';
         

// first stop for generateNewsRelease.
// generates html and passes it to generatePDF
function generateHTML(request: Request, response: Response, next: NextFunction) {


    console.log('generating HTML for a news release...')

    const {
            date, 
            content,
            headline 
           } = request.body;


    const   template = `

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title><%= headline %></title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                .header-table {
                    width: 100%;
                    margin-bottom: 10px;
                }
                .header-table td {
                    padding: 0;
                }
                .news-release {
                    font-style: italic;
                    font-size: 24px;
                    padding-left: 10px;
                }
                .logo {
                    text-align: right;
                    padding-right: 10px;
                    height: 70px;
                }
                .logo img {
                    max-height: 70px;
                }
                .headline {
                    text-align: center;
                    font-size: 20px;
                    margin: 0;
                    padding: 10px 0;
                }
                .dateline {
                    font-style: italic;
                    color: grey;
                    font-size: 0.8em; 
                }
                .content {
                    white-space: pre-line;
                    font-size: 0.8em; 
                }
                .boilerplate {
                    font-style: italic;
                    margin-top: 20px;
                    font-size: 0.7em; 
                    border: 2px solid #A62826;
                    padding: 10px;
                }
                .end-notation {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 0.8em; 
                }
                .brand-line {
                    height: 2px;
                    background-color: #A62826;
                    margin: 10px 0;
                }

                @media screen {
                    .dateline, .content, .boilerplate, .end-notation {
                        font-size: 1.2em; /* larger size for screen (email) */
                    }
                }
            
                @media print {
                    .dateline, .content, .boilerplate, .end-notation {
                        font-size: 0.7em; /* smaller size for print (PDF) */
                    }
                }
            </style>
        </head>
        <body>
            <table class="header-table">
                <tr>
                    <td class="news-release">News Release</td>
                    <td class="logo"><img src="https://res.cloudinary.com/sabus-cubs/image/upload/v1/logo_small" alt="Sabu's Cubs Logo"></td>
                </tr>
            </table>
            <div class="brand-line"></div>
            <h1 class="headline"><%= headline %></h1>
            <p class="dateline">Winnipeg, <%= new Date().toLocaleDateString() %></p>
            <div class="content">
                <%= content %>
            </div>
            <div class="boilerplate">
                <p>Sabu’s Cubs is a Winnipeg-based non-profit focused on empowering the youth of today to strengthen their communities and become the leaders of tomorrow. Based in the Point Douglas neighbourhood, we provide mentorship for young people, do weekly community walks and garbage clean up, and pass out hot meals to our hungry friends in the area. To find out more about Sabu's Cubs, visit <a href="https://www.sabuscubs.com/">www.sabuscubs.com</a>. Inquiries will be happily received at <a href="mailto:sabus.cubs.website@gmail.com">sabus.cubs.website@gmail.com</a>.</p>
            </div>
            <p class="end-notation">–30–</p>
        </body>
        </html>
    
     `;
   

    response.locals.html = ejs.render( template, { date, content, headline } );

    next();

    }










function generatePDF( request: Request, response: Response, next: NextFunction ) {
  
  
  console.log('generating a PDF with the HTML...');

  try {

    /*
    we'll use temporary files to store the HTML and PDF
    for wkhtmltopdf to work with.

    ultimately, we'll delete the temp files and us response.locals
    in accordance with the previous middleware pattern.
    */
    const tmpDir   = mkdtempSync( join( tmpdir(), 'pdfgen-' ) );
    const htmlPath = join( tmpDir, 'news-release.html' );
    const pdfPath  = join( tmpDir, 'news-release.pdf'  );

    // write HTML from previous middleware into temp file
    writeFileSync( htmlPath, response.locals.html );

    // generate the PDF using wkhtmltopdf:
    execFile( 'wkhtmltopdf', [ htmlPath, pdfPath ], ( err ) => {
      
        if ( err ) {
            console.error( 'wkhtmltopdf error:', err );
            return response.status(500).send( 'Error generating PDF' );
        }

        const pdfBuffer        = readFileSync( pdfPath );
        response.locals.buffer = pdfBuffer;

      // clean up temp files:
      rmSync( tmpDir, { recursive: true, force: true } );
    
      // keep the party moving:
      next();
    
    } );
  } catch ( error ) {

    console.error( 'Unexpected error during PDF generation:', error );
    return response.status( 500 ).send( 'Internal Server Error' );
  }
}















// last stop for generateNewsRelease.
// logs the news release in the database.
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
                        INSERT INTO news_releases ( date, html, content, headline, pdf_url, published)
                        VALUES ($1, $2, $3, $4, $5, $6)
                    `;

// published is false by default, and will remain false until the admin publishes.
const parameters = [ date, html, content, headline, pdf_url, false ];


// note that simple query will handle delivering the response to the client.
db.simpleQuery(response, query, parameters, undefined);
}




export default { 
                    generateHTML, 
                    generatePDF, 
                    logger,
               }