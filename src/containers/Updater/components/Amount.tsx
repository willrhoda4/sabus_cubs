








import   Axios                 from 'axios';

import   Form                  from "../../../common/forms/Form";

import { Field, 
         FormState, 
         NewStatusFunction  }  from '../../../types/form';


export default function Amount({ doneeInfo } : { doneeInfo : FormState } ) : JSX.Element {


    const fields : Field[] =    [
                                    {
                                        name:             'amount',
                                        type:             'select',
                                        options:          [1, 1000],
                                        validation:       'number',
                                        errorMsg:         'provide a value in dollars. 20 = $20'
                                    },
                                ];

    function handleSubmit (formState : FormState, newStatus : NewStatusFunction) : Promise<boolean|void> {


        newStatus('updating donation amount...', false);

        const reqBody = {
                            action:        'adjust',
                            subscriptionId: doneeInfo.subscription_id,
                            newAmount:      formState.amount
                        }

        return Axios.post( `${import.meta.env.VITE_API_URL}manageSubscription`,                    reqBody  )
                    .then(  res => { console.log(res); newStatus('information successfully updated!');    } )
                    .catch( err => { console.log(err); newStatus('there was an error saving your info.'); } );

    }




    return (
    
        <div>
            <p>Enter an amount in dollars</p>
            <Form fields={fields} onSubmit={handleSubmit} initialValues={doneeInfo} />    
        </div>
    )
}