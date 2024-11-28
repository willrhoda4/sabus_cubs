






/**
 * donation component for the support page.
 * 
 * there's a lot going on here, so we'll break it down as we go.
 */




// hook inmports
import { useState,
         useEffect     }     from 'react';
import { Link          }     from 'react-router-dom';

import   useNewStatus        from '../../../hooks/useNewStatus';
import   useRenderKey        from '../../../hooks/useRenderKey';
import   useToggleRef        from '../../../hooks/useToggleRef';
import   useNotification     from '../../../hooks/useNotification';

// function imports
import   validate            from '../../../utils/validate';
import   thisBuysUs          from './thisBuysUs';
import   copy                from '../../../assets/copy';

// stripe imports
import { CardElement,
         useElements, 
         useStripe,    }     from '@stripe/react-stripe-js';

// library imports
import   Axios               from 'axios'
import { v4 as uuidv4  }     from 'uuid';

// util imports
// component imports
import   AmountSelector      from './AmountSelector';
import   Input               from '../../../common/forms/Input'
import   Button              from '../../../common/buttons/Button';
import   Card                from '../../../common/cards/Card';

// type imports
import { MiscState       }   from '../../../types/form';    



 

export default function Donate ( { pStyles } : { pStyles : string } ) : JSX.Element {



    /**
     *  amount tracks the amount of the donation.
     *  formState is the state object for the form.
     *  errorState is the error object for the form.
     *  attempted is a boolean that tracks whether the user has attempted to submit the form yet.
     *  (this is used to activate error styles if needed)
     */
    const [ amount,         setAmount        ]   = useState<number>(5);
    const [ formState,      setFormState     ]   = useState<Record< string, MiscState >>({});
    const [ errorState,     setErrorState    ]   = useState<Record< string, unknown   >>({});
    const [ attempted,      setAttempted     ]   = useState<boolean>(false);
    

    /**
     *  statusRef is a reference to the status message element.
     *  newStatus is a function that updates the status message.
     *  renderKey is a key that is used to force the Stripe card element to re-render.
     *  clearStripe is a function that clears the Stripe card element.
     *  isClicked is a boolean that tracks whether the user has clicked the submit button yet.
     *  (this is used to prevent multiple clicks)
     *  notification is a function that displays a notification.
     */
    const [ statusRef,      newStatus        ]   = useNewStatus();
    const [ renderKey,      clearStripe      ]   = useRenderKey();
    const [ isClicked,      setIsClicked     ]   = useToggleRef(false);
    const                   notification         = useNotification();
    
    // stripe hooks
    const   stripe                               = useStripe();   // Hook to access the Stripe    object
    const   elements                             = useElements(); // Hook to access     Stripe.js elements






    // manages error checking for name and email inputs
    // this mostly depends on the validate() function
    useEffect(() => {

        setErrorState( prevState => ({
                                        ...prevState,
                                        name:  !validate( [ 'length', 1 ],    formState[ 'name'  ] ),
                                        email: !validate(   'email',          formState[ 'email' ] )
                                    }) 
                     );

    }, [ formState ] )



    // the handleSubmit function is called when the user clicks the submit button.
    // it's a big one, so we'll break it down as we go.
    const handleSubmit = async (e: React.FormEvent) => {         


        // Prevent the browser from refreshing
        e.preventDefault();


        // if the button is already clicked, do nothing.
        // it's probably a double-click, anyway.
        // if not, toggle ref to true to prevent multiple clicks
        if (isClicked())  { return; }
         setIsClicked(true);


        // Set the attempted flag to true after first attempt,
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

   
        // declare monthly for readability's sake.
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
       

        // declare cardId for readability's sake.
        const cardId  = result.paymentMethod.id;


     
        // notification functions for failed donations                  
        const donationFailed     = () => {
                                            newStatus('donation error!');
                                            notification('there was a problem recieving you donation...');
                                         }
        
        // notification functions for successful donations                  
        const donationSucceeded = () =>  {
                                            newStatus('donation succeded!');
                                            notification('thank you for your generosity!');
                                         }

        // request body for the donation request
        const reqBody = {
                            amount,
                            name:  formState.name,
                            email: formState.email,
                            idempotencyKey: uuidv4(),
                        }


        // helper function to clear the form after a successful donation
        function clearForm () {

            setFormState({});
            setErrorState({});
            setAttempted(false);
            clearStripe();
            setIsClicked(false); 
        }


        // monthly donations are handled by their own endpoint.                                            
        if ( monthly ) {
                            await Axios.post(`${import.meta.env.VITE_API_URL}public/startMonthlyDonations`, { ...reqBody, token: cardId } )
                                       .then(   () =>  { clearForm();               return donationSucceeded();                         } )
                                       .catch(  () =>  { setIsClicked(false);       return donationFailed();                            } );
                                  
                       }

        else           {    // one-time donations need to retrieve a client secret
                            // from the server before getting sent to Stripe.
                            const clientSecret = await Axios.post( `${import.meta.env.VITE_API_URL}public/oneTimeDonation`,    reqBody       )
                                                            .then( res => { return res.data.clientSecret;                                  } )
                                                            .catch( () => { setIsClicked(false); return donationFailed();                  } );
                
                
                            // confirm the payment with the client secret from PaymentIntent.
                            const confirmResult = await stripe.confirmCardPayment( clientSecret,  { payment_method: cardId, } );
                
                            if (confirmResult.error) {  
                                                        setIsClicked(false); 
                                                        return donationFailed();                           
                                                     } 
                            else                     {  
                                                        clearForm(); 
                                                        return donationSucceeded();
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







    return (


        <form className={`
                            h-fit w-full 
                            flex flex-col 
                           
                        `}
        >
            
            
                {/* intro paragraph */}
                { copy('donate', pStyles) }


                {/* name and email inputs, followed by monthly toggle */}
                <Input                      
                    name={       'name'                  }
                    type={       'text'                  }
                    state={       formState              }
                    setter={      setFormState           }
                    error={       errorState             }
                    errorStyles={ attempted              }
                    errorMsg={   'any name works.'       }
                    wrapStyle={  'w-full max-w-xl'       }
                    />
                                                                        
                <Input                      
                    name={      'email'                 }
                    type={      'text'                  }
                    state={      formState              }
                    setter={     setFormState           }
                    error={      errorState             }
                    errorStyles={ attempted             }   
                    errorMsg={   emailErrorMsg          }
                    wrapStyle={  'w-full max-w-xl'      }
                />

                <Input                      
                    name={      'monthly'               }
                    type={      'toggle'                }
                    options={ [ 'one-time', 'monthly' ] }
                    state={      formState              }
                    setter={     setFormState           }
                />


                {/* the amount selector, which selects amounts */}
                <AmountSelector 
                        amount={amount} 
                        setAmount={setAmount} 
                    wrapStyles='self-start my-8'    
                />



                {/* impact paragraph generated by thisBuysUs() */}
                <div className='h-36 my-8'>
                    { amount >= 5 && <p className={ pStyles }>{ thisBuysUs( amount, formState.monthly as boolean ) }</p> }
                </div>


                {/*  Stripe card element  */}
                <div className='w-full max-w-xl h-24 my-8' >
                    <CardElement key={renderKey}  options={cardElementOptions} />
                </div>


                {/*  submit button  */}
                <div className='self-center'>
                    <Button onClick={handleSubmit} text={`contribute $${amount}${formState.monthly ? ' a month' : ''}`} />
                </div>


                {/* status message */}
                <p ref={statusRef} className='h-8 py-8 self-center'/>

                <div className='w-full flex justify-center items-center '>
                    <Card 
                        wrapClass='max-w-2xl mt-8 mb-20 relative'
                        headingClass='bg-brand-yellow text-black'
                        heading='tax receipt memo'
                    >
                        { copy('receipts', 'my-8') }

                        <div className='flex justify-center'>
                            <Link 
                                   to={{
                                         pathname: '/contact',
                                         search:   'subject=tax%20receipt%20for%20charitable%20donations',
                                      }}
                                state={{ id:       'email' }} // This will be accessible in `location.state`
                            >
                                <Button text="reach out now" styles="m-4" />
                            </Link>                        
                        </div>
                    </Card>
                </div>

        </form>


    );
}

