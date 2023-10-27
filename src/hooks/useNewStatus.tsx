








import { useRef, useEffect, RefObject } from 'react';




type UseNewStatusReturn = [RefObject<HTMLParagraphElement>, (message: string, duration?: number | boolean) => void];

export default function useNewStatus() : UseNewStatusReturn {

    // create a ref to hold the reference to the status message element
    const statusRef = useRef<HTMLParagraphElement>(null);

    // function to update the status message
    const newStatus = (message : string, duration : (number | boolean) = 4000) => {



        // get the element from the ref
        // exit if the element is not found
        const element = statusRef.current;
        if  (!element) return;  



        // define the CSS classes for animations
        const animateIn  = 'animate-fadeIn';
        const animateOut = 'animate-fadeOut';



        // force a repaint and add the animateIn class
        // set the status message
                void element.offsetWidth;
                     element.classList.add(animateIn);
                     element.innerText = message;
        

        // if duration is declared (or the default 400), remove the message after a delay
        // if duration is explicitly false, leave the message on the screen
        if (typeof duration === 'number') {

            // remove animateIn class, force a repaint, and add animateOut class after a delay
            setTimeout(() => {

                     element.classList.remove(animateIn);
                void element.offsetWidth;
                     element.classList.add(animateOut);

            }, duration - 300);

            // remove animateOut class and clear the status message after another delay
            setTimeout(() => {

                     element.classList.remove(animateOut);
                     element.innerText = '';

            }, duration);
        }
    };

    // set a default height for the status message element on component mount
    useEffect(() => {

        const element = statusRef.current;
          if (element) {
              element.style.minHeight = '2em'; 
          }

    }, []);

    // return the status ref and the newStatus function
    return [statusRef, newStatus];
}

/**
 * example usage:
 * const [downloadStatusRef, newDownloadStatus] = useNewStatus(); 
 * <p ref={downloadStatusRef} />
 * newDownloadStatus('Download started');
 */
