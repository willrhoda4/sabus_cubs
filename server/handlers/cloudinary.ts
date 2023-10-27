


  





import { v2 as 
         cloudinary  } from 'cloudinary';
import { Request, 
         Response    } from 'express';





const signature = (request: Request, response: Response) => {
    
    
    const apiSecret  =     process.env.CLOUDINARY_API_SECRET;
    const api_key    =     process.env.CLOUDINARY_API_KEY;


    const params     = {
                            public_id: request.body[0],
                            timestamp: Math.round((new Date).getTime() / 1000),
                            overwrite: true, 
                       }


    const signature  = cloudinary.utils.api_sign_request(params, apiSecret as string);
    
    
    response.json({ api_key, signature, ...params });
}

export default { signature };