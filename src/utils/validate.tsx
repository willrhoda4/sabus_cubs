







import { ValidationArgs } from '../types/form';



export default function validate(validationArgs: ValidationArgs, value: unknown) : boolean {   


        if (Array.isArray(validationArgs)) {

            const [ type, ...args ] = validationArgs;

            switch (type) {

                case 'length': {

                    if ( typeof value !== 'string' ) { break; }
                
                    const [ min = 0, max = Infinity ] = args as [ number | undefined, number | undefined ];

                    return value.length >= min && value.length <= max;

                    break;
                }
                

                case 'regex': {

                    const [ regexStr ] = args as [ string ];
                    const   regex      = new RegExp(regexStr);

                    if (typeof value === 'string') { return regex.test(value); }

                    break;
                }


                case 'function': {

                    const [ customFunction ] = args as [ (value: unknown) => boolean ];

                    return  customFunction(value);
                }

                default:

                    console.error( 'Unknown validation type:', type );
                    return false;
            }

        } else {

            switch ( validationArgs ) {


                case 'email': {
                    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

                    if (typeof value === 'string') { return emailRegex.test(value); }

                    break;
                }


                case 'jpeg':

                    if (value && typeof value === 'object' && 'type' in value) { return value.type === 'image/jpeg'; }

                    break;


                case 'phone': {
                    const phoneRegex = /^\d{10}$/;
                    if (typeof value === 'string') {
                        return phoneRegex.test(value);
                    }
                    break;
                }


                case 'url': {       

                    try   { // if the value can't be converted to a URL,
                            // the constructor will catch  an error and return false
                            new URL(String(value));
                            return true;
                          } 
                    catch {
                            return false;
                          }
                          
                }

                case 'number': {

                    return !isNaN(parseFloat(String(value)));

                }

                case 'date': {
                    const date = Date.parse(String(value));
                    return !isNaN(date);
                    break;
                }
                


                case 'exists': {

                    return value != null;

                }

                default:
                    
                    console.error('Unknown validation type:', validationArgs);
                    return false;
            }
        }
        return false;  // return false by default if none of the cases matched or the type guards failed

}
