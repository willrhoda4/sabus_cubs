











import   AdminForm               from '../../../../common/forms/AdminForm';

import { AdminFormParentProps  } from '../../../../types/admin';
import { Field                 } from '../../../../types/form';










export default function StoryForm( {update, getData, setEditing} : AdminFormParentProps ): JSX.Element {





  





  const fields : Field[] =  [
                                {
                                  name:             'headline',
                                  type:             'text',
                                  validation:      ['length', 1, 255],
                                  errorMsg:         'Let\'s keep it under 255 characters.'
                                },

                                
                                {
                                  name:             'outlet',
                                  type:             'text',
                                  validation:      ['length', 1, 255],
                                  errorMsg:         'Let\'s keep it under 255 characters.'
                                },

                                
                                {
                                  name:             'url',
                                  type:             'text',
                                  validation:       'url',
                                  errorMsg:         'Let\'s keep it under 255 characters.'
                                },

                                
                                {
                                  name:             'image_url',
                                  type:             'text',
                                  validation:       'url',
                                  errorMsg:         'Let\'s keep it under 255 characters.'
                                },

                                
                                {
                                  name:             'image_alt',
                                  type:             'text',
                                  validation:      ['length', 0, 255],
                                  errorMsg:         'Let\'s keep it under 255 characters.'
                                },

                                
                                {
                                  name:             'date',
                                  type:             'date',
                                  validation:       'date',
                                  errorMsg:         'Let\'s keep it under 255 characters.'
                                },

                              ];



  return  <AdminForm 
              table={'stories'}
              update={update}
              getData={getData}
              setEditing={setEditing}
              fields={fields}
          />
                  
}                  

















// import   Axios                  from 'axios';

// import   Form                   from '../../../../common/forms/Form';

// import { AdminFormProps       } from '../../../../types/admin';
// import { Field, 
//          FormState, 
//          NewStatusFunction    } from '../../../../types/form';










// export default function StoryForm( {update, getData, setEditing} : AdminFormProps ): JSX.Element {





  




//   const saveStory = async (formState : FormState, newStatus : NewStatusFunction, resetForm : () => void ) => {   


//       // set uploadProgress to 1 to display delivery message.
//       newStatus('saving story...', false)

//       const reqSuccess: string = 'Story successfully saved! It should be available on the site now';
//       const reqFailure: string = 'There was a problem saving your Story. Please try again, and call tech support if this keeps up.';

//       try {


//           // for new questions, request the faq table, so we can get the length and set the rank
//           let rank;
          
//           if ( !update ) {
            
//             const storyResponse = await Axios.post(`${import.meta.env.VITE_API_URL}getData`, ['stories']);
//                   rank          = storyResponse.data.length + 1; 
          
//           }

//           // next we'll prepare the request body for the second request
//           let reqBody;

//           if ( update ) { 
//                           // just refresh the question and answer for updates
//                           const columns = fields.map(field => field.name);
                          
//                                 reqBody = [ 'stories', columns, formState,  [ [  'id', update.id as number  ] ] ] 

//                       }   // new board members also need a rank.
//           else        {   reqBody = [ 'stories', [ { ...formState, rank } ] ] }



//           // second request to add the question to the database
//           !update ? await Axios.post(`${import.meta.env.VITE_API_URL}addData`,    reqBody )
//                   : await Axios.put( `${import.meta.env.VITE_API_URL}updateData`, reqBody );




//           // if successful, update the status, reset the form and re-render the FAQ
//                             newStatus(reqSuccess);
//           setEditing  &&    setEditing(false);
//           !update     &&    resetForm(); 
//           return            getData();



//       } catch (error) {
          
//           // if an error occurs in either request, update the status
//           console.error(error);  // log the error for debugging
//           newStatus(reqFailure);
//           return false;
//       }
//   }






//   const fields : Field[] =  [
//                                 {
//                                   name:             'question',
//                                   type:             'text',
//                                   validation:      ['length', 0, 140],
//                                   errorMsg:         'Let\'s keep it under 140 characters.'
//                                 },

                                
//                                 {
//                                   name:             'answer',
//                                   type:             'textArea',
//                                   validation:      ['length', 0, 280],
//                                   errorMsg:         'Let\'s keep it under 140 characters.'
//                                 },
//                               ];



//   return <Form fields={fields} onSubmit={saveFAQ} initialValues={update} />
                  
// }





