






/**
 * Custom hook `useEnterListener`:
 * Provides refs to the final field and submit button of a form.
 * Adds an event listener to the final field to trigger a submit button click on 'Enter' key press.
 * 
 * @returns {Array} Pair of React Refs: [finalFieldRef, submitButtonRef]
*/




import { useEffect, useRef } from 'react';



export default function useEnterListener () : [ React.RefObject<HTMLElement>, React.RefObject<HTMLElement> ] {


        
    // Refs for the final field and the submit button
    const finalFieldRef   = useRef<HTMLElement>(null);
    const submitButtonRef = useRef<HTMLElement>(null);


    useEffect(() => {

        const finalField   = finalFieldRef.current;
        const submitButton = submitButtonRef.current;

        // Event handler for key press
        const handleKeyPress = (e: KeyboardEvent) => {

            // Triggers click on submit button when 'Enter' is pressed
            if (e.key === 'Enter') {
                e.preventDefault();
                submitButton?.click();
            }
        };

        // Adding the event listener to the final field
        if (finalField) {
            finalField.addEventListener('keypress', handleKeyPress);
        }

        // Cleanup function to remove the event listener
        return () => {
            if (finalField) {
                finalField.removeEventListener('keypress', handleKeyPress);
            }
        };
    }, []);



    return [ finalFieldRef, submitButtonRef ];


}

