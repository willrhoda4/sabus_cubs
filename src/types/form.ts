














import { Theme } from './styles';







export type MiscState = string | number | boolean | Date |File

// type for form state object
export interface FormState {  [key: string]: MiscState;  }


// simple SetState type
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;


// type for newStatus function from useNewStatus hook.
export type NewStatusFunction = (message: string, duration?: number | boolean) => void;


// type for options prop in Input component
export type Options = [number, number] | (string | number)[];




// interface for multi-functional Input component
export interface InputProps {

    name:          string;
    type:          string;
    style?:        Theme;
    state:         FormState; // The state object
    error?:        Record<string, unknown>; // The error object (optional)
    setter:        SetState<Record<string, MiscState >>;
    confirm?:      string;
    caption?:      string;
    options?:      Options;
    errorMsg?:     string;
    errorStyles?:  boolean;
    wrapStyle?:    string;
    instructions?: string;
}









// type validation property in Field interface
export type ValidationArgs =

      [ 'length',    number, number? ]
    | [ 'regex',     string ]
    | [ 'function', (value: unknown) => boolean ]
    |   'email'
    |   'jpeg'
    |   'phone'
    |   'url'
    |   'exists'
    |   'date'
    |   'number';




// interface for Field objects, which are passed to FormProps in an array
export interface Field {

  name:             string;                                     // name of the field. Must be exact match with database column name
  type:             'text'   | 'textArea' | 'date'  | 'check' |
                    'toggle' | 'select'   | 'file';             // specifies input type for Input component
  validation:       ValidationArgs;                             // specifies validation type for validate helper
  errorMsg?:        string;                                     // optional error message to display if validation fails
  options?:         Options;                                    // options for select and toggle input     
  isController?:    boolean;                                    // if true, this value will live in controlState, not formState
  control?:         boolean | string | Array<boolean | string>; // name of the controlState property that activates this field
                                                                // note that controlled fields will not be displayed on initial render.
}


// prop interface for Form component
export interface FormProps {

  fields:             Field[];
  initialValues?:     FormState;
  style?:             Theme;
  onSubmit:        (  values    : FormState, 
                      newStatus : NewStatusFunction,
                      resetForm : () => void,
                      controls? : FormState,
                   )  => Promise<boolean | void>;
}
