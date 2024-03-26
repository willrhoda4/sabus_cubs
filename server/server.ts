








// front door for the backend


// import the necessary modules
import path                     from 'path';
import cors                     from 'cors';
import express                  from 'express';
import bodyParser               from 'body-parser';
import compression              from 'compression';


// import Sentry for error logging
import * as Sentry              from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';


// configure your environment variables
import dotenv                   from 'dotenv';
       dotenv.config();
1

// import cron job update Instagram token monthly
import                                './cron/IGToken'


// import routers
import publicRouter              from './routers/public';
import stripeRouter              from './routers/stripe';
import adminRouter               from './routers/admin';



// the Stripe webhook handler is the only one that needs raw body buffer, not JSON,
// thus it's imported here so we can call it before bodyParser.json().
// all other handlers are managed at the route level, but we'll still import
// admin here so we can check for maintenance mode before serving the React app.
import stripeWh                  from './handlers/stripeWebhook';
import admin                     from './handlers/admin';








// ladies and gentlemen, start your app and initiate your middleware
const app = express();




// Sentry initialization
Sentry.init( {
  dsn: process.env.SENTRY_DSN,
  integrations: [
      new Sentry.Integrations.Http(    { tracing: true } ),
      new Sentry.Integrations.Express( { app           } ),
      new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate:   1.0, // capture 100% of the transactions
  profilesSampleRate: 1.0, // set sampling rate for profiling - this is relative to tracesSampleRate
} );




 // the request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
// tracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());




// Stripe webhook needs raw body buffer, not JSON, 
// so we have to call it before bodyParser.json()
app.post('/webhookListener', stripeWh.captureRawBody, stripeWh.handleWebhook);



// now we can use bodyParser.json() for the rest of the routes
app.use(bodyParser.json());
// sets up cors
app.use(cors());
// sets up gzip
app.use(compression());
// static file server setup for client-side assets
app.use(express.static(path.join(__dirname, '../dist')));
// Serve static files from the 'public' directory under '/public' path
app.use('/public', express.static(path.join(__dirname, 'public')));
// cache control for static assets
app.use((req, res, next) => {
  const staticAssetExtensions = ['.js', '.css', '.jpg', '.png', '.gif', '.jpeg'];
  if (staticAssetExtensions.some(ext => req.url.endsWith(ext))) {
    res.set('Cache-Control', 'public, max-age=86400'); // Cache for one day
  }
  return next();
});




// use routers with prefixes
app.use( '/public', publicRouter );
app.use( '/stripe', stripeRouter );
app.use( '/admin',  adminRouter  );



// check for construction mode before serving the React app
app.use(async (req, res, next) => {
  
  // if the request is for the admin panel, skip maintenance-mode check
  if (req.path.startsWith('/simba')) return next();

  // check maintenance mode
  const isMaintenanceMode = await admin.getMaintenanceMode();
  // and if it's on, return the maintenance page
  if   (isMaintenanceMode) return res.sendFile(path.join(__dirname, 'public/maintenance.html'));

  // otherwise, proceed to serve the React app
  return next();

} );




// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
} );





// Sentry error handler
// the error handler must be registered before 
// any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());



// // start the server
const server = app.listen( process.env.PORT || 3000, () => {

    const address = server?.address();

           // if the server is running, log the address.
           if (            typeof address      === 'string' ) { console.log(`Listening on ${address}`);                             }
      else if ( address && typeof address.port === 'number' ) { console.log(`Listening on http://localhost:${address.port} ...`)    }
      else                                                    { console.log('Server is null or undefined');                         }
} );



