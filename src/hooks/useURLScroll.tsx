









/**
 * useURLScroll - A custom hook for scrolling to specific page sections based on URL parameters.
 *
 * The hook listens for click events within `nav` elements and URL changes. When a click event
 * occurs within a `nav` element or the URL changes, it checks for the presence of a specified URL
 * parameter (default: 'section'). If this parameter is found, it scrolls to the corresponding
 * section of the page based on the parameter value, which should match the CSS ID of the target
 * element.
 *
 * @param {string} [paramName='section'] - The name of the URL parameter to check for.
 *
 * Usage:
 * 
 * 1. Import the hook: import { useURLScroll } from './path-to-hook';
 * 2. Call the hook in your component: useURLScroll();      
 *    (or useURLScroll('myParam');, if section doesn't work for you)
 * 3. Ensure your `nav` elements contain links or buttons that update 
 *    the URL with the desired parameter when clicked.
 * 4. Ensure the target sections have CSS IDs that match the possible values of the URL parameter.
 *
 * Example:
 * - URL: /page?section=example
 * - HTML: <section id="example">...</section>
 */





import { useEffect   } from 'react';
import { useLocation } from 'react-router-dom';







export default function useURLScroll(paramName: string = 'section'): void {



    const location = useLocation();



    useEffect(() => {


        const handleClick = ( event : Event ) => {

            // Only proceed if the click event originated within a nav element
            if ( event.currentTarget && ( event.currentTarget as HTMLElement ).nodeName === 'NAV' ) {
    
                const params  = new URLSearchParams(location.search);
    
                const section = params.get(paramName);
    
                if  ( section ) {
    
                    const element =  document.getElementById(   section   );
                          element &&  element.scrollIntoView( { behavior: 'smooth' } );
                }
            }
        };
    

               // Add a click event listener to all nav elements
               const navElements = document.querySelectorAll( 'nav' );

                     navElements.forEach( nav => nav.addEventListener( 'click', handleClick ) );
        
        return () => navElements.forEach( nav => nav.removeEventListener( 'click', handleClick ) );
    

    }, [ location, paramName ] );  // Dependency array ensures this runs when location or paramName changes



    
    useEffect(() => {

        // This will run whenever the location changes
        const params  = new URLSearchParams(location.search);

        const section = params.get(paramName);

        
        if  ( section ) {

            const element =  document.getElementById(   section   );
                  element &&  element.scrollIntoView( { behavior: 'smooth' });
        }


    }, [location, paramName]);
}
