







/**
 * a custom hook to manage animations for elements that toggle between visible and hidden states.
 * it handles both the "show" and "hide" animations and ensures the state updates correctly after the animations.
 * 
 * a note on closingTime: for complex animations, where isOpen controls a sequence of animations,
 * setClosing time to the total length of the sequence, not the specific animation's duration.
 * additionally, you should only need to return the displayed state once. here's an example:
 * 
 *  const [ mainMenuAnimation, menuIsOpen    ] = useToggleAnimation({  

                                                                        isOpen:          menuDisplayed,
                                                                        openAnimation:  'animate-slide-in-left',
                                                                        closeAnimation: 'animate-slide-out-left-after',
                                                                        closingTime:     800,
                                                                   });
  
    const   subMenuAnimation                   = useToggleAnimation({
                                                                        isOpen:          menuDisplayed,
                                                                        openAnimation:  'animate-submenu-slide-in', 
                                                                        closeAnimation: 'animate-submenu-slide-out', 
                                                                        closingTime:     800, 
                                                                   })[0]; // mainMenuAnimation and subMenuAnimation return the same menuIsOpen,
                                                                         // therefore, we'll just need the animation class.
  

 * in the above example, menuIsOpen will control the main menu and the submenu.
 * since both animations run for 400ms, we declare 800ms as the closingTime for both.
 * (400 + 400 = 800)
 *
 * we can also use [0] as a simple method to return only the animation class, if that's all we need.
 * 
 * 
 * 
 * 
 *  @param props - The properties to control the animation.
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

        let timeoutId : number | undefined;

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

