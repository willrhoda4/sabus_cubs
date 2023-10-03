








import { useState, 
         useEffect  } from 'react';

import   Axios        from 'axios';

import   Input        from '../../../common/Input'
import   Button       from '../../../common/Button';

import   FAQBuffet    from '../../../common/FAQBuffet';





export default function FAQ(): JSX.Element {




    interface FAQ {
        id:       number;
        question: string;
        answer:   string;
        rank:     number;
    }

    // formState is the state object for the form.
    // errorState is the error object for the form.
    // attempted is a boolean that tracks whether the user has attempted to submit the form.
    // status is a string that explains the status of the email delivery.
    // faqs is an array of FAQ objects.
    // displayed is the id of the FAQ currently displayed.
    const [ formState,  setFormState  ] = useState<Record<string, string | number | boolean>>({});
    const [ errorState, setErrorState ] = useState<Record<string, unknown>>({});
    const [ attempted,  setAttempted  ] = useState<boolean>(false);
    const [ status,     setStatus     ] = useState<string>('');
    const [ faqs,       setFaqs       ] = useState<FAQ[]>([]);
    const [ displayed,  setDisplayed  ] = useState<number | boolean>(false);






    // requests FAQ data from server amd sets it to state
    function getFAQs() {

        const reqBody = [ 'faq', undefined, { orderBy: 'rank' } ];

        Axios.post(`${import.meta.env.VITE_API_URL}getData`, reqBody )
             .then(   res => setFaqs(res.data)                       )
             .catch(  err => console.log(err)                        );
    }

    // get FAQS on initial load
    useEffect(() => { getFAQs() }, [] )

    
    




    // error checking for question field
    useEffect(() => {
        
        if (!attempted) { return; }
   
        const question = formState.question as string;

        // if null then it's an error. If not, then check the length to make sure it's SOMETHING
        question ? setErrorState((prevState) => ({ ...prevState, question: question.length === 0 }))
                 : setErrorState((prevState) => ({ ...prevState, question: true                  }))


    }, [attempted, formState.question, setErrorState]);
    



    
    
    // error checking for answer field
    useEffect(() => {
        
        if (!attempted) { return; }
   
        const answer = formState.answer as string;

        // if null then it's an error. If not, then check the length to make sure it's SOMETHING
        answer ? setErrorState((prevState) => ({ ...prevState, answer: answer.length === 0 }))
               : setErrorState((prevState) => ({ ...prevState, answer: true                }))


    }, [attempted, formState.answer, setErrorState]);
    








    // email delivery function
    const saveFAQ = (e: React.SyntheticEvent) => {
        
        // clear status message.
        setStatus('');

        // set attempted to true to trigger error checking.
        setAttempted(true);

        // determines whether any fields are flagged as errors.
        const hasError = Object.values(errorState).some(error => error === true);

        // if any fields are flagged as errors, do not send email and display error message
        if (hasError){ return setStatus(`looks like you left a field blank...`); } 
            
        // otherwise, send email.
        else {

                // prevent default form submission behavior.
                e.preventDefault();

                // set uploadProgress to 1 to display delivery message.
                setStatus('delivering email...')

                const reqSuccess : string = 'FAQ successfully saved! It should be available on the site now';
                const reqFailure : string = 'There was a problem saving your FAQ. Please try again, and call tech support if this keeps up.';    
                
                
                const reqBody    = ['faq', [{ ...formState, rank: faqs.length + 1 }]];
        
                // send email to server for delivery        email endpoint expects a req.body object, not an array.
                Axios.post(`${import.meta.env.VITE_API_URL}addData`, reqBody  )
                     .then( ()  =>  { setStatus(reqSuccess); getFAQs(); }     )
                    .catch( ()  =>  { setStatus(reqFailure); }                );
        }
    }






    

    return (<>

       
        <Input name='question' type='text'     state={formState} error={errorState} setter={setFormState} />
        <Input name='answer'   type='textArea' state={formState} error={errorState} setter={setFormState} />

        <Button text='Submit' onClick={saveFAQ} />
        <p className='h-4'>{status}</p>

        <FAQBuffet faqs={faqs} displayed={displayed} setDisplayed={setDisplayed} />

    </>)
}
