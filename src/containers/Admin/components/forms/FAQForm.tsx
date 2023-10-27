











import   AdminForm                 from '../../../../common/forms/Form';

import { AdminFormParentProps   }  from '../../../../types/admin';
import { Field                  }  from '../../../../types/form';







// // interface for Admin form components
// export interface AdminFormProps {

//   update?      :  FAQ | BoardMember | Item;
//   getData      :  dataReqType;
//   setEditing?  :  setEditingType;
//   fields       :  Field[];
//   table        :  string;
// }




export default function FAQForm( {update, getData, setEditing} : AdminFormParentProps ): JSX.Element {





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



  return  <AdminForm 
              table={'faq'}
              update={update}
              getData={getData}
              setEditing={setEditing}
              fields={fields}
          />
                  
}
/**
 * Type '{ table: string; update: FAQ | BoardMember | Item | undefined; getData: dataReqType; setEditing: setEditingType | undefined; fields: Field[]; }' is not assignable to type 'IntrinsicAttributes & FormProps'.
  Property 'table' does not exist on type 'IntrinsicAttributes & FormProps'.ts(2322)
 */

















// import   Axios                from 'axios';

// import   Form                 from '../../../../common/forms/Form';

// import { AdminFormProps       } from '../../../../types/admin';
// import { Field, 
//          FormState, 
//          NewStatusFunction  }  from '../../../../types/form';










// export default function FAQForm( {update, getData, setEditing} : AdminFormProps ): JSX.Element {





  




//   const saveFAQ = async (formState : FormState, newStatus : NewStatusFunction, resetForm : () => void) => {   


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
//                           // just refresh the question and answer for updates
//                           const columns = fields.map(field => field.name);
                          
//                                 reqBody = [ 'faq', columns, formState,  [ [  'id', update.id as number  ] ] ] 

//                       }   // new board members also need a rank.
//           else        {   reqBody = [ 'faq', [ { ...formState, rank } ] ] }



//           // second request to add the question to the database
//           !update ? await Axios.post(`${import.meta.env.VITE_API_URL}addData`,    reqBody )
//                   : await Axios.put( `${import.meta.env.VITE_API_URL}updateData`, reqBody );




//           // if successful, update the status, reset the form for non-updates and re-render the FAQ
//                          newStatus(reqSuccess);
//           setEditing && setEditing(false);
//           !update    &&  resetForm(); 
//           return           getData();



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






