







import { useState,
         useEffect     }   from 'react';

import   useNewStatus      from '../../../hooks/useNewStatus';
import   useRenderKey      from '../../../hooks/useRenderKey';
import   useToggleRef      from '../../../hooks/useToggleRef';

import   validate          from '../../../utils/validate';

import { CardElement,
         useElements, 
         useStripe,    }   from '@stripe/react-stripe-js';

import   Axios             from 'axios'
import { v4 as uuidv4  }   from 'uuid';




import   AmountSelector    from './AmountSelector';

import   Input             from '../../../common/forms/Input'

import   Button            from '../../../common/buttons/Button';


import { MiscState       } from '../../../types/form';    

import   copy              from '../../../assets/copy';


 

export default function Donate() {



    const [ amount,         setAmount        ]   = useState<number>(5);
    const [ formState,      setFormState     ]   = useState<Record< string, MiscState >>({});
    const [ errorState,     setErrorState    ]   = useState<Record< string, unknown   >>({});
    const [ attempted,      setAttempted     ]   = useState<boolean>(false);
    
    
    const [ statusRef,      newStatus        ]   = useNewStatus();
    const [ renderKey,      clearStripe      ]   = useRenderKey();
    const [ isClicked,      setIsClicked     ]   = useToggleRef(false);
    
    
    const   stripe                               = useStripe();   // Hook to access the Stripe    object
    const   elements                             = useElements(); // Hook to access     Stripe.js elements







    // manages error checking for name and email inputs
    useEffect(() => {



        setErrorState( prevState => ({
                                        ...prevState,
                                        name:  !validate( [ 'length', 1 ],    formState[ 'name'  ] ),
                                        email: !validate(   'email',          formState[ 'email' ] )
                                    }) 
                     );

    }, [formState])




    const handleSubmit = async (e: React.FormEvent) => {         


        // Prevent the browser from refreshing
        e.preventDefault();


        // if the button is already clicked, do nothing.
        // it's probably a double-click, anyway.
        // if not, toggle ref to true to prevent multiple clicks
        if (isClicked())  { return; }
         setIsClicked(true);


        // Set the attempted flag to true
        // to activate error styles if needed.
        setAttempted(true);


        // check for errors.
        // exit and update the status message if there are any.
        if ( errorState.name    ||
             errorState.email   ){     setIsClicked(false); 
                                   return newStatus('please fix the errors in the form...'); 
                                 }
        
          


        // if Stripe.js hasn't loaded yet, call it off.
        // throw up a message to explain.
        if (!stripe || !elements) {     setIsClicked(false); 
                                    return newStatus('still loading...'); 
                                  }


        // Get a reference to Stripe's `CardElement`
        const card = elements.getElement(CardElement);
      

        // If the card element is not found,
        // abort and throw up a message to explain.
        if (!card) {         setIsClicked(false); 
                     return newStatus('there was a problem loading the form...'); 
                   }

   
        // we can assume it's monthly for updates.
        const monthly = formState.monthly as boolean;


        // if you made it this far, 
        //update the status message to let the user know what's happening.                        
        newStatus(`processing ${ monthly ? 'subscription' : 'donation' }...`, false);


        // Create a PaymentMethod object with the card details
        const result = await stripe.createPaymentMethod({
                                                            type: 'card',
                                                            card,
                                                       });

                                                    
        // make sure the card was created successfully before proceeding.                                           
        if (result.error) {     setIsClicked(false); 
                            return newStatus('there was a problem validating your card...'); 
                          } 
       

        const cardId  = result.paymentMethod.id;

        const problem = 'there was a problem recieving you donation...';

        const thanks  = 'thank you for your generosity!'

        const reqBody = {
                            amount,
                            name:  formState.name,
                            email: formState.email,
                            idempotencyKey: uuidv4(),
                        }


        function clearForm () {

            setFormState({});
            setErrorState({});
            setAttempted(false);
            clearStripe();
            setIsClicked(false); 
        }


                                                    
        if ( monthly ) {
                            await Axios.post(`${import.meta.env.VITE_API_URL}startMonthlyDonations`, { ...reqBody, token: cardId } )
                                       .then(   () =>  { clearForm();               return newStatus(thanks)                     } )
                                       .catch(  () =>  { setIsClicked(false);       return newStatus(problem);                   } );
                                  
                       }

        else           {
                            const clientSecret = await Axios.post( `${import.meta.env.VITE_API_URL}oneTimeDonation`,    reqBody       )
                                                            .then( res => { return res.data.clientSecret;                           } )
                                                            .catch( () => { setIsClicked(false); return newStatus(problem);         } );
                
                
                            // Confirm the payment with the client secret from PaymentIntent
                            const confirmResult = await stripe.confirmCardPayment( clientSecret,  { payment_method: cardId, } );
                
                            if (confirmResult.error) {  
                                                        setIsClicked(false); 
                                                        console.log( confirmResult.error.message );
                                                        newStatus( problem );                           
                                                     } 
                            else                     {  
                                                        console.log( 'Payment succeeded:', confirmResult.paymentIntent.id );
                                                        newStatus(thanks);
                                                        clearForm(); 
                                                     }
                       }
    };






    // style options for Stripe's portion of the form
    const cardElementOptions = {
        style: {
            base: {
                color: "#000", // Text color
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif', // Font family
                fontSmoothing: "antialiased", // Font smoothing
                fontSize: "16px", // Font size
                fontWeight: "bold", // Bold text
                '::placeholder': { color: "#6c757d", },// Placeholder text color
                iconColor: '#666EE8', // Color of the icon inside the CardElement
            },
            invalid: {
                color: '#dc3545', // Text color when input is invalid
                iconColor: '#dc3545', // Icon color when input is invalid
            },
        },
        hidePostalCode: true, // Hide the postal code field if not needed
    };
    
    









    // error message for the email input
    const emailErrorMsg = formState.monthly ? 'a valid email is required to manage your subscription'
                                            : 'please provide a valid email.';


    // styles for form's p elements
    const pStyles = 'font-body w-full py-8 pr-[40%]'




    return (

        <div>

            <form className={`
                                h-fit w-full 
                                flex flex-col
                                items-center
                                min-w-[900px]
                                p-8
                            `}
            >
                
               
                    
                    { copy('donate', pStyles) }

                    <Input                      
                        name={      'name'                  }
                        type={      'text'                  }
                        state={      formState              }
                        setter={     setFormState           }
                        error={      errorState             }
                        errorStyles={ attempted             }
                        errorMsg={   'Any name works.'}
                        />
                                                                            
                    <Input                      
                        name={      'email'                 }
                        type={      'text'                  }
                        state={      formState              }
                        setter={     setFormState           }
                        error={      errorState             }
                        errorStyles={ attempted             }   
                        errorMsg={   emailErrorMsg          }
                    />

                    <Input                      
                        name={      'monthly'               }
                        type={      'toggle'                }
                        options={ [ 'one-time', 'monthly' ] }
                        state={      formState              }
                        setter={     setFormState           }
                    />


                    <AmountSelector 
                            amount={amount} 
                         setAmount={setAmount} 
                        wrapStyles='self-start my-8'    
                    />

                    <p className={pStyles}>{`With a donation of $${amount} we can afford some stuff!`}</p>

                    <div className='w-full h-12 m-4' >
                        <CardElement key={renderKey}  options={cardElementOptions} />
                    </div>

                    <Button onClick={handleSubmit} text={`contribute $${amount}${formState.monthly ? ' a month' : ''}`} />

                    <p ref={statusRef} />


            </form>


        </div>
    );
}

