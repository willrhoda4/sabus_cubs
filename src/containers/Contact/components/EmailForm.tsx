








import   Form                from '../../../common/forms/Form';

import { Field,
         FormState,
         NewStatusFunction } from '../../../types/form'; 


import { useState,
         useEffect         } from 'react';   

import   Axios               from 'axios';



export default function EmailForm(): JSX.Element {


    const [ urlValues, setUrlValues ] = useState<Record<string, string>>({});

    const subject = new URLSearchParams(window.location.search).get('subject');

    useEffect(() => { subject && setUrlValues({ subject: subject }); }, [subject])


    




    const fields : Field[] =    [     
                                    {
                                        name:        'name',    
                                        type:        'text',
                                        validation: ['length', 1 ], // can't be blank.
                                        errorMsg:     'Let us know who to reply to!',
                                    },
                                    {
                                        name:       'email',   
                                        type:       'text',
                                        validation: 'email',
                                        errorMsg:   'Please provide a valid email.',
                                    },
                                    {
                                        name:         'subject', 
                                        type:         'text',
                                        validation: ['length', 1 ], // can't be blank. 
                                        errorMsg:     'What is this about?',
                                    },
                                    {
                                        name:         'message', 
                                        type:         'textArea',
                                        validation: ['length', 1 ], // can't be blank.
                                        errorMsg:     'Looks like you forgot to write a message.',
                                    },
                                ];




    // email delivery function
    function sendEmail ( formState : FormState, newStatus : NewStatusFunction, resetForm : () => void ) {
        
        // clear status message.
        newStatus('delivering email...')

        const reqSuccess : string = 'Email successfully delivered! Thanks for reaching out';
        const reqFailure : string = 'There was a problem delivering your email. Please try again later.';    
        
      
            // send email to server for delivery        email endpoint expects a req.body object, not an array.
        return    Axios.post(`${import.meta.env.VITE_API_URL}public/email`,  formState      )
                       .then( ()  =>  {   newStatus(reqSuccess); resetForm();     }  )
                      .catch( ()  =>      newStatus(reqFailure)                      );
    }
    







    return < Form fields={fields} onSubmit={sendEmail} initialValues={urlValues} />;
}












