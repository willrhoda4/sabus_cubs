










import   Axios                from 'axios';

import   Form                 from '../../../../common/forms/Form';

import { AdminFormProps       } from '../../../../types/admin';
import { Field, 
         FormState, 
         NewStatusFunction  }  from '../../../../types/form';










export default function FAQForm( {update, getData, setEditing} : AdminFormProps ): JSX.Element {





  




  const saveFAQ = async (formState : FormState, newStatus : NewStatusFunction) => {   


      // set uploadProgress to 1 to display delivery message.
      newStatus('saving question...', false)

      const reqSuccess: string = 'FAQ successfully saved! It should be available on the site now';
      const reqFailure: string = 'There was a problem saving your FAQ. Please try again, and call tech support if this keeps up.';

      try {


          // for new questions, request the faq table, so we can get the length and set the rank
          let rank;
          
          if ( !update ) {
            
            const faqResponse = await Axios.post(`${import.meta.env.VITE_API_URL}getData`, ['faq']);
                  rank        = faqResponse.data.length + 1; 
          
          }

          // next we'll prepare the request body for the second request
          let reqBody;

          if ( update ) { 
                          // just refresh the question and answer for updates
                          const columns = [ 'question', 'answer' ];
                          
                                reqBody = [ 'faq', columns, formState,  [ [  'id', update.id as number  ] ] ] 

                      }   // new board members also need a rank.
          else        {   reqBody = [ 'faq', [ { ...formState, rank } ] ] }



          // second request to add the question to the database
          !update ? await Axios.post(`${import.meta.env.VITE_API_URL}addData`,    reqBody )
                  : await Axios.put( `${import.meta.env.VITE_API_URL}updateData`, reqBody );




          // if successful, update the status, reset the form and re-render the FAQ
          setEditing && setEditing(false);
          newStatus(reqSuccess);
          getData();
          if (!update) { return true; }



      } catch (error) {
          
          // if an error occurs in either request, update the status
          console.error(error);  // log the error for debugging
          newStatus(reqFailure);
          return false;
      }
  }






  const fields : Field[] =  [
                                {
                                  name:             'question',
                                  type:             'text',
                                  validation:      ['length', 0, 140],
                                  errorMsg:         'Let\'s keep it under 140 characters.'
                                },

                                
                                {
                                  name:             'answer',
                                  type:             'textArea',
                                  validation:      ['length', 0, 280],
                                  errorMsg:         'Let\'s keep it under 140 characters.'
                                },
                              ];



  return <Form fields={fields} onSubmit={saveFAQ} initialValues={update} />
                  
}









// import { useState, 
//          useEffect    }     from 'react';

// import { useNewStatus }     from '../../../../hooks/useNewStatus';

// import   Axios              from 'axios';

// import   Input              from '../../../../common/Input'
// import   Button             from '../../../../common/Button';

// import { FAQFormProps }     from '../../../../types/admin';
















// export default function FAQForm( {update, getFAQs, setEditing} : FAQFormProps ): JSX.Element {




//   // formState is the state object for the form.
//   // errorState is the error object for the form.
//   // attempted is a boolean that tracks whether the user has attempted to submit the form.
//   // status is a string that explains the status of the email delivery.
//   const [ formState,  setFormState  ] = useState<Record<string, string | number | boolean | File>>({});
//   const [ errorState, setErrorState ] = useState<Record<string, unknown>>({});
//   const [ attempted,  setAttempted  ] = useState<boolean>(false);
//   const [ statusRef,  newStatus     ] = useNewStatus();




//   // handles the initial population of the form state for updates
//   useEffect(() => {

//     if ( update ) {

//       // if the update prop is provided look inside, and
//       const { question, answer } = update;

//       // populate the form state with the board member's data.
//       setFormState( { question, answer } );

//       // initiate error checking immediately.
//       setAttempted(true);
//     }

//   }, [ update ]);



//   // error checking for question field
//   useEffect(() => {
    
//     const question = formState.question as string;

//     // if null then it's an error. If not, then check the length to make sure it's SOMETHING
//     question ? setErrorState((prevState) => ({ ...prevState, question: question.length === 0 } ) )
//              : setErrorState((prevState) => ({ ...prevState, question: true                    } ) )


//   }, [attempted, formState.question, setErrorState]);






//   // error checking for answer field
//   useEffect(() => {
  
//     const answer = formState.answer as string;

//     // if null then it's an error. If not, then check the length to make sure it's SOMETHING
//     answer ? setErrorState( (prevState) => ( { ...prevState, answer: answer.length === 0 } ) )
//            : setErrorState( (prevState) => ( { ...prevState, answer: true                } ) )


//   }, [attempted, formState.answer, setErrorState]);







//   const saveFAQ = async (e: React.SyntheticEvent) => {   

//     // clear status message.
//     newStatus('', false);

//     // set attempted to true to trigger error checking.
//     setAttempted(true);

//     // determines whether any fields are flagged as errors.
//     const hasError = Object.values(errorState).some(error => error === true);

//     // if any fields are flagged as errors, do not send email and display error message
//     if (hasError) { return newStatus(`looks like you left a field blank...`); }

//     // otherwise, proceed.
//     else {

//       // prevent default form submission behavior.
//       e.preventDefault();

//       // set uploadProgress to 1 to display delivery message.
//       newStatus('saving question...', false)

//       const reqSuccess: string = 'FAQ successfully saved! It should be available on the site now';
//       const reqFailure: string = 'There was a problem saving your FAQ. Please try again, and call tech support if this keeps up.';

//       try {


//           // for new questions, request the faq table, so we can get the length and set the rank
//           let rank;
//           if ( !update ) {
            
//             const faqResponse = await Axios.post(`${import.meta.env.VITE_API_URL}getData`, ['faq']);
//                   rank        = faqResponse.data.length + 1; 
          
//           }

//           // next we'll prepare the request body for the second request
//           let reqBody;

//           if ( update ) { 
//                           // name, title and bio are updated every update
//                           const columns =    [ 
//                                                  'question',
//                                                  'answer'     
//                                              ];

//                           const values  =    [  
//                                                   formState.question,
//                                                   formState.answer
//                                              ];
                          

//                           reqBody = [ 'faq', columns, values,  [ [  'id', update.id as number  ] ] ] 

//                       }   // new board members also need a rank.
//           else        {   reqBody = [ 'faq', [ { formState, rank } ] ] }



//           // second request to add the question to the database
//           !update ? await Axios.post(`${import.meta.env.VITE_API_URL}addData`,    reqBody )
//                   : await Axios.put( `${import.meta.env.VITE_API_URL}updateData`, reqBody );




//           // if successful, update the status, reset teh form and re-render the FAQ
//           setEditing && setEditing(false);
//           setAttempted(false);
//           setFormState({});
//           newStatus(reqSuccess);
//           getFAQs();




//       } catch (error) {
          
//           // if an error occurs in either request, update the status
//           console.error(error);  // log the error for debugging
//           newStatus(reqFailure);
//       }
//     }
//   }


//   // common props for the input components
//   const inputProps = {
//                     state:          formState,
//                     error:          errorState,
//                     setter:         setFormState,
//                     errorStyles:    attempted,  
//               }





//   return (<>


//   <Input 
//     name='question' 
//     type='text'     
//     errorMsg='Answers need questions.'
//     { ...inputProps } 
//   />

//   <Input 
//     name='answer'   
//     type='textArea' 
//     errorMsg='Questions need answers.'    
//     { ...inputProps } 
//   />

//   <Button 
//     text='Submit' 
//     onClick={saveFAQ} 
//   />

//   <p ref={statusRef} />


//   </>)
// }
