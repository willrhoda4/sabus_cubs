







/**
 *  listens for location and checks if there is an id in the state.
 *  if there is, it scrolls to the element with that id.
 * 
 *  implementing it as is easy as importing it and declaring it in the component:
 * 
 *          import useLocationScroll from 'src/hooks/useLocationScroll';
 * 
 *          useLocationScroll();
 */





import { useEffect   } from 'react';
import { useLocation } from 'react-router-dom';





export default function useLocationScroll() {



    const location  = useLocation();
    const id        = location.state && location.state.id;
    const timeStamp = location.state && location.state.timeStamp;
          // timeStamp is used to coerce the useEffect hook to run,
          // even if the id is the same as the previous one.


    useEffect(() => {

        if ( id ) {

            const element = document.getElementById(id);
            if  ( element ) {
                  element.scrollIntoView();
            }
        }

    }, [ id, timeStamp ] );

}