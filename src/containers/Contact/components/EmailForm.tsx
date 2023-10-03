







import Input from "../../../common/Input"
import Button from "../../../common/Button";

import { useState, useEffect } from "react";

import Axios from 'axios';




export default function EmailForm(): JSX.Element {







    // formState is the state object for the form.
    // errorState is the error object for the form.
    // attempted is a boolean that tracks whether the user has attempted to submit the form.
    // status is a string that explains the status of the email delivery.
    const [ formState,  setFormState  ] = useState<Record<string, string | number | boolean>>({});
    const [ errorState, setErrorState ] = useState<Record<string, unknown>>({});
    const [ attempted,  setAttempted  ] = useState<boolean>(false);
    const [ status,     setStatus     ] = useState<string>('');




    // error-handling effect hooks
    
    
    // error checking for name field
    useEffect(() => {
        
        if (!attempted) { return; }
   
        const name = formState.name as string;
        
        name ? setErrorState((prevState) => ({ ...prevState, name: name.length === 0 }))
             : setErrorState((prevState) => ({ ...prevState, name: true              }))


    }, [attempted, formState.name, setErrorState]);
    


    
    // error checking for email field
    useEffect(() => {
        
        if (!attempted) { return; }

        const email          = formState.email as string;

        if (email) {

            const emailCondition = email.indexOf('@')  ===  -1   ||
                                   email.indexOf('.')  ===  -1   ;

                 setErrorState((prevState) => ({ ...prevState, email: emailCondition  }))

        } else { setErrorState((prevState) => ({ ...prevState, email: true            })) }

    }, [attempted, formState.email, setErrorState] )





    // error checking for subject field
    useEffect(() => {
    
        if (!attempted) { return; }
    
        const subject = formState.subject as string;
        
        subject ? setErrorState((prevState) => ({ ...prevState, subject: subject.length === 0 }))
                : setErrorState((prevState) => ({ ...prevState, subject: true                 }))


    }, [attempted, formState.name, formState.subject, setErrorState]);




    // error checking for message field
    useEffect(() => {
        
        if (!attempted) { return; }

        const message = formState.message as string;

        message ? setErrorState((prevState) => ({ ...prevState, message: message.length === 0 }))
                : setErrorState((prevState) => ({ ...prevState, message: true                 }))

    }, [attempted, formState.message, setErrorState] )









     // email delivery function
     const sendEmail = (e: React.SyntheticEvent) => {
        
        // clear status message.
        setStatus('');

        // set attempted to true to trigger error checking.
        setAttempted(true);

        // determines whether any fields are flagged as errors.
        const hasError = Object.values(errorState).some(error => error === true);

        // if any fields are flagged as errors, do not send email and display error message
        if (hasError){ return setStatus(`looks like you left a field blank or didn't provide a return email...`); } 
            
        // otherwise, send email.
        else {

            // prevent default form submission behavior.
             e.preventDefault();

            // set uploadProgress to 1 to display delivery message.
            setStatus('delivering email...')

            const reqSuccess : string = 'Email successfully delivered! Thanks for reaching out';
            const reqFailure : string = 'There was a problem delivering your email. Please try again later.';    
            
            
            
            console.log(import.meta.env.VITE_API_URL);

      
            // send email to server for delivery        email endpoint expects a req.body object, not an array.
            Axios.post(`${import.meta.env.VITE_API_URL}email`, {...formState}  )
                 .then( ()  =>  setStatus(reqSuccess)                          )
                .catch( ()  =>  setStatus(reqFailure)                          );
        }
    }

   
    

    return (<>

        <p className='h-4'>{(typeof formState.email === 'string' && typeof formState.name === 'string') && [formState.email, formState.name]}</p>

        <Input name='name'    type='text'     state={formState} error={errorState} setter={setFormState} />
        <Input name='email'   type='text'     state={formState} error={errorState} setter={setFormState} />
        <Input name='subject' type='text'     state={formState} error={errorState} setter={setFormState} />
        <Input name='message' type='textArea' state={formState} error={errorState} setter={setFormState} />
        <Button text='Submit' onClick={sendEmail} />
        <p className='h-4'>{status}</p>
    </>)
}
/*
                                                                                    ^^^^^^
                                                                                    setter in EmailForm.tsx is giving me this:
                                                                                    Type 'Dispatch<SetStateAction<Record<string, string | number | boolean>>>' is not assignable to type '(value: Record<string, string | number | boolean> | ((prevState: Record<string, unknown>) => Record<string, unknown>)) => void'.
  Types of parameters 'value' and 'value' are incompatible.
    Type 'Record<string, string | number | boolean> | ((prevState: Record<string, unknown>) => Record<string, unknown>)' is not assignable to type 'SetStateAction<Record<string, string | number | boolean>>'.
      Type '(prevState: Record<string, unknown>) => Record<string, unknown>' is not assignable to type 'SetStateAction<Record<string, string | number | boolean>>'.
        Type '(prevState: Record<string, unknown>) => Record<string, unknown>' is not assignable to type '(prevState: Record<string, string | number | boolean>) => Record<string, string | number | boolean>'.
          Type 'Record<string, unknown>
*/