








import { useState, 
         useEffect      } from 'react';

import   useNewStatus     from '../../hooks/useNewStatus';  
import   useThumbnails    from '../../hooks/useThumbnails';
import   validate         from '../../utils/validate';

import { Field,
         FormProps      } from '../../types/form';

import   Input            from './Input';
import   Button           from '../buttons/Button';







export default function Form ({ fields, onSubmit, initialValues,  } : FormProps) {



    // formState is the state object for the form.
    // errorState is the error object for the form.
    // attempted is a boolean that tracks whether the user has attempted to submit the form.
    // status is a string that keeps the user in the loop.
    const [ formState,     setFormState     ] = useState<Record< string, string | number | boolean | File >>({});
    const [ controlState,  setControlState  ] = useState<Record< string, string | number | boolean | File >>({});
    const [ errorState,    setErrorState    ] = useState<Record<string, unknown>>({});
    const [ attempted,     setAttempted     ] = useState<boolean>(false);
   
    const [ statusRef,     newStatus        ] = useNewStatus();
    const [ thumbnailUrls, thumbnailFor     ] = useThumbnails(formState);






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
    const handleFormSubmit = (e: React.FormEvent) => {              console.log(controlState, formState, errorState);

        e.preventDefault();

        setAttempted(true);

        const hasError = Object.values(errorState).some(error => error === true);

        if   (hasError) { newStatus('Looks like your form still needs a little work...'); return; }    

        else            { onSubmit( formState, newStatus, controlState, )
                             .then(  success => {
                                if ( success )  {
                                    setAttempted(false);
                                    setFormState({});       // reset form if onSubmit returns true.
                                }})                         // (generally for non-update forms)
                            .catch(error => {
                                console.error('Submission error:', error);
                                newStatus('An error occurred during submission.');
                            });                 
                    
                        }

        }


    /**
     * Inputs will be displayed if:
     *      - no control is specified
     *      - a control is specified and the control state is true
     *      - if the control state is a string, it will be treated as a key in the control state object 
     *
     */
    const inputIsDisplayed = (field: Field) => {
                return field.control ===  undefined  
            || (typeof field.control === 'string'    && controlState[field.control] )
            || (typeof field.control === 'boolean'   && field.control               );
    }; 


    return (

        <form>

            {fields.map(field => {

                return (

                    inputIsDisplayed(field) &&

                        <div key={field.name}>
                                     {/*         common props         form props     control props    */}
                            <Input                      
                                name={           field.name                                             }
                                type={           field.type                                             }
                                options={        field.options                                          }

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

            <Button text="Submit" onClick={handleFormSubmit} />

    </form>

    );
}
