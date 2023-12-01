









import { useEffect } from 'react';



const useScrollToUrlParam = ( paramName : string ) : void => {


    useEffect(() => {


        const paramValue = new URLSearchParams( window.location.search ).get( paramName );
        
        if  ( paramValue ) {

            const element = document.getElementById( paramValue );

            if  ( element ) {
                  element.scrollIntoView( { behavior: 'smooth' } );
            }
        }
    }, [ paramName ]);
};

export default useScrollToUrlParam;

