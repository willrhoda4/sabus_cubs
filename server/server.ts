





// configure your environment variables
import   dotenv          from 'dotenv';
         dotenv.config();
         

import   express, 
       { Request, 
         Response }      from 'express';

import   path            from 'path';
import   cors            from 'cors';
import   bodyParser      from 'body-parser';
import   compression     from 'compression';

import { dirname }       from 'path';
import { fileURLToPath } from 'url';

// import handlers                    
import    db             from './handlers/database.ts';
import    meta           from './handlers/meta.ts'; 
import    auth           from './handlers/auth.ts'; 
import    email          from './handlers/email.ts';
import    cloud          from './handlers/cloudinary.ts';
import    stripe         from './handlers/stripe.ts';
import    stripeWh       from './handlers/stripeWebhook.ts';
import    newsRelease    from './handlers/newsRelease.ts';





// we'll need this to set up a static file server.
// because it's not commonjs, we have to use the fileURLToPath 
// and dirname functions to get the directory name.
const __dirname = dirname(fileURLToPath(import.meta.url));



// ladies and gentlemen, start your app and initiate your middleware
const app = express();     


      // Stripe webhook needs raw body buffer, not JSON, 
      // so we have to call it before bodyParser.json()
      app.post( '/webhookListener', 
                stripeWh.captureRawBody, 
                stripeWh.handleWebhook  
              );                   
      
      app.use(cors());    

      //sets up gzip
      app.use(compression()); 

      //sets up body parser to convert request bodies to JSON
      app.use(bodyParser.json());   
    
      // sets up a static file server
      app.use(express.static(path.resolve(__dirname, "../build")));   

      // sets up cache control headers for static assets
      app.use((req, res, next) => {  

        const staticAssetExtensions = ['.js', '.css', '.jpg', '.png', '.gif', '.jpeg'];

        if (staticAssetExtensions.some(ext => req.url.endsWith(ext))) {
          res.set('Cache-Control', 'public, max-age=86400'); // Cache for one day
        }
      
        next();
      });

      // logs request bodies to the console for debugging
      // app.use((req, res, next) => {
      //   console.log('Another request!.\nRequest body:', req.body);
      //   next();
      // });

// test route
app.get('/check', ( req: Request, res: Response ) => 
                  { console.log('hello!'); res.send('Hello, world!');  }              );

// database handlers
app.post('/getData',                db.getData                                        );
app.post('/deleteData',             db.deleteData                                     );
app.post('/reRankData',             db.reRankData                                     );
app.post('/addData',                db.addData                                        );
app.put( '/updateData',             db.updateData                                     );


// email handler
app.post('/email',                  email.formMail                                    );


// Cloudinary signature handler
app.post('/signature',              cloud.signature                                   );


// Meta API handlers
app.get('/getIGtoken',              meta.getIGtoken                                   );


// Stripe API handlers
app.post('/oneTimeDonation',        stripe.oneTimeDonation,                           );
app.post('/startMonthlyDonations',  stripe.startMonthlyDonations,                     );
app.post('/manageSubscription',     stripe.manageSubscription,                        );  // deals with cancellations and amount adjustments.
app.post('/updateDoneeInfo',        stripe.updateDoneeInfo,                           );
app.post('/updateCreditCard',       stripe.updateCreditCard,                          );


// simple auth handlers for subscription updaates
app.post('/scheduleUpdate',         auth.scheduleUpdate,                              );
app.post('/verifyUpdate',           auth.verifyUpdate,                                );


// news release handlers
app.post('/generateNewsRelease',    newsRelease.generateHTML,
                                    newsRelease.generatePDF,
                                    cloud.upload,
                                    email.deliverNewsRelease,
                                    newsRelease.logger,                                );

app.post('/publishNewsRelease',     email.deliverNewsRelease,                          );




const server = app.listen( process.env.PORT || 3000, () => {

    const address = server?.address();

           if (            typeof address      === 'string' ) { console.log(`Listening on ${address}`);                             }
      else if ( address && typeof address.port === 'number' ) { console.log(`Listening on http://localhost:${address.port} ...`)    }
      else                                                    { console.log('Server is null or undefined');                         }
});