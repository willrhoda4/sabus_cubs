




// router middleware that handles routes for the Stripe API.

// import the express module for router declaration.
import express           from 'express';

// import the handlers
import stripe            from '../handlers/stripe';
import authenticateToken from '../handlers/jwt';

// initialize the router
const router = express.Router();

// middleware to authenticate Stripe routes
router.use(...authenticateToken('subscriber'));

// Stripe-specific routes
router.post('/manageSubscription', stripe.manageSubscription    ); // Deals with cancellations and amount adjustments
router.post('/updateDoneeInfo',    stripe.updateDoneeInfo       ); // Handles email/name updates
router.post('/updateCreditCard',   stripe.updateCreditCard      ); // Handles credit card updates



export default router;
