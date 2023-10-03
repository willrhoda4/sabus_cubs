











import { ChangeEvent } from 'react';



type SetState<T> = React.Dispatch<React.SetStateAction<T>>;


interface InputProps {

  name:       string;
  type:       string;
  state:      Record<string, string | number | boolean>; // The state object
  error?:     Record<string, unknown>; // The error object (optional)
  setter:     SetState<Record<string, string | number | boolean>>;
  confirm?:   string;
  options?:   string[];
  wrapStyle?: string;
}



// multifunctional input component for forms.
// its props expect a state object, a setter function, and a name.
// error checking is done by passing in an error object.
export default function Input ({
                                    name,
                                    type,
                                    state,
                                    error,
                                    setter,
                                    confirm,
                                    options,
                                    wrapStyle,
                                } : InputProps) : JSX.Element {




    // Define the input's CSS class based on the error state and type
    const inputClass = `
                            w-full p-1 
                            rounded-md border 
                            ${!(error && error[name] === true) ? 'border-gray-300' : 'border-pink-300' } 
                            ${ type === 'textArea' && 'min-h-[20rem]'}
                            shadow-sm 
                            focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50
                       `;

    

    // Define the error message based on the input's name
    let errorMsg: string;

    switch (name) {

        case 'email':
            errorMsg = 'please provide a valid email address';
            break;
        case 'name':
            errorMsg = 'let us know who we can reply to!';
            break;
        case 'message':
            errorMsg = "you wouldn't be here if you didn't want to say something";
            break;
        default:
            errorMsg = '';
    }



    // Handle input change events
    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setter(prevState => ({ ...prevState, [name]: e.target.value }));
    }


    // Toggle the state value using the input's name as the key
    function toggleState() {
        setter(prevState => ({ ...prevState, [name]: !prevState[name] }));
    }

   
    // Handle toggle change events
    function handleToggleChange () {
        // If a confirmation is provided, show a confirmation dialog before updating state
        if (confirm) {  window.confirm(confirm) && toggleState(); } 
        // Toggle the state object using the input's name as the key
        else         {  toggleState();                            }
    }



    // do a little dance to make sure React doesn't complain about
    // switching between controlled and uncontrolled components.
    const value       = state[name] !== undefined  ? (typeof state[name] === 'boolean' ? state[name].toString() : state[name])
                                                   : '';

    const valueProp   = { value: value as string | number };


    // define the common props that all input types share
    const commonProps = {   
                            ...valueProp,
                            onChange: handleInputChange,
                            required: true
                        };


    // Determine the appropriate field based on the input type
    const field = type === 'text'     ? <input 
                                                name={name} 
                                            className={inputClass} 
                                                    {...commonProps}
                                        />

                : type === 'textArea' ? <textarea 
                                                 name={name} 
                                            className={inputClass} 
                                                      {...commonProps}
                                        />

                : type === 'date'     ? <input 
                                                 type="date" 
                                                 name={name} 
                                            className={inputClass} 
                                                      {...commonProps} 
                                        />

                : type === 'select'   ? <select 
                                                 name={name} 
                                            className={inputClass} 
                                                      {...commonProps}
                                        >
                                            <option key={0} value="null" hidden>--select an option--</option>
                                            {options?.map((choice, index) => (
                                                <option key={index + 1} value={choice}>{choice}</option>
                                            ))}
                                        </select>                     

  
      // toggle is a bit different, it takes an array of two options                                            
      : type === 'toggle' ?     <div className="flex items-center m-2">

                                    {/* //first option (left) */}
                                    <p className="text-l">{options?.[0]}</p>

                                    {/* wrapper for the switch */}
                                    <div
                                        className={`h-4 w-8 m-2 bg-gray-300 rounded-2xl`}
                                        onClick={handleToggleChange}
                                    >
                                        {/* the ball that bounces back and forth */}
                                        <div
                                            className={`h-4 w-4 bg-gray-100 shadow-inner rounded-2xl transition-all ${
                                            state[name] ? 'translate-x-4' : ''
                                            }`}
                                        />
                                    </div>

                                    {/* second option (right) */}
                                    <p className="text-l">{options?.[1]}</p>

                                    {/* the actual checkbox that is hidden */}
                                    {/* if a confirm condition is passed in, check it before changing state. */}
                                    <input
                                        type="checkbox"
                                        className={`absolute opacity-0 cursor-pointer h-0 w-0 display-none`}
                                        name={name}
                                        checked={!!state[name]}
                                        onChange={handleToggleChange}
                                    />
                                </div>
                               
      : null;


    return (
        <div className={`${wrapStyle ? wrapStyle : 'w-[90%]'}`}>
            <label className='p-2 w-9/12'>
                <h3 className='font-sans'>{name}</h3>
                {field}
                <div className='text-red-500 h-4'>
                    { error && error[name] as boolean && <p>{errorMsg}</p> }
                </div>
            </label>
        </div>
    );
}




