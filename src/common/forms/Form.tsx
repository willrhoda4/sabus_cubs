








import { useState, 
         useEffect      } from 'react';

import   useNewStatus     from '../../hooks/useNewStatus';  
import   useThumbnails    from '../../hooks/useThumbnails';
import   useToggleRef     from '../../hooks/useToggleRef';
import   validate         from '../../utils/validate';

import { Field,
         FormProps,
         MiscState      } from '../../types/form';


import   Input            from './Input';
import   Button           from '../buttons/Button';







export default function Form ({ fields, style, onSubmit, initialValues,  } : FormProps) {



    // formState is the state object for the form.
    // errorState is the error object for the form.
    // attempted is a boolean that tracks whether the user has attempted to submit the form yet.

    // the newStatus function is used to update the status of the form.

    const [ formState,     setFormState     ] = useState<Record< string, MiscState >>({});
    const [ controlState,  setControlState  ] = useState<Record< string, MiscState >>({});
    const [ errorState,    setErrorState    ] = useState<Record<string, unknown>>({});
    const [ attempted,     setAttempted     ] = useState<boolean>(false);
   
    const [ statusRef,     newStatus        ] = useNewStatus();
    const [ thumbnailUrls, thumbnailFor     ] = useThumbnails(formState);
    const [ isClicked,     setIsClicked     ] = useToggleRef();

    const   exitForm                          =  (msg : string) => { newStatus(msg); return setIsClicked(false); }





    // Load initial values into state if they exist
    useEffect(() => { initialValues && setFormState(initialValues); }, [initialValues]);
                                              


        
    // Update the error state when the form state change s
    useEffect(() => {

        const newErrorState = fields.filter(  field       => !field.isController )
                                    .reduce( (acc, field) => {

            
            const isValid   = validate(field.validation, formState[field.name]);
                               
            return  {
                        ...acc,
                        [field.name]: !isValid,
                    };

        }, {} as Record<string, boolean>);

        setErrorState(newErrorState);

    }, [formState, fields]);


    
    // generates and updates image urls for image previews
    // using the useThumbnails hook.
    // we'll render a thumbnailFor every field that has a validation of 'jpeg'.
    
    useEffect(() => {

        fields.forEach(field => {

          if ( field.validation === 'jpeg' && 
               formState[field.name]       ){ thumbnailFor(field.name); }
        });
      }, [fields, formState, thumbnailFor]);



        // click handler for the submit button.
        // if there are no errors, the onSubmit callback is called with the form state.  
    // Define resetForm function
    const handleFormSubmit = async (e: React.FormEvent) => {


        if (isClicked()) { return; }

        e.preventDefault();

        setIsClicked(true);

        setAttempted(true);


        const resetForm = () => {

            setAttempted(false);
            setFormState({});
        };
        
    
        const hasError = Object.values(errorState).some(error => error === true);
    
        if (hasError) { return exitForm('Looks like your form still needs a little work...');  }
    
        try           { 
                        await onSubmit( formState, newStatus, resetForm, controlState );       
                        setIsClicked(false);   
                      }
        catch (error) {
                        console.error('Submission error:', error);
                        newStatus('An error occurred during submission.');
                      }
    };


    // onKeyDown handler that calls the submit handler if the user presses enter
    function enterListener (e: React.KeyboardEvent) {

        if (e.key === 'Enter') {
            e.preventDefault();
            handleFormSubmit(e);
        }
    }



    /**
     * Inputs will be displayed if:
     *      - no control is specified
     *      - a control is specified and the control state is true
     *      - if the control state is a string, it will be  assumed to be a key in the control state object 
     *      - if the control state is an array, at least one of the values in the array must be true
     */
    const inputIsDisplayed = (field: Field): boolean => {

        const ctrl = field.control;
      
        if ( ctrl === undefined ) return true;
      
        if ( Array.isArray( ctrl ) ) {

          return ctrl.some( c => typeof c === 'boolean' ? c : controlState[ c ] );
        }
      
        return typeof ctrl === 'boolean' ? ctrl : Boolean( controlState [ ctrl ] );
      };
       


    return (

        <form 
            onKeyDown={ enterListener }
            className={`
                        w-full max-w-3xl
                        flex flex-col items-center
                        px-2
                      `}
        >

            {fields.map(field => {

                return (

                    inputIsDisplayed(field) &&

                        <div key={field.name} className='w-full flex flex-col items-center'>
                                     {/*         common props         form props     control props    */}
                            <Input                      
                                name={           field.name                                             }
                                type={           field.type                                             }
                                options={        field.options                                          }
                                style={          style                                                  }

                                state={         !field.isController ? formState    : controlState       }
                                setter={        !field.isController ? setFormState : setControlState    }
                                error={         !field.isController ? errorState   : undefined          }
                                errorStyles={   !field.isController ? attempted    : false              }
                                errorMsg={                            field.errorMsg                    }
                            />
                            {
                                field.validation === 'jpeg'  && 
                                thumbnailUrls[field.name]    && <img src={thumbnailUrls[field.name]} alt={`${field.name} preview`} />
                            }

                        </div>
                );
            } ) }

            <p ref={statusRef} />

            <Button text="Submit" theme={style} onClick={handleFormSubmit} />

    </form>

    );
}
