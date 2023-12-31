










// Theme type derived from array of strings in useStyles hook
import      { Theme }        from '../hooks/useStyles';
export type { Theme };

import      { BrandColours } from '../utils/brandColours';

// Limits which styles can be tracked in a StyleFunctions object.
export type ComponentType = 'button' 
                          | 'input' 
                          | 'toggle'
                          | 'menuWrapper' 
                          | 'mainMenu' 
                          | 'subMenu' 
                          | 'notification' 
                          | 'buttonBank' 
                          | 'buttonBankButton';


export interface StyleArgObject {
    type?       : string;
    error?      : boolean;
    selected?   : boolean;
    animation?  : string;
    condition?  : boolean;
    extra?      : string;
    colours?    : BrandColours;
}

// A type for functions that only take a StyleArgObject or a string as an argument
export type StyleFunction = ((args?: StyleArgObject) => string) | (() => string);

// Adjust StyleFunctions type to allow for StyleFunction
export type StyleFunctions = {
  [key in ComponentType]?: StyleFunction;
};
