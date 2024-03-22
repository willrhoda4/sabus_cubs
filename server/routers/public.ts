




// middleware for public routes (these don't require JWT authentication)


// import the express module for router declaration.
import express from 'express';

// import the handlers
import db     from '../handlers/database';
import meta   from '../handlers/meta';
import auth   from '../handlers/auth';
import admin  from '../handlers/admin'; // importing admin for use with authentication routes
import email  from '../handlers/email';
import stripe from '../handlers/stripe';

// initialize the router
const router = express.Router();



router.post('/getData',               auth.checkTable, 
                                      db.getData);                   // General data gopher. Allowed limited access via auth.checkTable

router.get('/getIGtoken',             meta.getIGToken);              // Meta API handler for Instagram token

// email routes
router.post('/email',                 email.formMail);               // Email form handler
router.post('/addEmail',              email.addEmail);               // Adds email to mailing list

// public stripe routes
router.post('/oneTimeDonation',       stripe.oneTimeDonation);       // One-time donation handler
router.post('/startMonthlyDonations', stripe.startMonthlyDonations); // Monthly donation handler

// public subscriber routes
router.post('/scheduleUpdate',        auth.scheduleUpdate);          // Delivers a login link for subscriber updates
router.post('/verifyUpdate',          auth.verifyUpdate);            // Verifies subscriber login link

// authentication routes
router.post('/checkPassword',         admin.getPasswordData, 
                                      admin.checkPassword);          // Checks password for admin
router.post('/resetLink',             admin.registerReset, 
                                      email.sendResetLink);          // Sends admin reset link to website email
router.post('/resetPassword',         admin.getTokenData, 
                                      admin.verifyTokenData,
                                      admin.resetPassword);          // Resets password for admin, and logs them in


export default router;
