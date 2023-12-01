










import sailboat from '../styles/sailboat';
import neobrutalism from '../styles/neobrutalism';


import { StyleFunctions } from '../types/styles';

const themes = {
                    sailboat,
                    neobrutalism,
                };

export type Theme = keyof typeof themes;



export default function useStyles(theme: Theme) : StyleFunctions{

    return themes[theme];
}




// import   sailboat           from '../styles/sailboat';
// import   neobrutalism       from '../styles/neobrutalism';

// import { StyleFunctions,
//          StyleArgObject,
//                           } from '../types/styles';


// const    themes =   {
//                         sailboat,
//                         neobrutalism,
//                     };


// export type Theme = keyof typeof themes;


// export default function useStyles ( theme: Theme )  {

//     const styleFunctions: StyleFunctions = themes[theme];

//     return ( component: keyof StyleFunctions, args?: StyleArgObject ) => {

//         const  styleFunction = styleFunctions[component];

//         if ( styleFunction )   return styleFunction(args);
//     };                      
// }

