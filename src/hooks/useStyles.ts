








import   sailboat           from '../styles/sailboat';
import   neobrutalism       from '../styles/neobrutalism';

import { StyleFunctions,
         UseStyleArgProps } from '../types/styles';


const    themes =   {
                        sailboat,
                        neobrutalism,
                    };

                    
export type Theme = keyof typeof themes;


export default function useStyles ( theme: Theme ) {

    const styleFunctions: StyleFunctions = themes[theme];

    return ( component: keyof StyleFunctions, args?: UseStyleArgProps ) => {

        const  styleFunction = styleFunctions[component];
        return styleFunction(args);
    };                      
}

