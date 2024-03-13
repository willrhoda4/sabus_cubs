







import   Form                  from '../../../common/forms/Form';

import { Field, 
         FormState, 
         NewStatusFunction  }  from '../../../types/form';

import   useNotification       from '../../../hooks/useNotification';


import   Axios                 from 'axios';

import   authToken             from '../../../utils/authToken';




export default function ContactInfo( { doneeInfo } : { doneeInfo : FormState } ) {


    const notification = useNotification();

    const fields : Field[] =    [
                                    {
                                        name:             'name',
                                        type:             'text',
                                        validation:      ['length', 0, 140],
                                        errorMsg:         'use any name you choose (under 140 characters).'
                                    },

                                    {
                                        name:             'email',
                                        type:             'text',
                                        validation:       'email',
                                        errorMsg:         'please provide a valid email address.'
                                    }, 
                                ];


    function handleSubmit (formState : FormState, newStatus : NewStatusFunction) {


        newStatus('saving your information...', false)


        const reqBody = {
                            name:       formState.name,
                            email:      formState.email,
                            customerId: doneeInfo.customer_id,
                        }

        // notification functions for failed and successful updates                  
        const updateFailed     = () => {
            newStatus('update error!');
            notification('there was a problem updating your info...');
        }

        const updateSucceeded = () =>  {
            newStatus('update succeded!');
            notification('thanks for keeping your information up to date!');
        }


        return  Axios.post(`${import.meta.env.VITE_API_URL}updateDoneeInfo`, reqBody, authToken() )
                     .then(  res => { console.log(res); updateSucceeded(); }                      )
                     .catch( err => { console.log(err); updateFailed();    }                      );
    }

    const blurb = 'Please provide your preferred name and current email address.';

    return (
        <div>
            <p className='text-body px-2 my-4'>{blurb}</p>
            <Form fields={fields} onSubmit={handleSubmit} initialValues={doneeInfo} />
        </div>
    )
}