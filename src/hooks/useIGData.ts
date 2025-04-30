




/**
 * 
 * for a simple gallery like this, we can use Instagram Basic Display API.
 * once we connect the IG account to the app as a test user,
 * we can get a token through the Long Lived Key Generator and we're in business.
 */




import { useState, 
         useEffect } from 'react';

import   Axios       from 'axios';

import   validate from '../utils/validate';



interface IGDataProps {

    [key: string]: string;
    
    media_url:  string;
    media_type: string;
    caption:    string;
}




// retrieves a token from the server,
// then uses it to fetch data from Instagram,
// then returns an array of image urls.
export default function useIGData () {


    const [photoData, setPhotoData] = useState(null);

    
    useEffect(() => {

        const fetchIGTokenAndData = async () => {

            try             {
                                // start by requesting a token from the server
                                const response    = await Axios.get(`${import.meta.env.VITE_API_URL}public/getIGToken`);
                                const token       = response.data.token;
                                
                                // then use the token to fetch data from Instagram
                                const gramGetter  = `https://graph.instagram.com/me/media?fields=media_url,media_type,caption&access_token=${token}`;
                                const igResponse  = await Axios.get(gramGetter);
                                // filter out any that are videos or not valid urls.
                                // then, extract the urls from array of objects in response
                                const igUrls      = igResponse.data.data.filter( ( item: IGDataProps ) => validate('url', item.media_url) && 
                                                                                                          item.media_type !== 'VIDEO' 
                                                                               )
                                                                           .map( ( item: IGDataProps ) => item.media_url );
                               
                                // then set the state with the array of urls.
                                setPhotoData(igUrls);
                            } 
            catch (error)   {
                                console.error('Failed to fetch Instagram data:', error);
                            }
        };

        // call the function on initial render
        fetchIGTokenAndData();

    }, []);

    // return the array of urls
    return photoData ?? [];

}



