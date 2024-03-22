








import   Axios                 from 'axios';

import { useState }            from 'react'; 

import   useNewStatus          from '../../../hooks/useNewStatus';
import   useNotification       from '../../../hooks/useNotification';

import   AmountSelector        from '../../Support/components/AmountSelector';
import   Button                from '../../../common/buttons/Button';

import { FormState  }          from '../../../types/form';

import   authToken             from '../../../utils/authToken';



export default function Amount({ doneeInfo } : { doneeInfo : FormState } ) : JSX.Element {


    const [ amount,      setAmount    ] = useState<number>(50);

    const [ statusRef,   newStatus    ] = useNewStatus();

    const                notification   = useNotification();



    function handleSubmit () : Promise<boolean|void> {


        newStatus('updating donation amount...', false);

         // notification functions for failed and successful updates                  
         const updateFailed     = () => {
            newStatus('update error!');
            notification('there was a problem updating your info...');
        }

        const updateSucceeded = () =>  {
            newStatus('update succeded!');
            notification('thanks for keeping your information up to date!');
        }

        const reqBody = {
                            action:        'adjust',
                            subscriptionId: doneeInfo.subscription_id,
                            newAmount:      amount
                        }

        return Axios.post( `${import.meta.env.VITE_API_URL}stripe/manageSubscription`, reqBody, authToken()  )
                    .then(  res => { console.log(res); updateSucceeded;                                   }  )
                    .catch( err => { console.log(err); updateFailed();                                    }  );

    }




    return (
    
        <div className='w-full h-fit flex flex-col items-center'>
            
            <p className='text-body'>Enter a new amount.</p>

            {/* the amount selector, which selects amounts */}
            <AmountSelector 
                   amount={amount} 
                 setAmount={setAmount} 
                wrapStyles='my-8'    
            />       

            {/* status message */}
            <p ref={statusRef} className='h-8 py-8 self-center'/>


            {/*  submit button  */}
            <div className='self-center'>
                <Button onClick={handleSubmit} text={`contribute $${amount} a month`} />
            </div>




        </div>
    )
}