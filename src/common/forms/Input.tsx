











import { ChangeEvent } from 'react';
import { InputProps  } from '../../types/form';








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
                                    caption,
                                    options,
                                    errorMsg,
                                    wrapStyle,
                                    errorStyles,
                                } : InputProps) : JSX.Element {





    // before applying error styles, 
    // check if the user has attempted to submit the form,
    // and if the input has an error.
    const mistakeMade = errorStyles && error && error[name];



    // Define the input's CSS class based on the error state and type
    const inputClass = `
                            w-full p-1 
                            rounded-md border 
                            ${!( mistakeMade === true) ? 'border-gray-300' : 'border-pink-300' } 
                            ${ type === 'textArea' && 'min-h-[20rem]'}
                            shadow-sm 
                            focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50
                       `;

    



    
    // Handle input change events
    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {

        if (type === 'file') {

            const input = e.target as HTMLInputElement;

            if   (input.files) {

                const file = input.files[0];

                if   (file) { setter(prevState => ( { ...prevState, [name]: file } ) ); }
            }

        } else {              setter(prevState => ( { ...prevState, [name]: e.target.value } ) ); }
    }


    

   
    // Handle toggle change events
    function handleToggleChange () {

        // Toggle the state value using the input's name as the key
        function toggleState() {

             setter(prevState => ({ ...prevState, [name]: !prevState[name] }));
         }

        // If a confirmation is provided, show a confirmation dialog before updating state
        if (confirm) {  window.confirm(confirm) && toggleState(); } 
        // Toggle the state object using the input's name as the key
        else         {  toggleState();                            }
    }



    // do a little dance to make sure React doesn't complain about
    // switching between controlled and uncontrolled components.
    const value       = state[name] !== undefined  ? (
                                                        typeof state[name] === 'boolean' ? state[name].toString() 
                                                                                         : state[name]
                                                     )
                                                   : '';

    const valueProp   = { value: value as string | number };


    // define the common props that all input types share
    const commonProps = {   
                                    name: name,
                                onChange: handleInputChange,
                               className: inputClass,
                                required: true,
                                ...(type !== 'file' ? valueProp : {}),
                        };

    
    // prepares options for the select input.
    // if minMax values are supplied (eg: [1, 10]), a range of numbers will be generated.
    // otherwise, the options prop is used as-is: one option per array element.
    const optionsArray = () => {

        if (!options) return;


        // if the options prop is an array of two numbers, generate a range of numbers
        const minMax =  Array.isArray(options) 
                     && options.length === 2
                     && typeof options[0] === 'number' 
                     && typeof options[1] === 'number';

        if (minMax) {

            const rangeArray  = [];

            const [min, max] = options as [number, number];

            for (let i = min; i <= max; i++) {

                rangeArray.push(<option key={i + 1} value={i}>{i}</option>);
            }

            return rangeArray;

        } else {
                
            const choicesArray = options.map((choice, index) => (

                <option key={index + 1} value={choice}>{choice}</option>
            ));

            return choicesArray

        }

    }



    // Determine the appropriate field based on the input type
    const field = type === 'text'     ?     <input      {...commonProps}  />


                : type === 'textArea' ?     <textarea   {...commonProps}  />


                : type === 'date'     ?     <input 
                                                        type="date" 
                                                        {...commonProps} 
                                            />

                : type === 'select'   ?     <select     {...commonProps}    >
                                                <option key={0} value="null" hidden>--select an option--</option>
                                                {optionsArray()}
                                            </select>     
                                        
                : type === 'file'     ?     <input      
                                                        type="file"
                                                        {...commonProps}
                                            />
                                        
                : type === 'check'    ?     <div className='flex'>
                                                <p>{caption}</p>
                                                <input
                                                    type="checkbox"
                                                    name={name}
                                                    checked={!!state[name]}
                                                    onChange={handleToggleChange}
                                                />
                                            </div>
                                                                    

  
                // toggle is a bit different, it takes an array of two options                                            
                : type === 'toggle' ?     <div className="flex items-center m-2"                                                     
                                                 onClick={handleToggleChange}
                                          >

                                                {/* //first option (left) */}
                                                <p className="text-l">{options?.[0]}</p>

                                                {/* wrapper for the switch */}
                                                <div
                                                    className={`h-4 w-8 m-2 bg-gray-300 rounded-2xl`}
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

                                            // default to a regular text input if the type is not recognized
      :                                     <input      {...commonProps}  />;


    return (

        <div className={`${wrapStyle ? wrapStyle : 'w-[90%]'}`}>
            <label className='p-2 w-9/12'>
                { 
                    type !== 'check'  && 
                    type !== 'toggle' && <h3 className='font-sans'>{name.replace(/_/g, ' ')}</h3> 
                
                }
                { field } 
                <div className='text-red-500 h-4'>
                    { mistakeMade as boolean && errorMsg && <p>{errorMsg}</p> }
                </div>
            </label>
        </div>
    );
}




