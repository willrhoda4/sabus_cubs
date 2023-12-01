







/**
 *  listens for location and checks if there is an id in the state.
 *  if there is, it updates its value to match that id.
 *  apart from that, it behaves just like a useState hook.
 * 
 *  implementing it as is easy as importing it,
 *  and declaring it just like a useState hook:
 * 
 *          import useLocationScroll from 'src/hooks/useLocationScroll';
 * 
 *          const [ locationState, setLocationState ] useLocationState();
 * 
 * 
 * 
 */




import { useEffect, 
         useState, 
         Dispatch, 
         SetStateAction } from 'react';

import { useLocation    } from 'react-router-dom';




export default function useLocationState<T>(initialValue: T, scrollTo? : string) : [ T, Dispatch<SetStateAction<T>> ] {



    const [ thisState, setThisState ] = useState<T>(initialValue);
    const   location                  = useLocation();

    const   id                        = location.state && location.state.id as T;
    const   timeStamp                 = location.state && location.state.timeStamp as T;

    useEffect(() => {

       if  (id) {
                    setThisState(id);
                    scrollTo && document.getElementById(scrollTo)?.scrollIntoView();
                }

    }, [id, scrollTo, timeStamp]);

    return [ thisState, setThisState ];
}
