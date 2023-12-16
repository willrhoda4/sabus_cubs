







/**
 * The UpdateTrigger component is designed to handle the process of user login for monthly donees.
 * It initially displays a message and a login button. When the user clicks the login button,
 * it switches to a form view where the user can enter their email for login purposes.
 *
 * The component uses a state `loggingIn` to toggle between the initial view and the form view.
 * In the initial view, it displays a message (retrieved using the `copy` function) and a button to initiate login.
 * Once the login button is clicked, `loggingIn` is set to true, and the component renders a form for the user to enter their email.
 *
 * The form submission is handled by `handleSubmit`, which sends a POST request to schedule an update.
 * This function also updates the status message based on the success or failure of the request.
 *
 * Component Structure:
 * - Card: A container that provides a styled card layout.
 *   - Initial View (when `loggingIn` is false):
 *     - Message explaining the update process.
 *     - Button to initiate the login process.
 *   - Form View (when `loggingIn` is true):
 *     - Message prompting for login.
 *     - Form for the user to input their email.
 * 
 * The component uses Axios for making HTTP requests and manages its own state using React's `useState` hook.
 */




import   Axios from 'axios';

import   Form from '../../../common/forms/Form'; 

import { useState } from 'react';



import { Field, 
         FormState, 
         NewStatusFunction  }  from '../../../types/form';

import   Card                  from '../../../common/Card';
import   Button                from '../../../common/buttons/Button';

import   copy                  from '../../../assets/copy';



const UpdateTrigger: React.FC = () => {

        

    const [ loggingIn,   setLoggingIn   ] = useState(false);




    const   fields : Field[] =    [
                                    {
                                        name:             'email',
                                        type:             'text',
                                        validation:       'email',
                                        errorMsg:         'please provide a valid email.'
                                    },
                                  ];



    function handleSubmit ( formState : FormState, newStatus : NewStatusFunction ) : Promise<boolean|void> {


        newStatus('generating login link...', false);
      
        const email = formState.email;

        return Axios.post( `${import.meta.env.VITE_API_URL}scheduleUpdate`,                             { email } )   
                    .then(  res => { console.log(res); newStatus('we sent you an update email.');               } )
                    .catch( err => { console.log(err); newStatus('there was an error scheduling your update.'); } );
    }


    return (
        <div className='px-2'>
            <Card 
                wrapClass='max-w-2xl mt-8 mb-20 relative'
                headingClass='bg-brand-red text-white'
                heading='monthly donee login'
            >

                    {
                        !loggingIn ?    <div className='flex flex-col items-center justify center'>
                                            { copy('update', 'my-8') }
                                            <Button text='login now' onClick={ () => setLoggingIn(true) } />
                                        </div>
                                
                                :    <div className='flex flex-col items-center justify center'>
                                            { copy('login', 'my-8') } 
                                            <Form fields={fields} onSubmit={handleSubmit} />
                                        </div>
                    }

                    


            </Card>
        </div>
    );
};

export default UpdateTrigger;


