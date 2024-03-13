







/**
 * this is the front door for the backend.
 * we initialize all middleware and declare all routes here.
 * handlers are imported from the handlers directory.
 */



// setup Sentry
import   * as Sentry            from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';


// configure your environment variables
import   dotenv                 from 'dotenv';
         dotenv.config();
         

import   express, 
       { Request, 
         Response }             from 'express';

import   path                   from 'path';

import   cors                   from 'cors';
import   bodyParser             from 'body-parser';
import   compression            from 'compression';


// import handlers                    
import    db                    from './handlers/database';
import    meta                  from './handlers/meta'; 
import    auth                  from './handlers/auth'; 
import    admin                 from './handlers/admin'; 
import    email                 from './handlers/email';
import    cloud                 from './handlers/cloudinary';
import    stripe                from './handlers/stripe';
import    stripeWh              from './handlers/stripeWebhook';
import    newsRelease           from './handlers/newsRelease';

// and the authentication middleware
import    authenticateToken     from './handlers/jwt'; 






// ladies and gentlemen, start your app and initiate your middleware
const app = express(); 


      // Sentry initialization
      Sentry.init( {

        dsn: process.env.SENTRY_DSN,

        integrations: [
          
          // enable HTTP calls tracing
          new Sentry.Integrations.Http( { tracing: true } ),

          // enable Express.js middleware tracing
          new Sentry.Integrations.Express( { app } ),

          new ProfilingIntegration(),
        ],

        // Performance Monitoring
        tracesSampleRate:   1.0,  // capture 100% of the transactions
        profilesSampleRate: 1.0,  // set sampling rate for profiling - this is relative to tracesSampleRate

      } );


      // the request handler must be the first middleware on the app
      app.use(Sentry.Handlers.requestHandler());

      // tracingHandler creates a trace for every incoming request
      app.use(Sentry.Handlers.tracingHandler());


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
      app.use(express.static(path.join(__dirname, '../build')));

      // sets up cache control headers for static assets
      app.use((req, res, next) => {  

        const staticAssetExtensions = ['.js', '.css', '.jpg', '.png', '.gif', '.jpeg'];

        if (staticAssetExtensions.some(ext => req.url.endsWith(ext))) {
          res.set('Cache-Control', 'public, max-age=86400'); // Cache for one day
        }
      
        next();
      });







// logs request bodies to the console for debugging vvvvv
// app.use((req, res, next) => {
//   console.log('Another request!.\nRequest body:', req.body);
//   next();
// });




// test routes

// general test route
app.get('/check', ( req: Request, res: Response ) => 
                  { console.log('hello!'); res.send('Hello, world!');  }              );

// Sentry test route
app.get('/debug-sentry', () => { throw new Error("My first Sentry error!"); }         );





console.log('before routes');

// public routes
// these routes are not protected by JWT authentication.
app.post('/getData',                auth.checkTable, 
                                    db.getData                                        ); // general data gopher. allowed restricted access via auth.checkTable
app.get('/getIGtoken',              meta.getIGtoken                                   ); // Meta API handlers\
app.post('/email',                  email.formMail                                    ); // email form handler
app.post('/oneTimeDonation',        stripe.oneTimeDonation,                           ); // one-time donation handler
app.post('/startMonthlyDonations',  stripe.startMonthlyDonations,                     ); // monthly donation handler
app.post('/scheduleUpdate',         auth.scheduleUpdate,                              ); // delivers a login link for subscriber updates
app.post('/verifyUpdate',           auth.verifyUpdate,                                ); // verifies subscriber login link
app.post('/checkPassword',          admin.getPasswordData,
                                    admin.checkPassword                               ); // checks password for admin

app.post('/resetLink',              admin.registerReset,
                                    email.sendResetLink                               ); // sends admin reset link to website email

app.post('/resetPassword',          admin.getTokenData,
                                    admin.verifyTokenData,
                                    admin.resetPassword                               ); // resets password for admin, and logs them in


// Stripe API handlers
// ( 3/5 anyway, oneTimeDonation and startMonthlyDonations are in the public section )
// these routes are protected by authentication,
// and are only accessible with valid subscriber tokens.
app.post('/manageSubscription',     ...authenticateToken('subscriber'),
                                       stripe.manageSubscription,                     );  // deals with cancellations and amount adjustments.
app.post('/updateDoneeInfo',        ...authenticateToken('subscriber'),
                                       stripe.updateDoneeInfo,                        );  // handles email/name updates
app.post('/updateCreditCard',       ...authenticateToken('subscriber'),
                                       stripe.updateCreditCard,                       );  // handles credit card updates




// admin routes
// these routes are protected by authentication,
// and are only accessible with a valid admin token.
// we'll handle this with global middleware.
app.use( ...authenticateToken('admin') );


// database handlers
app.post('/getAdminData',           auth.checkTable, 
                                    db.getData                                        );  // admin data gopher. alloed access to all exising table via auth.checkTable.
app.post('/deleteData',             db.deleteData                                     );  // deletes data from the database
app.post('/reRankData',             db.reRankData                                     );  // re-ranks data in the database
app.post('/addData',                db.addData                                        );  // adds data to the database
app.put( '/updateData',             db.updateData                                     );  // updates data in the database


app.post('/signature',              cloud.signature                                   );  // handles Cloudinary signatures for 
                                                                                          // news release uploads


app.post('/getDonationData',     admin.getDonationData,                               ); // gets donation data from the database
                                                                                         // for the admin dashboard



// news release handlers
app.post('/generateNewsRelease',    newsRelease.generateHTML,
                                    newsRelease.generatePDF,
                                    cloud.upload,
                                    email.deliverNewsRelease,
                                    newsRelease.logger,                               );  // generates a news release, uploads it to Cloudinary, 
                                                                                          // emails a sample to the admin, and logs the release in the database.ds

app.post('/publishNewsRelease',     email.deliverNewsRelease,                         );  // emails a news release to a list of journalists, following admin approval.




// the error handler must be registered before 
// any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());





// start the server
const server = app.listen( process.env.PORT || 3000, () => {

    const address = server?.address();

           // if the server is running, log the address.
           if (            typeof address      === 'string' ) { console.log(`Listening on ${address}`);                             }
      else if ( address && typeof address.port === 'number' ) { console.log(`Listening on http://localhost:${address.port} ...`)    }
      else                                                    { console.log('Server is null or undefined');                         }
});