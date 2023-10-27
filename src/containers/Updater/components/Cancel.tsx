




import   Button      from "../../../common/buttons/Button";

import   Axios       from "axios";

import { FormState } from "../../../types/form";




export default function Cancel ({ doneeInfo } : { doneeInfo : FormState } )   : JSX.Element {




    function cancelSubscription() {

        function cancel() {

        const reqBody = {
                            action: 'cancel',
                            subscriptionId: doneeInfo.subscription_id
                        }

        Axios.post(`${import.meta.env.VITE_API_URL}manageSubscription`, reqBody  )
             .then(  res => console.log(res)                                     )
             .catch( err => console.log(err)                                     );
        }

        window.confirm('are you sure you want to cancel?') && cancel();
    }

    return (
        <div className='w-[80%] m-8'>
            <p>cancel if you must.</p>
            <Button text='cancel' onClick={cancelSubscription} />
        </div>
    );
}