







import   Form                  from '../../../common/forms/Form';

import { Field, 
         FormState, 
         NewStatusFunction  }  from '../../../types/form';


import   Axios                 from 'axios';



export default function ContactInfo( { doneeInfo } : { doneeInfo : FormState } ) {




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


      return  Axios.post(`${import.meta.env.VITE_API_URL}updateDoneeInfo`,       reqBody        )
        .then(  res => { console.log(res); newStatus('information successfully updated!');    } )
        .catch( err => { console.log(err); newStatus('there was an error saving your info.'); } );
    }

    return (
            
            <Form fields={fields} onSubmit={handleSubmit} initialValues={doneeInfo} />
    )
}