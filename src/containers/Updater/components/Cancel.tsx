




import   Button             from "../../../common/buttons/Button";

import   copy               from "../../../assets/copy";

import   Axios              from "axios";

import { FormState }        from "../../../types/form";

import   useNewStatus       from '../../../hooks/useNewStatus';
import   useNotification    from '../../../hooks/useNotification';

import   authToken          from '../../../utils/authToken';





export default function Cancel ({ doneeInfo } : { doneeInfo : FormState } )   : JSX.Element {


    const [ statusRef,   newStatus     ] = useNewStatus();
    const                notification    = useNotification();

    function cancelSubscription() {

        function cancel() {

            const successMsg          = 'subscription cancelled.';
            const successNotification = 'Thanks again.';
            const failureMsg          = 'there was a problem cancelling your subscription.'; 
            const failureNotification = 'Please try again, and email us if this keeps up.';

            const reqBody = {
                                action: 'cancel',
                                subscriptionId: doneeInfo.subscription_id
                            }

            newStatus('cancelling subscription...', false);

            Axios.post(`${import.meta.env.VITE_API_URL}stripe/manageSubscription`, reqBody, authToken() )
                 .then(  () => { newStatus(successMsg); notification(successNotification); }            )
                 .catch( () => { newStatus(failureMsg); notification(failureNotification); }            );
        }

        window.confirm('Are you sure you want to stop supporting Sabu\'s Cubs?') && cancel();
    }


    return (
        <div className='w-full h-fit flex flex-col items-center'>

            { copy('cancel', 'max-w-2xl text-center my-8') }

            <Button text='cancel' onClick={cancelSubscription} />

            <p ref={statusRef} className='h-8 my-4'/>

        </div>
    );
}