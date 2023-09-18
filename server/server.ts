


import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.get('/about', (req: Request, res: Response) => {
  res.send('This is the about page.');
});

app.get('/contact', (req: Request, res: Response) => {
  res.send('Please contact us at contact@example.com.');
});



const server = app.listen( process.env.PORT || 3000, () => {

    const address = server?.address();

           if ( typeof address === 'string' )                 { console.log(`Listening on ${address}`);                             }
      else if ( address && typeof address.port === 'number' ) { console.log(`Listening on http://localhost:${address.port} ...`)    }
      else                                                    { console.log('Server is null or undefined');                         }
  });