









import {  CardElement, 
          useElements, 
          useStripe     } from '@stripe/react-stripe-js';

import    Axios           from 'axios';

import    Button          from '../../../common/buttons/Button';

import    useNewStatus    from '../../../hooks/useNewStatus';
import    useToggleRef    from '../../../hooks/useToggleRef';
import    useRenderKey    from '../../../hooks/useRenderKey'
import    useNotification from '../../../hooks/useNotification';

import {  FormState     } from '../../../types/form';

import    authToken       from '../../../utils/authToken';







export default function CreditCard({ doneeInfo } : { doneeInfo : FormState } ) : JSX.Element {


    
    
    // Stripe.js hooks for interacting with the Stripe library
    const   stripe                       = useStripe();
    const   elements                     = useElements();

    // custom hook for setting the status message
    const [  statusRef,  newStatus    ]  = useNewStatus();
    const [  isClicked,  setIsClicked ]  = useToggleRef();
    const [  renderKey,  clearStripe  ]  = useRenderKey();
    const    notification                = useNotification();
    const    exitForm                    = ( msg : string ) => { newStatus(msg); setIsClicked(false); }




    // Options to style the Stripe CardElement
    const cardElementOptions = {

        style: {
        base: {
            color:        "#000",
            fontFamily:   '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize:      "16px",
            "::placeholder": { color: "#6c757d" },
        },
        invalid: {
            color:     "#dc3545",
            iconColor: "#dc3545"
        }
        },
        hidePostalCode: true,
    };


    async function handleSubmit(e: React.FormEvent) {


        if (isClicked()) return;


        e.preventDefault();


        newStatus('updating credit card information...', false);


        setIsClicked(true);

        // Ensure stripe and elements are loaded
        if (!stripe || !elements) { return exitForm('Stripe.js has not loaded yet.'); }


        // Retrieve CardElement from the current elements
        const card = elements.getElement(CardElement);


        if  (!card) { return exitForm('Error finding card element.'); }


        // Create a token using the card element
        const { token, error } = await stripe.createToken(card);


        if (error) {

            error.message && exitForm(error.message);  // Set error message for rendering
            return console.error('Error creating token:', error);
        }

        try {

            const reqBody = {
                                customerId:      doneeInfo.customer_id,
                                subscriptionId:  doneeInfo.subscription_id,
                                token:           token.id
                            }

            // Send token ID to your server to handle the next steps
            const response = await Axios.post(`${import.meta.env.VITE_API_URL}stripe/updateCreditCard`, reqBody, authToken() );

            console.log('Card Info Updated:', response.data);
            clearStripe();
            notification('thanks for keeping your informationm up to date!');
            return exitForm('Information successfully updated!'); 

        } catch (error) {
            
            console.error('Error updating card info:', error);
            notification('looks like there was a problem. Please try again.');
            return exitForm('there was an error updating your information.');  
        }
    }

    return (

        <div className="h-fit w-full flex flex-col items-center">

            
            <h2 className="text-lg font-bold mb-4">Update Credit Card Info</h2>

            <div className='w-full max-w-xl my-8'>
                <CardElement key={renderKey} options={cardElementOptions} />
            </div>
            
            {/* status message */}
            <p ref={statusRef} className='h-8 py-8 self-center'/>

            <Button 
                onClick={handleSubmit} 
                   text='Update Card Info'
            />
            


        </div>
    );
}






















