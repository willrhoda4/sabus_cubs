







import   Stripe             from 'stripe';

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
        
        





        // Create or retrieve a customer
        let customer;

        const existingCustomers = await stripe.customers.list({ email });

        if (existingCustomers.data.length > 0) {  customer = existingCustomers.data[0]; } 
        
        else                                   {  customer = await stripe.customers.create({
                                                                                                name, 
                                                                                                email, 
                                                                                           });
                                               }



        response.locals.customerId = customer.id;
        
        const paymentIntent     = await stripe.paymentIntents.create(   {
                                                                            amount: amount * 100,  // amount must be converted to cents 
                                                                            currency: 'cad',
                                                                            customer: customer.id,
                                                                        }, 
                                                                        {  idempotencyKey } 
                                                                     );
        response.send( { clientSecret: paymentIntent.client_secret } );
        console.log('returning secret to client...\n')

    

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


                             // attempt to retrieve plan info from Stripe
        try           {  return await stripe.plans.retrieve(planId);  }
        
        catch (error) {

            // if the plan doesn't exist, create a new plan
            if (  error instanceof Stripe.errors.StripeError && 
                  error.statusCode === 404                   ){
                                                                return await stripe.plans.create({
                                                                                                    id:        planId,
                                                                                                    amount:    amount * 100,  // Amount in cents
                                                                                                    currency: 'cad',
                                                                                                    interval: 'month',
                                                                                                    product: { name: `Monthly Donation of $${amount}` },
                                                                                                });
                                                              } 
            // Otfor other errors, re-throw
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

        const { name, email, token, amount, idempotencyKey } = request.body;


        // Retrieve an existing plan or create a new plan, 
        // based on the donation amount
        const plan     = await getOrCreatePlan(amount);


        // Create a customer
        const customer = await stripe.customers.create({
                                                            name,
                                                            email,
                                                            payment_method:     token,
                                                            invoice_settings: { default_payment_method: token },
                                                      });

        // Create a subscription
        const subscription = await stripe.subscriptions.create( {         
                                                                    customer:   customer.id,
                                                                    items: [ {  plan: plan.id  } ],
                                                                },
                                                                {  idempotencyKey  }
                                                              );

        response.locals.customerId     =               customer.id;

        response.locals.subscriptionId =               subscription.id;
        
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

















async function manageSubscription(request: Request, response: Response) {

        
    try {

        const { action,  subscriptionId,  newAmount } = request.body;

        console.log(`\n${action}ing subscription ${subscriptionId}...`)
        console.log(request.body);


        // Ensure action type is valid
        const   validAction       = ['adjust', 'cancel'].includes(action);
               !validAction      && response.status(400).send({ error: 'Invalid action type' });
       

        // Fetch the existing subscription
        const   subscription       = await stripe.subscriptions.retrieve(subscriptionId);
        
        
        // Ensure the subscription exists and is active
        const   inactiveSubscription  = !subscription || subscription.status !== 'active'
                inactiveSubscription && response.status(404).send({ error: 'Subscription not found or not active' });



        if (action === 'adjust') {

            const invalidAmount = !newAmount || newAmount <= 0

            invalidAmount && response.status(400).send({ error: 'Invalid new amount' });
        
            // Use your existing helper function to get or create a plan
            const newPlan = await getOrCreatePlan(Number(newAmount));
        
            // Update the subscription to use the new plan
            const updatedSubscription = await stripe.subscriptions.update(
                subscriptionId,
                {
                    items: [{ id: subscription.items.data[0].id, plan: newPlan.id }]
                }
            );
        
            // Confirm the update
            return response.send({ success: true, updatedSubscription });
        
        } else {

            // Cancel the subscription                  
            const cancelledSubscription = await stripe.subscriptions.cancel(subscriptionId);

            // Confirm the cancellation
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









async function updateDoneeInfo(request: Request, response: Response) {


    const  {  name, email, customerId,  } = request.body;

    console.log(`\nupdating donee info for ${name+customerId+email}...`)
  
    const missingFields = !customerId || !name || !email;

    if  ( missingFields ) { 
                            console.error('Missing required fields for subscriber update.');
                            return response.status(400).send( { error: 'Missing required fields' } ); 
                          }
  
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












async function updateCreditCard(request: Request, response: Response) {


    const { subscriptionId, customerId, token } = request.body;

    console.log(`\nupdating credit card for ${customerId}...`)
  
    const  missingFields = !customerId || !subscriptionId || !token;

    if   ( missingFields )  { 
                                console.error('update cancelled due to missing fields'); 
                                return response.status(400).send( { error: 'Missing required fields' } ); 
                            }
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