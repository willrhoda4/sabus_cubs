







import { useState }             from 'react'

import   Axios                  from 'axios';

import { NewStatusFunction  }   from '../../../types/form';

import   validate               from '../../../utils/validate';

import   useNotification        from '../../../hooks/useNotification';  





interface EmailSignupProps {
    
        buttonColour : string
        newStatus    : NewStatusFunction
    }


export default function EmailSignup( { buttonColour, newStatus } : EmailSignupProps ) : JSX.Element {


    const [ email,     setEmail     ] = useState('')

    const              notification   = useNotification();



    const signUpForNewsletter = (e: React.SyntheticEvent) => {

        e.preventDefault()

        if ( email === ''              ) return newStatus( 'to sign up, please enter your email.');

        if ( !validate('email', email) ) return newStatus( 'please enter a valid email address.' );

                                                newStatus( 'saving email...', false              ); 



        const signupFailure = () => { 
                                        newStatus('error saving email'); 
                                        notification('there was a problem saving your email. plese try again.');
                                    }

        const signupSuccess = () => { 
                                        newStatus('email saved!'); 
                                        notification('thanks for signing up!');
                                    }



        Axios.post(`${import.meta.env.VITE_API_URL}addData`,   [ 'emails', [ { email: email } ] ] )
             .then(   () =>  signupSuccess()                                                      )
             .catch(  () =>  signupFailure()                                                      );
    }

    return (

        <form
            onSubmit={signUpForNewsletter}
            className={`
                            w-min 
                            flex items-center
                            rounded-md border-2 border-black 
                            font-bold 
                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                      `}
            role="form"
        >

            <input
                className={`
                            w-[30ch] 
                            p-[10px] 
                            outline-none
                            rounded-l-md 
                          `}
                type='text'
                name='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={(e) => {
                setEmail(e.target.value)
                }}
            />

            <button
                className={`
                                p-[10px] px-5
                                rounded-e-[4px] 
                                border-l-2 border-black 
                                ${buttonColour} 
                                ${buttonColour === 'bg-brand-grey' ? 'text-white' : 'text-black'}
                          `}
                type="submit"
                aria-label="Submit Newsletter"
            >Submit
            </button>


        </form>
    )
}
