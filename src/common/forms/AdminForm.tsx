










import   Axios                from 'axios';

import   Form                 from './Form';
import   useNotification      from '../../hooks/useNotification';

import { AdminFormProps     } from '../../types/admin';
import { FormState, 
         NewStatusFunction  } from '../../types/form';

import   authToken            from '../../utils/authToken';










export default function AdminForm( { table, update, getData, setEditing, fields, style = 'neobrutalism' } : AdminFormProps ): JSX.Element {


    
    const notification = useNotification();



    const saveItem = async ( formState : FormState, newStatus : NewStatusFunction, resetForm : () => void ) => {   


        // set uploadProgress to 1 to display delivery message.
        newStatus(`adding item to the ${table} table...`, false)


        const reqSuccess: string = `${table} table successfully updated!`;
        const reqFailure: string = `There was a database problem. Please try again, and call tech support if this keeps up.`;


        try {


            // for the faq table, if they forget to add a ? to the question, add it for them.
            if (table === 'faq' && !( ( formState.question as string ).endsWith('?') ) ) {
                formState.question += '?';
            }


            // for new items, request the table, so we can get the length and set the rank
            let rank;
            
            if ( !update ) {
                
                const rankResponse = await Axios.post(`${import.meta.env.VITE_API_URL}admin/getAdminData`, [table], authToken() );
                      rank         = rankResponse.data.length + 1; 
            
            }

            // next we'll prepare the request body for the second request
            let reqBody;

            if ( update ) { 
                
                                   // just refresh the values for updates
                                  reqBody = [ table, formState,  [ [  'id', update.id as number  ] ] ] 

                        }         // new items also need a rank.
            else        {         reqBody = [ table,             [ { ...formState, rank          } ] ] }



            // second request to add the question to the database
            !update ? await Axios.post(`${import.meta.env.VITE_API_URL}admin/addData`,    reqBody, authToken() )
                    : await Axios.put( `${import.meta.env.VITE_API_URL}admin/updateData`, reqBody, authToken() );




            // if successful, update the status, throw up a notification,
            // reset the form for non-updates and re-render the FAQ
                           newStatus(reqSuccess);
                        notification(`data successfully ${update ? 'updated' : 'added'}!`, 4000)
            setEditing && setEditing(false);
            !update    &&  resetForm(); 
            return           getData();



        } catch (error) {
            
            // if an error occurs in either request, update the status
            return newStatus(reqFailure);
            console.error(error);  // log the error for debugging
        }
    }






    return  <Form fields={fields} style={style} onSubmit={saveItem} initialValues={update} /> 
}


