

/**
 * 
 * 
 * the original usecase for this was to instantaneously disable a button
 * during a click event, and then re-enable it after the event was over.
 * 
 * since state updates are asynchronous, the button would not be disabled
 * immediately with useState, leaving the user vulnerable to double-clicking.
 * 
 * you can declare this ref just like a useState hook:
 * 
 *     const [ isClicked, setIsClicked ] = useToggleRef();
 * 
 * to avoid constantly repeating .current, we pass down a getter function.
 * to retrieve the value, call the getter function:
 * 
 *     isClicked();   <== returns the current value of isClicked  
 * 
 * if (isClicked()) { console.log('then it's clicked!') }
 * 
 * its setter toggles the value if you call it without an argument,
 * but it also accepts a boolean argument to set the value directly:
 * 
 *      setIsClicked(true);      <== isClicked() is now true
 *      setIsClicked(false);     <== isClicked() is now false
 *      setIsClicked();          <== isClicked() is now !isClicked
 * 
 */
  





import { useRef } from 'react';



type ToggleRefReturn = [ () => boolean, (newValue: boolean) => void ];


export default function useToggleRef(initialValue : boolean = false) : ToggleRefReturn {
    
    const ref = useRef(initialValue);
  

    function setRefValue (newValue? : boolean) {

        ref.current = typeof newValue !== 'undefined' ? newValue 
                                                      : !ref.current;
    }

    const refValue = () => ref.current;
  

    return [ refValue, setRefValue ];
  }
  
  