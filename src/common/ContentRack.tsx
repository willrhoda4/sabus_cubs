









import { useState,
         useEffect   }      from 'react';


import   useContentControls from '../hooks/useContentControls';

import   Axios              from 'axios';

import { ContentRackProps } from '../types/content';

import   authToken          from '../utils/authToken';





export default function ContentRack<T>( { table, renderContent, wrapStyle } : ContentRackProps<T> ) : JSX.Element {



    const [ content,         setContent    ] = useState<T[]>([]);
    const   contentControls                  = useContentControls( getData, content.length );



    // requests FAQ data from server amd sets it to state
    function getData() {

        
        // we'll usually use the getData route
        let endpoint = 'public/getData';

        // and we won't need a config object for most racks.
        let config = {};

        // regardless of what table we're visiting, we'll
        // grab all the data and order by rank.
        const reqBody = [ table , undefined, { orderBy: 'rank' } ];

        // the journalists list requires JWT authentication, 
        // so we'll need to use the getAdminData endpoint.
        // we'll also need to append an authToken() to the request.
        if ( table === 'journalists' ) {

            endpoint = 'admin/getAdminData';
            config   =  authToken();
        }


        Axios.post(`${import.meta.env.VITE_API_URL + endpoint}`,    reqBody, config     )
             .then(   res => setContent(table === 'news_releases' ? res.data.reverse() 
                                                                  : res.data
                                       )                                                )
             .catch(  err => console.log(err )                                          );
    }

    // get content on initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getData() }, [] )


   

    return (

        <div className={ wrapStyle }>
            { content && content.map( ( content : T, index : number ) => <div key={index}>{renderContent(content, index, contentControls)}</div> ) }
        </div>

    )
}
