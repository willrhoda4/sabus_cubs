









import { useState,
         useEffect   }      from 'react';

import   useContentControls from '../hooks/useContentControls';

import   Axios              from 'axios';

import { ContentRackProps } from '../types/content';






export default function ContentRack<T>( { table, renderContent } : ContentRackProps<T> ) : JSX.Element {



    const [ content,         setContent    ] = useState<T[]>([]);
    const   contentControls                  = useContentControls( getData, content.length );



    // requests FAQ data from server amd sets it to state
    function getData() {

        const reqBody = [ table , undefined, { orderBy: 'rank' } ];

        Axios.post(`${import.meta.env.VITE_API_URL}getData`, reqBody )
             .then(   res => setContent(res.data)                    )
             .catch(  err => console.log(err )                       );
    }

    // get content on initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getData() }, [] )




    return (

        <div className='my-12'>
            { content && content.map( ( content : T, index : number ) => renderContent(content, index, contentControls) ) }
        </div>

    )
}
