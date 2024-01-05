






import   db                 from './database';

import   Stripe             from 'stripe';

import { Request, 
         Response,
         NextFunction,  }   from 'express';




const stripe = new Stripe( process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2023-08-16', } );








// this middleware adds a rawBody property to the request object,
// which is necessary for verifying webhook signatures,
// so we run captureRawBody before the webhook handler.
// the declaration below extends the Request interface,
// so that TypeScript knows about the new property.
declare module 'express-serve-static-core' {

    interface Request {
      rawBody?: string;
    }
}

function captureRawBody(request: Request, response: Response, next: NextFunction) : void {       

    console.log('preparing raw body for Stripe webhook...');

    let data = '';

    request.on('data', chunk => {

        data += chunk;
    });

    request.on('end', () => { 

        request.rawBody = data;
        next();
    });
}










// Define the structure of the event data
interface EventData {
    id                  : string;
    customer?           : string;
    amount?             : number;
    email?              : string;
    name?               : string;
    receipt_url?        : string;
    items?              : { data: { price: { unit_amount: number } }[] };
    [key: string]       : unknown;  // Allows for other properties
}




/**
 * this is a catch-all webhook handler for Stripe.
 * 
 * it listens for six events, each of which is handled by a helper function.
 * a switch statement determines which helper function to call.
 */
async function handleWebhook(request: Request, response: Response): Promise<void> {


    

    // helper function to help helper functions handle errors
    function errorHandler(error: Error): void {


        if ( error instanceof Error )   {
                                            console.error( error.message );
                                            response.status(500).send( { error: error.message } );
                                        } 
        else                            {
                                            console.error( error );
                                            response.status(500).send( { error: 'An unknown error occurred' } );
                                        }
    }


    // helper function to help helper functions executing queries
    async function executeQuery(query: string, params: unknown[]): Promise<void> {

        const pool    = db.pool;

        try           { await     pool.query(query,  params); } 
        catch (error) {         errorHandler(error as Error); }

    }







    
    async function customerCreated(eventData: EventData): Promise<void> {
    
        const { id, email, name } = eventData; 
    
        const query = `INSERT INTO donees (name, email, customer_id)
                       VALUES ($1, $2, $3)
                       ON CONFLICT (customer_id) DO NOTHING`;
    
        const params =  [name, email, id ];
    
        await executeQuery(query, params);
    }

    
    async function customerUpdated(eventData: EventData): Promise<void> {
    
        const { id, email, name } = eventData;
    
        const query = `UPDATE donees 
                       SET name = $1, email = $2 
                       WHERE customer_id = $3`;
    
        const params = [name, email, id];
    
        await executeQuery(query, params);
    }

    
    async function subscriptionCreated(eventData: EventData): Promise<void> {
    
        const { customer, id } = eventData;


        const amount = eventData.items?.data[0]?.price?.unit_amount;
       
    
        const query = `INSERT INTO subscriptions (customer_id, subscription_id, amount)
                       VALUES ($1, $2, $3)`;
    
        const params = [ customer, id, amount ];
    
        await executeQuery(query, params);
    }

    
    async function subscriptionUpdated(eventData: EventData): Promise<void> {
    
        const id     = eventData.id;

        const amount = eventData.items?.data[0]?.price?.unit_amount;
    
        const query  = `UPDATE subscriptions 
                        SET amount = $1 
                        WHERE subscription_id = $2`;
    
        const params = [amount, id];
    
        await executeQuery(query, params);
    }

    
    async function subscriptionDeleted(eventData: EventData): Promise<void> {
    
        const { id } = eventData;
    
        const query  = `UPDATE subscriptions 
                        SET cancelled_on = NOW()
                        WHERE subscription_id = $1`;
    
        const params = [ id ];
    
        await executeQuery(query, params);
    }

    
    async function chargeSucceeded(eventData: EventData): Promise<void> {
    
        const { customer, id, amount } = eventData;
    
        const query  = `INSERT INTO donations (customer_id, donation_id, amount)
                        VALUES ($1, $2, $3)`;
    
        const params = [ customer, id, amount ];
    
        await executeQuery(query, params);
    }

    










    const whSecret      = process.env.WEBHOOK_SECRET          as string;
    const sigHeader     = request.headers['stripe-signature'] as string;

    try {

        const event     = await stripe.webhooks.constructEventAsync(request.rawBody as string, sigHeader, whSecret);
        const eventData = event.data.object as EventData;

        console.log('event type: ', event.type);

        switch (event['type']) {

            case 'customer.created':
                        console.log('event data: ', eventData);

                await customerCreated(eventData);
                break;
            
            case 'customer.updated':
                        console.log('event data: ', eventData);

                await customerUpdated(eventData);
                break;
            
            case 'customer.subscription.created':
                        console.log('event data: ', eventData);

                await subscriptionCreated(eventData);
                break;
            
            case 'customer.subscription.updated':
                        console.log('event data: ', eventData);

                await subscriptionUpdated(eventData);
                break;
            
            case 'customer.subscription.deleted':
                        console.log('event data: ', eventData);

                await subscriptionDeleted(eventData);
                break;
            
            case 'charge.succeeded':
                        console.log('event data: ', eventData);

                await chargeSucceeded(eventData);
                break;
            
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        response.json({ received: true });

    } catch (error) { errorHandler(error as Error); }

}






export default  {
                    captureRawBody,
                    handleWebhook
                }
