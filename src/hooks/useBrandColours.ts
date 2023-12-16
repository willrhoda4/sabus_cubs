






/**
 * 
 * 
 * this hook iprovides a dynamic brand colour object from an array of predefined colour combinations.
 * it updates the brand colours based on changes in the application's location or editing state.
 * 
 * Usage:
 * - intended to be used in components where the brand colours need to dynamically change based on navigation
 *   or specific state changes (e.g., entering or exiting an editing mode).
 * - on every change in location or editing state, the hook selects the next colour combination from the array,
 *   cycling through the array in a loop.
 * 
 * How it works:
 * - it uses the useState hook to maintain the current index of the colour combinations array.
 * - the useEffect hook listens for changes in either the location (using useLocation from react-router-dom)
 *   or the editing state (passed as a prop).
 * - upon a change in location or editing state, the index is incremented, cycling back to the start
 *   if it reaches the end of the array (achieved using the modulo operator).
 * - the current brand colour object is then derived from the array based on the updated index.
 * 
 * Parameters:
 * - editing (optional): a string value representing the current editing state, triggering an update when changed.
 * 
 * Returns:
 * - a brand colour object from the array corresponding to the current index.
 * 
 * Note:
 * - Ensure the brandColours function and BrandColours type are correctly imported from their respective paths.
 */






import { useState, 
         useEffect   }   from 'react';
import { useLocation }   from 'react-router-dom';

import   brandColours, 
       { BrandColours }  from '../utils/brandColours'; 




export default function useBrandColours(  editing : string ) : BrandColours {


    // State to track the current index of the brand colours array
    const [ index, setIndex ] = useState<number>(0);

    // Hook to access the current location object
    const   location          = useLocation();


    useEffect(() => {

        // Function to increment the index. Wraps around using modulo operator
        function incrementIndex () {
            setIndex( ( prevIndex ) => ( prevIndex + 1 ) % brandColours().length );
        }

        // Increment the index every time the location or editing state changes
        incrementIndex();


    }, [location, editing]); 


    // Access the current brand colours object using the updated index
    return brandColours()[index];

}
