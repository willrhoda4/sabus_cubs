









import   AdminForm                 from '../../../../common/forms/AdminForm';

import { AdminFormParentProps   }  from '../../../../types/admin';
import { Field                  }  from '../../../../types/form';









export default function ItemsForm( {update, getData, setEditing} : AdminFormParentProps ): JSX.Element {





    const fields : Field[] =    [
                                    {
                                        name:             'item',
                                        type:             'text',
                                        validation:      ['length', 0, 255],
                                        errorMsg:         'surely you can describe it in less than 255 characters...'
                                    },
                                ];


    return  <AdminForm 
                table={'items'}
                update={update}
                getData={getData}
                setEditing={setEditing}
                fields={fields}
            />
                  
}




































// import { Field,
//          FormState,
//          NewStatusFunction } from '../../../../types/form'

// import { AdminFormProps } from '../../../../types/admin';

// import   Form                from "../../../../common/forms/Form";

// import   Axios               from 'axios';





// export default function ItemsForm ({update, getData} : AdminFormProps): JSX.Element {




//     const fields : Field[] =    [
//                                     {
//                                         name:             'item',
//                                         type:             'text',
//                                         validation:      ['length', 0, 255],
//                                         errorMsg:         'surely you can describe it in less than 255 characters...'
//                                     },
//                                 ];


//     async function onSubmit (formState: FormState, newStatus: NewStatusFunction) : Promise<boolean | void> {

//         try   {     console.log('formState:', formState)

//                 let rank;
            
//                 if ( !update ) {
//                                           // for new items, get the current number of rows, and add 1 to get the rank.
//                     const itemsResponse = await Axios.post(`${import.meta.env.VITE_API_URL}getData`, ['items']);
//                           rank          = itemsResponse.data.length + 1; 
//                 }


//                      // next we'll prepare the request body for the second request
//                     let reqBody;

//                     if ( !update ) {  reqBody = [ 'items', [ { ...formState, rank } ] ]

//                                   }   // new board members also need a rank.
//                     else          {   reqBody = [ 'items', formState,  [ [  'id', update.id as number  ] ] ] 
//                                   }

//                 !update ? await Axios.post(`${import.meta.env.VITE_API_URL}addData`,    reqBody )
//                         : await Axios.put( `${import.meta.env.VITE_API_URL}updateData`, reqBody );



//                 newStatus('item added successfully!');
//                 getData()

//                 if (!update) { return true;  } // return true to reset the form, if we're not updating.
//               } 
//         catch {
//                 newStatus('there was an error adding the item.');
//               }

//     }


//     return <Form fields={fields} onSubmit={onSubmit} initialValues={update} /> 
// }
