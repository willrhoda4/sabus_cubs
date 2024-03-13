










/**
 *  simple login/password-reset page for the admin dashboard.
 *  we'll diagnose whether it's a password reset based on the token in the url.
 * 
 *  from there, we'll use ternary operators to determine the behaviour of the form.
 *  it looks like a lot, but it's actually moostly comments and click handlers.
 */





import { useState, 
         useEffect }        from 'react';

import   useNewStatus       from '../../../hooks/useNewStatus';

import   useNotification    from '../../../hooks/useNotification';


import   validate           from '../../../utils/validate';

import   Axios              from 'axios';

import   Card               from '../../../common/cards/Card';
import   Button             from '../../../common/buttons/Button';
import   Input              from '../../../common/forms/Input';

import { LoginProps }       from '../../../types/admin';

import { MiscState  }       from '../../../types/form';

import   clearParams        from '../../../utils/clearParams';





// spartan login page.
export default function Login ( { setAuthenticated } : LoginProps ) : JSX.Element {




    // start by checking if there's a token in the url.
    // if there is, we're resetting the password, otherwise, we're logging in.
    // declare reset for readability.
    const   id                                       = new URLSearchParams(window.location.search).get('id');
    const   token                                    = new URLSearchParams(window.location.search).get('token');
    const   tokenError                               = new URLSearchParams(window.location.search).get('tokenError');
    const   reset                                    = !!token;



    // state variable to manage the form inputs.
    // values are filed in formStatee.
    // errors are tracked in errorState.
    // attempted tracks whether the user has tried to submit the form.
    // we use this to determine whether to display error messages.
    // tokenError tracks whether we wound up here due to a bad token.
    const [ formState,         setFormState        ] = useState<Record< string, MiscState >>({});
    const [ errorState,        setErrorState       ] = useState<Record< string, unknown   >>({});
    const [ attempted,         setAttempted        ] = useState<boolean>(false);
    const [ isTokenError,      setIsTokenError     ] = useState<boolean>(false);

    // custom hooks to handle the status message and notification.
    const [ statusRef,         newStatus           ] = useNewStatus();
    const                      notification          = useNotification();



    // if there is a token error, display a message.
    // activate the tokenErrorState to display the message,
    // throw up a notification,
    // and clear the tokenError from the url.
    useEffect(() => { 
        
        if (tokenError) { 
                            setIsTokenError(true);
                            notification('there was a problem with your token...')
                            clearParams(); 
                        } 
                    
    }, [notification, tokenError])

    // manages error checking for name and password inputs
    // this mostly depends on the validate() function
    useEffect(() => {

        
        const loginValidation = {
                                    email:             !validate(   'email',          formState[ 'email'     ] ),
                                    password:          !validate( [ 'length', 8 ],    formState[ 'password'  ] ),
                                }

        const resetValidation = {
                                    password:          !validate( [ 'length', 8 ],    formState[ 'password'  ] ),
                                    confirm_password:  !validate( [ 'length', 1 ],    formState[ 'password'  ] ),
                                }


        setErrorState( prevState => ( { ...prevState, ...( reset ? resetValidation : loginValidation) } ) );

    }, [ formState, reset ] )


    // checks the password against the database.
    // if it's a match, set the authenticated state to true.
    // otherwise, display an error message.
    function login () {


        setAttempted(true);

        if ( errorState.email    ||
             errorState.password ){ return newStatus('make sure all fields are filled out correctly.'); }
            
        newStatus('verifying password...', false)
           
        // if this goes through, we'll set the authenticated state to true,
        // throw up a notification and store the token in local storage.
        // set
        // otherwise, we'll display an error message with newStatus().
        const loginSuccess = (token : string) => {
                                                    setAuthenticated( true );
                                                    notification( 'login successful!' );
                                                    localStorage.setItem( 'jwt', token );
                                                 }
        const loginFailure = () =>      newStatus('invalid password. please try again.');

        const loginError   = () =>      newStatus('there was a problem with the server. please try again later.');

        const emailFailure = () =>      newStatus('invalid email. please try again.');


        Axios.post(`${import.meta.env.VITE_API_URL}checkPassword`,  [ formState ] )
             .then( res => {    
                                res.data.token          ? loginSuccess(res.data.token)
                              : res.data === 'no user'  ? emailFailure()
                              : res.data === 'invalid'  ? loginFailure()
                                                        : loginError();
                           }                                               )
            .catch( ()  =>                                loginError()     );
    }


    



    // generates a reset link and sends it to the user's email.
    function registerReset () {


        newStatus('generating reset link...', false);

        if ( errorState.email ){ return newStatus('we can\'t send you a link without an email.'); }


        const resetSuccess = () => {
                                        newStatus('reset registered!');
                                        notification('a reset link should be waiting in your inbox.');
                                   }

        const resetError   = () =>      newStatus('there was a problem resetting your pasword. please try again later.');


        Axios.post(`${import.meta.env.VITE_API_URL}resetLink`, [ formState.email ]  )
             .then( () => resetSuccess()                                            )
            .catch( () => resetError()                                              );

    }



    // login function for password resets.
    // updates the password in the database and 
    // sets the authenticated state to true.
    function resetPassword () {

        // set the attempted state to true.
        setAttempted(true);

        // if the password is too short, notify with a status message.
        if      ( errorState.password        ) { return newStatus( 'Make sure your new password is at least eight characters long.' ); }

        // if the passwords don't match, notify with a status message.
        else if ( formState.password   !== 
                  formState.confirm_password ) { return newStatus( 'Make sure your passwords match.'                                ); }

        // otherwise...
        else    {
            
            // update the status message 
            newStatus('Storing new password. You should be redirected shortly...', false)
            
            // send the new password and token to the server.
            Axios.post(`${import.meta.env.VITE_API_URL}resetPassword`,  [ formState.password, token, id ] )
                 .then( res => {
                                     // if the server returns an error message, update the status message.
                                    if (res.data === 'invalid token'  ||
                                        res.data === 'expired token'  ){ newStatus( res.data ) }    
                                        
                                    // otherwise, let them in.
                                    else                               { 
                                                                            // set the authenticated state to true,
                                                                            // throw up a notification and store the token in local storage.
                                                                            setAuthenticated(true); 
                                                                            notification('password reset successful!');
                                                                            localStorage.setItem( 'jwt', res.data.token );

                                                                            // Remove query parameters from the URL
                                                                            clearParams();
                                                                       }
                               }                                                                   
                      )       // if anything goes wrong, notify the user with a status message.
                .catch( () => newStatus('there was an error resetting your password. please refresh the browser and try again.') );
        }
    }



    // handles the form submission.
    function onSubmit (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault(); // Prevent the default form submission behavior
        reset ? resetPassword() : login();
    }

    // onKeyDown handler that calls the submit handler if the user presses enter
    function enterListener (e: React.KeyboardEvent<HTMLFormElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit(e as unknown as React.FormEvent<HTMLFormElement>); // Casting the event type
        }
    }




    // error messages for the login page.
    const errorMsg = {
                        email:    'enter a valid email address.',
                        password: 'enter your password.',
                        tooShort: 'enter a password that is at least eight characters long.',
                        mismatch: 'make sure your passwords match.',
                     }

    const tokenErrorMsg = 'It looks like your token is either invalid or expired. Please log back in.'


    return (

        <div className={`
                            w-full h-fit
                            flex flex-col items-center
                            bg-white
                       `}>
     
            {/* we'll leverage our card component to display the form. */}
            <Card 
                wrapClass='max-w-2xl my-20 relative'
                contentClass=' p-2 flex flex-col items-center bg-white'
                headingClass='bg-brand-red text-white'
                heading={ reset ? 'reset password' : 'login' }
            >

                <form onKeyDown={enterListener} onSubmit={onSubmit} className='w-full flex flex-col items-center'>

                    {/* if there's a token error, display a message. */}
                    { isTokenError &&
                        <p className={`
                                        text-center 
                                        text-brand-red 
                                        font-body 
                                        mt-4 mb-2`
                        }>{tokenErrorMsg}</p>
                    }

                    {/* we'll need two text fields in any case,
                        but the values they'll expect will change dynamically. */}
                    <Input                      
                        name={        reset ? 'password' : 'email'                      }
                        type={        reset ? 'password' : 'text'                       }
                        state={       formState                                         }
                        setter={      setFormState                                      }
                        error={       errorState                                        }
                        errorStyles={ attempted                                         }
                        errorMsg={    reset ? errorMsg.tooShort : errorMsg.email        }
                        wrapStyle={  'w-full max-w-xl'                                  }
                    />
                                                                            
                    <Input                      
                        name={        reset ? 'confirm_password' : 'password'           }
                        type={       'password'                                         }
                        state={       formState                                         }
                        setter={      setFormState                                      }
                        error={       errorState                                        }
                        errorStyles={ attempted                                         }   
                        errorMsg={    reset ? errorMsg.mismatch : errorMsg.password     }
                        wrapStyle={  'w-full max-w-xl'                                  }
                    />

                    
                    {/* p element to receive status messages */}
                    <p ref={statusRef} className={`
                                                    font-body mt-4 mb-2 
                                                    h-8 w-8/12 text-center
                                                `} 
                    />

                    {/* buttons wrapper. will display two buttons for login,
                        but only a single button for password resets. */}
                    <div className='p-8 flex justify-center'>



                        <Button
                            text={    reset ? 'reset password' : 'login' }
                            onClick={ onSubmit }
                            styles='mx-2'    
                        />

                        { !reset &&
                            <Button
                                text='reset '
                                onClick={registerReset}
                            />
                        }
                        
                    </div>
                </form>
            </Card>
        </div>
    )
}