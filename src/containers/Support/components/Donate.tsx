







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

import   UpdateTrigger     from './UpdateTrigger';    


import   ButtonBank        from '../../../common/buttons/ButtonBank';

import   Input             from '../../../common/forms/Input'

import   Button            from '../../../common/buttons/Button';

import { ButtonBankProps } from '../../../types/button';



 

export default function Donate() {



    const [ amount,         setAmount        ]   = useState<number>(5);
    const [ formState,      setFormState     ]   = useState<Record< string, string | number | boolean | File >>({});
    const [ errorState,     setErrorState    ]   = useState<Record<string, unknown>>({});
    const [ attempted,      setAttempted     ]   = useState<boolean>(false);
    
    
    const [ statusRef,      newStatus        ]   = useNewStatus();
    const [ renderKey,      clearStripe      ]   = useRenderKey();
    const [ isClicked,      setIsClicked     ]   = useToggleRef(false);
    
    
    const   stripe                               = useStripe();                                                 // Hook to access the Stripe    object
    const   elements                             = useElements();                                               // Hook to access     Stripe.js elements







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
                color:         "#000",
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





    // props for the donation selector buttons
    const donationSelectorProps : ButtonBankProps=  {

                names:       [ '5',                 '10',                 '20',                 '50',               '100'                 ],
                onClicks:    [  ()=>setAmount(5),    ()=>setAmount(10),    ()=>setAmount(20),    ()=>setAmount(50),  ()=>setAmount(100)   ],
                wrapStyle:     'pl-4 m-4',
                currentState:   amount,
    }






    // error message for the email input
    const emailErrorMsg = formState.monthly ? 'a valid email is required to manage your subscription'
                                            : 'please provide a valid email.';







    return (

        <div>

            <form className={`
                                h-fit w-full 
                                flex flex-col
                                items-center
                                p-12
                                border border-orange-300
                            `}
            >
                
                {/* Component to collect card details */}
                <div className={`
                                    w-full rounded-md 
                                    font-bold 
                                    border-2 border-black bg-white 
                                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                                    p-4
                                    max-w-[900px]
                                    flex flex-col
                            `}
                >
                    
                    <p>{`$${amount} is enough to afford some things!`}</p>

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

                    <ButtonBank { ...donationSelectorProps } />

                    <CardElement key={renderKey} options={cardElementOptions} />

                    <Button onClick={handleSubmit} text='Donate Now!' />

                    <p ref={statusRef} />

                </div>

            </form>

            <UpdateTrigger />

        </div>
    );
}

