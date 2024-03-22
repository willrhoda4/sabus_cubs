






// router middleware that handles routes for the admin dashboard.

// import the express module for router declaration.
import express           from 'express';


// import the handlers
import db                from '../handlers/database';
import auth              from '../handlers/auth';
import cloud             from '../handlers/cloudinary';
import admin             from '../handlers/admin';
import email             from '../handlers/email';
import newsRelease       from '../handlers/newsRelease';
import authenticateToken from '../handlers/jwt';


// initialize the router
const router = express.Router();

// middleware to authenticate admin routes
router.use(...authenticateToken('admin'));

// database routes
router.post('/getAdminData',              auth.checkTable, 
                                          db.getData                  ); // Admin data gopher. Allowed access to all existing tables via auth.checkTable
router.post('/deleteData',                db.deleteData               ); // Deletes data from the database
router.post('/reRankData',                db.reRankData               ); // Re-ranks data in the database
router.post('/addData',                   db.addData                  ); // Adds data to the database
router.put('/updateData',                 db.updateData               ); // Updates data in the database
router.post('/getDonationData',           admin.getDonationData       ); // Gets donation data from the database for the admin dashboard

// news release routes
router.post('/signature',                 cloud.signature             ); // Handles Cloudinary signatures for news release uploads
router.post('/generateNewsRelease',       newsRelease.generateHTML, 
                                          newsRelease.generatePDF, 
                                          cloud.upload, 
                                          email.deliverNewsRelease, 
                                          newsRelease.logger          ); // Generates a news release, uploads it to Cloudinary, emails a sample to the admin, and logs the release in the database
router.post('/publishNewsRelease',        email.deliverNewsRelease    ); // Emails a news release to a list of journalists, following admin approval

// maintenance mode route
router.post('/toggleMaintenanceMode',     admin.toggleMaintenanceMode ); // Toggles maintenance mode

export default router;
