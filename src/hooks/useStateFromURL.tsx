








/**
 * useStateFromURL - A custom hook for syncing component state with a specific URL parameter.
 *
 * This hook creates a state variable and syncs its value with the specified URL parameter (default: 'state').
 * When the URL parameter changes, it updates the state variable accordingly. If the URL parameter is not found,
 * the state variable retains its current value.
 *
 * @param {string} [paramName='state'] - The name of the URL parameter to sync with.
 * @param {string} [defaultState='']   - The default value for the state variable.
 *
 * @returns {[string, StateSetter<string>]} - An array containing the state variable and its setter function.
 *
 * 
 * 
 * 
 * Usage:
 * 1. Import the hook: import { useStateFromURL } from './path-to-hook';
 * 2. Call the hook in your component: const [myState, setMyState] = useStateFromURL();
 * 3. Use the state variable and setter function in your component as needed.
 * 4. Update the URL parameter to reflect changes in the state variable, either manually or via user interaction.
 *
 * Example:
 * - URL: /page?state=tab1
 * - Component: const [myState, setMyState] = useStateFromURL();
 *              console.log(myState);  // Output: 'tab1'
 */




import { useEffect, 
         useState    } from 'react';
import { useLocation } from 'react-router-dom';


type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export default function useStateFromURL(paramName: string = 'state', defaultState: string = ''): [string, StateSetter<string>] {


    const   location              = useLocation();
    const [ state,      setState] = useState(defaultState);



    useEffect(() => {

        const params     = new URLSearchParams(location.search);

        const stateParam = params.get(paramName);
        
              stateParam && setState(stateParam);

    }, [location, paramName]);

    return [state, setState];
}
