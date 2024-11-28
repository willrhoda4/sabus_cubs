






/**
 * endpoints for all things Stripe-related.
 * 
 * note that the getDonationData endpoint lives in handlers/admin.ts,
 * since it doesn't interact with Stripe directly.
 */






import   Stripe        from 'stripe';

import { Request, 
         Response  }   from 'express';





const stripe = new Stripe( process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2023-08-16', } );




// endpoint for one-time donations.
// registers a payment intent with stripe,
// then returns the client secret to the client.
async function oneTimeDonation (request : Request, response : Response) {



    console.log('\ncreating payment intent for a one-time donation...')


    try {

        
        const { name, email, amount, idempotencyKey } = request.body; 
    

        // create or retrieve a customer
        let customer;

        // check if the customer already exists
        const existingCustomers = await stripe.customers.list( { email } );

        // if the customer exists, use that customer.
        if (existingCustomers.data.length > 0) {  customer = existingCustomers.data[0]; } 
        
        // otherwise, create a new customer.
        else                                   {  customer = await stripe.customers.create({
                                                                                                name, 
                                                                                                email, 
                                                                                           });
                                               }

        // create a PaymentIntent with the order amount and currency,
        // and return the client secret to the client, if successful.
        const paymentIntent     = await stripe.paymentIntents.create(   {
                                                                            amount:    amount * 100,  // amount must be converted to cents 
                                                                            currency: 'cad',
                                                                            customer:  customer.id,
                                                                        }, 
                                                                        {  idempotencyKey } 
                                                                     );
        response.send( { clientSecret: paymentIntent.client_secret } );


        console.log('returning secret to client...\n')

    
    // return a 500 if anything goes wrong.
    } catch (error) { error instanceof Error  &&  response.status(500).send(error.message as string); console.log(error); }
}
                                  








    /**
     * helper function for startMonthlyDonations and manageSubscription.
     * 
     * in order to accommodate custom donation amounts,
     * we'll dynamically create a plan for any amount
     * that doesn't already exist.
     * 
     * vvvvv this helper function attempts to retrieve plan info from Stripe.
     * 
     *       if the plan doesn't exist, we create it.
     */
    async function getOrCreatePlan(amount: number) {


        // generates a plan ID based on the donation amount
        const planId  = `plan_${amount.toFixed(2).replace('.', '_')}`;  // e.g., 'plan_25_00' for $25.00


                         // attempt to retrieve plan info from Stripe.
                         // if successful, return the plan.
                         // if not, we'll handle it in the catch block.
        try           {  return await stripe.plans.retrieve(planId);  }
        
        catch (error) {

            // if we threw an error because the plan doesn't exist, create a new plan
            if (  error instanceof Stripe.errors.StripeError && 
                  error.statusCode === 404                   ){
                                                                return await stripe.plans.create({
                                                                                                    id:        planId,
                                                                                                    amount:    amount * 100,  // amount in cents
                                                                                                    currency: 'cad',
                                                                                                    interval: 'month',
                                                                                                    product: { name: `Monthly Donation of $${amount}` },
                                                                                                });
                                                              } 
            // for other errors, re-throw,
            else {  
                    console.error('Unexpected error setting up a monthly donation:', error);
                    throw error; 
                 }
        }
    }








// endpoint for monthly donations.
async function startMonthlyDonations(request: Request, response: Response) {


    console.log('setting up a monthly donation...\n');


    try {

        // destructuring the request body
        const { name, email, token, amount, idempotencyKey } = request.body;


        // retrieve an existing plan or create a new plan, 
        // based on the donation amount
        const plan     = await getOrCreatePlan(amount);


        // for the sake of simplicity, we will always create a customer,
        // even if this user has already made one-time donations in the past.
        const customer = await stripe.customers.create({
                                                            name,
                                                            email,
                                                            payment_method:     token,
                                                            invoice_settings: { default_payment_method: token },
                                                      });

        // create a subscription
        const subscription = await stripe.subscriptions.create( {         
                                                                    customer:     customer.id,
                                                                    items: [ {  plan: plan.id  } ],
                                                                },
                                                                {  idempotencyKey  }
                                                              );


       
        // return the subscription ID to the client
        response.send({ success: true, subscriptionId: subscription.id });



    } catch (error) {

        if ( error instanceof Error )   {
                                            console.error( error.message );
                                            response.status(500).send( { error: error.message } );
                                        } 
        else                            {
                                            console.error( error );
                                            response.status(500).send( { error: 'An unknown error occurred' } );
                                        }
    }
}
















// endpoint for managing subscriptions.
// allows the user to cancel their subscription or adjust the amount.
async function manageSubscription(request: Request, response: Response) {

        
    try {

        // destructure the request body
        const { action,  subscriptionId,  newAmount } = request.body;




        // Ensure action type is valid
        const   validAction          = [ 'adjust', 'cancel' ].includes( action );
               !validAction         &&  response.status( 400 ).send( { error: 'Invalid action type' } );
       
        
        // if it is, log a message to the consxole.
        console.log(`\n${action}ing subscription ${subscriptionId}...`)


        // fetch the existing subscription
        const   subscription          = await stripe.subscriptions.retrieve(subscriptionId);
        
        
        // Ensure the subscription exists and is active
        const   inactiveSubscription  = !subscription || subscription.status !== 'active'
                inactiveSubscription && response.status( 404 ).send( { error: 'Subscription not found or not active' } );


        // to adjust the amount, we'll need to update the subscription
        // using our getOrCreatePlan function.
        if ( action === 'adjust' ) {

            // ensure the new amount is valid
            const invalidAmount = !newAmount || newAmount <= 0
                  invalidAmount && response.status( 400 ).send( { error: 'Invalid new amount' } );
        

            // use your helper function to get or create a plan
            const newPlan = await getOrCreatePlan( Number( newAmount ) );
        

            // Update the subscription to use the new plan
            const updatedSubscription = await stripe.subscriptions.update(
                subscriptionId,
                {
                    items: [ { id: subscription.items.data[0].id, plan: newPlan.id } ]
                }
            );
        
            // confirm the update
            return response.send( { success: true, updatedSubscription } );
        
        } else {

            // cancel the subscription                  
            const cancelledSubscription = await stripe.subscriptions.cancel( subscriptionId );

            // confirm the cancellation
            return response.send({ success: true, cancelledSubscription });
        }

    } catch (error) {

        if ( error instanceof Error )   {
                                            console.error( error.message );
                                            response.status(500).send( { error: error.message } );
                                        } 
        else                            {
                                            console.error( error );
                                            response.status(500).send( { error: 'An unknown error occurred' } );
                                        }
    }
}








// endpoint for updating donee info.
// this includes the donee's name and email,
// but not the amount of their subscription,
// and not their credit card info.
async function updateDoneeInfo(request: Request, response: Response) {


    // destructure the request body 
    const  {  name, email, customerId,  } = request.body;


    
    // ensure all required fields are present before proceeding
    const missingFields = !customerId || !name || !email;

    // if not, return a 400.
    if  ( missingFields ) { 
                            console.error( 'Missing required fields for subscriber update.' );
                            return response.status( 400 ).send( { error: 'Missing required fields' } ); 
                          }

  
    // if so, log a message to the console.
    console.log(`\nupdating donee info for ${name}...`)
  

    // the rest is pretty self-explanatory.
    try {

        const values          = { name, email };

        const updatedCustomer = await stripe.customers.update( customerId, values );

        console.log('donee info updated.\n')
  
        response.status(200).send(updatedCustomer);


    } catch (error) {

      console.error('Stripe error:', error);

      response.status(500).send({ error: 'Internal Server Error' });

    }

}











// endpoint for updating credit card info
// for subscription donations
async function updateCreditCard(request: Request, response: Response) {


    // destructure the request body
    const { subscriptionId, customerId, token } = request.body;

  
    // ensure all required fields are present before proceeding
    const  missingFields = !customerId || !subscriptionId || !token;

    if   ( missingFields )  { 
                                console.error('update cancelled due to missing fields'); 
                                return response.status(400).send( { error: 'Missing required fields' } ); 
                            }

    // if not, log a message to the console.
    console.log(`\nupdating credit card for ${customerId}...`)


    // if so, proceed.
    try  {
        
        // Convert the token to a PaymentMethod
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: { token: token }
        });
        
        // Attach the new PaymentMethod to the customer
        await stripe.paymentMethods.attach(paymentMethod.id, { customer: customerId });

        // Update the subscription to use the new PaymentMethod
        const updatedSubscription = await stripe.subscriptions.update(subscriptionId, { default_payment_method: paymentMethod.id });

        console.log('credit card updated.\n')
        
        response.status(200).send(updatedSubscription);

    } catch (error) {

        console.error('Stripe error:', error);

        response.status(500).send({ error: 'Internal Server Error' });
    }
}















export default { 
                    oneTimeDonation, 
                    startMonthlyDonations, 
                    manageSubscription,
                    updateDoneeInfo,
                    updateCreditCard,
               }