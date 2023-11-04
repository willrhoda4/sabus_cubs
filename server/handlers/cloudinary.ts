


  





import { v2 as 
         cloudinary   } from 'cloudinary';
import { Request, 
         Response,
         NextFunction } from 'express';





const cloud_name  =     process.env.CLOUDINARY_CLOUD_NAME;
const api_secret  =     process.env.CLOUDINARY_API_SECRET;
const api_key     =     process.env.CLOUDINARY_API_KEY;



function signature (request: Request, response: Response) {
    
    

    const params     = {
                            public_id: request.body[0],
                            timestamp: Math.round((new Date).getTime() / 1000),
                            overwrite: true, 
                       }



    const signature  = cloudinary.utils.api_sign_request( params, api_secret as string );
    
    

    response.json({ api_key, signature, ...params });
}




// upload function leveraged by newsRelease route.
function upload(request : Request, response: Response, next: NextFunction) {

    console.log('uploading PDF to Cloudinary...');

    cloudinary.uploader.upload_stream(

        { 
            api_key, 
            api_secret, 
            cloud_name,
            resource_type: 'raw', 
            folder:        'news_releases',
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
