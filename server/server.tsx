





// configure your environment variables
import dotenv from 'dotenv';
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
import    db             from './handlers/database.js';
import    email          from './handlers/email.js';




// we'll need this to set up a static file server.
// because it's not commonjs, we have to use the fileURLToPath 
// and dirname functions to get the directory name.
const __dirname = dirname(fileURLToPath(import.meta.url));

// ladies and gentlemen, start your app and initiate your middleware
const app = express();     
                     
      app.use(cors());    

      app.use(compression());     // sets up gzip

      app.use(bodyParser.json());   
    
      app.use(express.static(path.resolve(__dirname, "../build")));   //  <== sets up a static file server

      app.use((req, res, next) => {  //  vvv sets up cache control headers for static assets

        const staticAssetExtensions = ['.js', '.css', '.jpg', '.png', '.gif', '.jpeg'];

        if (staticAssetExtensions.some(ext => req.url.endsWith(ext))) {
          res.set('Cache-Control', 'public, max-age=86400'); // Cache for one day
        }
      
        next();
      });

// test route
app.get('/check', ( req: Request, res: Response ) => 
                  { console.log('hello!'); res.send('Hello, world!');  }                       );

// database handlers
app.post('/getData',             db.getData                             );
app.post('/deleteData',          db.deleteData                          );
app.post('/reRankData',          db.reRankData                          );
app.post('/addData',             db.addData                             );
app.put( '/updateData',          db.updateData                          );


// email handler
app.post('/email',               email.emailHandler                     );











const server = app.listen( process.env.PORT || 3000, () => {

    const address = server?.address();

           if ( typeof address === 'string' )                 { console.log(`Listening on ${address}`);                             }
      else if ( address && typeof address.port === 'number' ) { console.log(`Listening on http://localhost:${address.port} ...`)    }
      else                                                    { console.log('Server is null or undefined');                         }
});