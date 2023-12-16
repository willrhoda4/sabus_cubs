







/**
 * a custom hook to manage animations for elements that toggle between visible and hidden states.
 * it handles both the "show" and "hide" animations and ensures the state updates correctly after the animations.
 * 
 * a note on closingTime: for complex animations, where isOpen controls a sequence of animations,
 * setClosing time to the total length of the sequence, not the specific animation's duration.
 *
 * @param props - The properties to control the animation.
 *                Includes isOpen (state of the element), open/close animation classes, and optional closing duration.
 * @returns An array with the current animation class and a boolean to indicate if the element should be displayed.
 */





import { useState, useEffect } from 'react';




interface UseToggleAnimationProps {
  isOpen                : boolean;
  openAnimation         : string;
  closeAnimation        : string;
  closingTime?          : number; // in milliseconds
}


export default function useToggleAnimation( {
                                                isOpen,
                                                openAnimation,
                                                closeAnimation,
                                                closingTime = 400,
                                            } : UseToggleAnimationProps ) : [ string, boolean ] {




    const [ animation, setAnimation ] = useState<string>(''     );
    const [ displayed, setDisplayed ] = useState<boolean>(isOpen);


    useEffect( () => {

        let timeoutId : NodeJS.Timeout | undefined;

        if ( isOpen ) {
                        setAnimation( openAnimation   );
                        setDisplayed( true            );
                      } 
        else          {
                        setAnimation( closeAnimation  );
                        timeoutId = setTimeout( () => {
                                                         setDisplayed( false );
                                                         setAnimation( ''    );
                                                      }, closingTime         );
                     }

        return () => { if (timeoutId) clearTimeout(timeoutId); };


    }, [ isOpen, closingTime, openAnimation, closeAnimation ] );


    return [ animation, displayed ];
}

