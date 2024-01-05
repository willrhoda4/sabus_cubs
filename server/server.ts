







/**
 * this is the front door for the backend.
 * we initialize all middleware and declare all routes here.
 * handlers are imported from the handlers directory.
 */



// setup Sentry
import   * as Sentry            from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';


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


// import handlers                    
import    db             from './handlers/database';
import    meta           from './handlers/meta'; 
import    auth           from './handlers/auth'; 
import    admin          from './handlers/admin'; 
import    email          from './handlers/email';
import    cloud          from './handlers/cloudinary';
import    stripe         from './handlers/stripe';
import    stripeWh       from './handlers/stripeWebhook';
import    newsRelease    from './handlers/newsRelease';








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


// simple auth handlers for subscription updaates.
// we'll also handle donation inquiries from here.
app.post('/scheduleUpdate',         auth.scheduleUpdate,                              );
app.post('/verifyUpdate',           auth.verifyUpdate,                                );


app.post('/getDonationData',     admin.getDonationData,                               );


app.post('/checkPassword',       admin.getPasswordData,
                                 admin.checkPassword                                  ); // checks password for admin

app.post('/resetLink',           admin.registerReset,
                                 email.sendResetLink                                  ); // sends reset link to website email

app.post('/resetPassword',       admin.getTokenData,
                                 admin.verifyTokenData,
                                 admin.resetPassword                                  ); // resets password for admin

// news release handlers
app.post('/generateNewsRelease',    newsRelease.generateHTML,
                                    newsRelease.generatePDF,
                                    cloud.upload,
                                    email.deliverNewsRelease,
                                    newsRelease.logger,                               );

app.post('/publishNewsRelease',     email.deliverNewsRelease,                         );


// the error handler must be registered before 
// any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());




const server = app.listen( process.env.PORT || 3000, () => {

    const address = server?.address();

           if (            typeof address      === 'string' ) { console.log(`Listening on ${address}`);                             }
      else if ( address && typeof address.port === 'number' ) { console.log(`Listening on http://localhost:${address.port} ...`)    }
      else                                                    { console.log('Server is null or undefined');                         }
});