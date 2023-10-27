










import   Axios                from 'axios';

import   Form                 from './Form';

import { AdminFormProps     } from '../../types/admin';
import { FormState, 
         NewStatusFunction  } from '../../types/form';










export default function AdminForm( {update, getData, setEditing, fields, table} : AdminFormProps ): JSX.Element {


    
    
    
    const type    = table.at(-1) === 's' ? table.slice(0, -1) : table; // remove the 's' from the table name if it's plural
    



    const saveItem = async ( formState : FormState, newStatus : NewStatusFunction, resetForm : () => void ) => {   


        // set uploadProgress to 1 to display delivery message.
        newStatus(`saving ${type}...`, false)


        const reqSuccess: string = `${type} successfully saved! It should be available on the site now`;
        const reqFailure: string = `There was a problem saving your ${type}. Please try again, and call tech support if this keeps up.`;


        try {


            // for new items, request the table, so we can get the length and set the rank
            let rank;
            
            if ( !update ) {
                
                const rankResponse = await Axios.post(`${import.meta.env.VITE_API_URL}getData`, [table]);
                      rank         = rankResponse.data.length + 1; 
            
            }

            // next we'll prepare the request body for the second request
            let reqBody;

            if ( update ) { 
                            // just refresh the values for updates
                            const columns = fields.map(field => field.name);
                            
                                  reqBody = [ table, columns, formState,  [ [  'id', update.id as number  ] ] ] 

                        }         // new items also need a rank.
            else        {         reqBody = [ table, [ { ...formState, rank } ] ] }



            // second request to add the question to the database
            !update ? await Axios.post(`${import.meta.env.VITE_API_URL}addData`,    reqBody )
                    : await Axios.put( `${import.meta.env.VITE_API_URL}updateData`, reqBody );




            // if successful, update the status, reset the form for non-updates and re-render the FAQ
                           newStatus(reqSuccess);
            setEditing && setEditing(false);
            !update    &&  resetForm(); 
            return           getData();



        } catch (error) {
            
            // if an error occurs in either request, update the status
            return newStatus(reqFailure);
            console.error(error);  // log the error for debugging
        }
    }






    return <Form fields={fields} onSubmit={saveItem} initialValues={update} />
                    
}


