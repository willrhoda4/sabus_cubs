





/*
    A couple simple handlers to deal with Cloudinary uploads.
    See functions for slightly more detailed descriptions.
*/


  





import { v2 as 
         cloudinary   } from 'cloudinary';
import { Request, 
         Response,
         NextFunction } from 'express';





const cloud_name  =     process.env.CLOUDINARY_CLOUD_NAME;
const api_secret  =     process.env.CLOUDINARY_API_SECRET;
const api_key     =     process.env.CLOUDINARY_API_KEY;



// sends a bunch of parameters to the client, which are used to sign a request to Cloudinary.
// this is used to upload board member headshots straight from the admin dashboard.
function signature (request: Request, response: Response) {
    
    
    // we'll first pass this parameter object to the api_sign_request method.
    // then we'll bundle it with the api_key and signature, and send it as
    // a response object for the client to use in their upload request.
    const params     = {
                            public_id: request.body[0],
                            timestamp: Math.round((new Date).getTime() / 1000),
                            overwrite: true, 
                       }


    const signature  = cloudinary.utils.api_sign_request( params, api_secret as string );
    

    response.json({ api_key, signature, ...params });

}




// middleware function leveraged by newsRelease route to upload PDFs directly to Cloudinary.
// it uses the upload_stream method to pipe the buffer to Cloudinary.
// it then stashes the URL in response.locals for the next middleware to
// log in the database.
function upload(request : Request, response: Response, next: NextFunction) {

    console.log('uploading PDF to Cloudinary...');

    const customPublicId = `news_release_${request.body.headline.replace(/ /g, '_')}_${Date.now()}`;


    cloudinary.uploader.upload_stream(

        { 
            api_key, 
            api_secret, 
            cloud_name,
            resource_type: 'auto', 
            folder:        'news_releases',
            public_id:      customPublicId,
        },

        (err, result) => {

                 if (err)        return response.status(500).send('Error uploading to Cloudinary');

            else if (result) {         
                                        response.locals.pdf_url = result.url;
                                        next();
                             } 
            else             {   return response.status(500).send('Error getting response from Cloudinary');  }
        }

    ).end(response.locals.buffer);
}







export default { signature, upload };
