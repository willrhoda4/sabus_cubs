





// theme type derived from array of strings in useStyles hoook
import      { Theme } from '../hooks/useStyles.ts';
export type { Theme };


// limits which styles can be tracked in a StyleFunctions object.
export type ComponentType = 'button'        | 
                            'input'         |
                            'menuWrapper'   |
                            'mainMenu'      |
                            'subMenu'       ;


export interface StyleArgObject {

    type?       :  string, 
    error?      : boolean,
    selected?   : boolean,
}


export type StyleFunction = (args?: StyleArgObject) => string;



export type StyleFunctions = {
    [key in ComponentType]?: StyleFunction;
};





// // type for StyleFunctions properties
// export type StyleObject   = Record< ComponentType, string >;







// export interface StyleArgObject {

//     type?:  string, 
//     error?: boolean,
// }



// export type StyleFunctions = {
//     [ key in ComponentType ]? : ( args?: StyleArgObject ) => string | Record<string, string>;
// };

