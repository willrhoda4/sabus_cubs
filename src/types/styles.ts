






import { Theme } from '../hooks/useStyles.ts';
export { Theme };



export type ComponentType = 'button'   | 'input';

export type StyleObject   = Record< ComponentType, string >;

export type InputType    = 'text'     | 'textArea';


  
export interface InputStyleProps {
    error?: boolean;
    type?:  InputType;
    // ...other props
}




export interface UseStyleArgProps {

    type?:  string, 
    error?: boolean,
}



export type StyleFunctions = {
    [ key in ComponentType ]: ( args?: UseStyleArgProps ) => string;
};