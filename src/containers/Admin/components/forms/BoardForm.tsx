










import   Axios               from 'axios';


import { AdminFormProps    } from '../../../../types/admin'

import { Field,
         FormState, 
         NewStatusFunction } from '../../../../types/form';

import   Form                from '../../../../common/forms/Form';





export default function BoardForm ( { update, getData } : AdminFormProps ) : JSX.Element {



   




    // handles the submission of the form for new members and updates
    // there's a lot going on here, so we'll break it down step by step.
    async function handleUpload ( formState    : FormState, 
                                  newStatus    : NewStatusFunction, 
                                  controlState : FormState = {}
                                ) {


       
        // otherwise, declare some variables before proceeding.
        const cloud             =   import.meta.env.VITE_CLOUD_NAME;
        const cloudURL          =  `https://api.cloudinary.com/v1_1/${cloud}/upload`;
        const serverURL         =   import.meta.env.VITE_API_URL;
        const updatingHeadshot  =   controlState['update_headshot'] as boolean;
        const headshot          =   formState.headshot              as File;
        const name              =   formState.full_name             as string;
        let   public_id         =   update ?  update.public_id      as string 
                                           : 'headshot/' + name.trim()
                                                               .toLowerCase()
                                                               .replace(/\s+/g, '_');      
                                          // if it's an update, use the existing public_id,
                                          // otherwise, generate a new one based on the name.

    

        try {

            // start by fetching the names of all existing board members.
            // this is necessary for calculating the new board member's rank,
            // and also for checking for name conflicts.
            const names = await Axios.post( `${serverURL}getData`, ['board', null, { columns: 'full_name' } ] );


            // if it's not an update, check for name conflicts.
            if (!update) {

                newStatus('checking for name conflicts...', false);


                const nameConflict =  names.data.some( (boardMember: { full_name: string }) => boardMember.full_name.toLowerCase()
                                                                                                            === name.toLowerCase() 
                                                     );

                if  ( nameConflict ) { return newStatus('This name is already in the database. Try editing the existing profile instead.'); }

            }

       

            // if there are no name conflicts,
            // and it isn't an update with !replace.image,
            // start the image upload.
            if ( !(update && !updatingHeadshot ) ) {
                    
                newStatus('uploading headshot...', false);

                // Fetch the signature and other signed parameters from your server
                const   response   = await Axios.post( `${serverURL}signature`, [ public_id ] )
                const   resData    = response.data; 
        

                                               // Prepare the form data for the upload
                                         const formData = new FormData();
                                               formData.append( 'file', headshot );
                for (const key in resData) {   formData.append(key, resData[key]); }
                                                /**
                                                 * resData adds: 
                                                 *      - signature
                                                 *      - api key
                                                 *      - timestamp
                                                 *      - overwrite flag
                                                 *      - public id
                                                 */
                                             


                // upload the headshot to Cloudinary
                await Axios.post(
                                         cloudURL,
                                         formData,
                                       { headers: { 'Content-Type': 'multipart/form-data' } }
                                )
                           .then( res => public_id = `v${res.data.version}/${public_id}` );
                                                        /**
                                                         * this is an important step^^^.
                                                         * we need to prepend the version number to the public_id,
                                                         * to enforce cache busting.
                                                         * otherwise, the image will not update immediately on the front end.
                                                         */
            }


            // if you made it this far, all that's left now is to 
            // add/update the board member in the database.
            newStatus('updating database...', false);


            // remove the headshot from the form state.
            // instead of the file, we'll pass a reference through the public_id.
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { headshot: _, ...restOfFormState } = formState;

            // calculate new rank based on the number of existing board members
            const rank : number  = names.data.length + 1;


            let   reqBody;


            if (update) { 
                            // name, title and bio are updated every update
                            const columns =    [ 
                                                    'full_name', 
                                                    'title',         
                                                    'bio'          
                                               ];

                            const values  =    [  
                                                    name,        
                                                    formState.title, 
                                                    formState.bio 
                                               ];
                            
                            // if they want to replace the headshot, 
                            // add public_id to the columns and values arrays
                            if (updatingHeadshot)   { 
                                                        columns.push('public_id'); 
                                                         values.push( public_id );
                                                    }

                            reqBody = [ 'board', columns, values,  [ [  'id', update.id as number  ] ] ] 

                        }   // new board members also need a rank.
            else        {   reqBody = [ 'board', [ { ...restOfFormState, public_id, rank } ] ] }

         


            // add the board member to the database
            !update ? await Axios.post(`${serverURL}addData`,    reqBody )
                    : await Axios.put( `${serverURL}updateData`, reqBody );


            /**
             * if that goes through:
             *      - get the updated board data
             *      - display a success message
             */

            getData();
            newStatus(`board member successfully ${ update ? 'updated' : 'added' }!`);
            return true;



    
        }   catch (error) {

                console.error('Upload failed:', error);
                newStatus('An error occurred while processing your request. Please try again.');
                return false;
            }



    }
      
    



  const fields : Field[] =  [
                                  {
                                    name:             'full_name',
                                    type:             'text',
                                    validation:      ['length', 0, 255],
                                    errorMsg:         'you must call them something...'
                                  },

                                  
                                  {
                                    name:             'title',
                                    type:             'text',
                                    validation:       ['length', 0, 255],
                                    errorMsg:         'they must do something...'
                                  },
                                  
                                  {
                                    name:             'bio',
                                    type:             'text',
                                    validation:       ['length', 0, 510],
                                    errorMsg:         'bios are mandatory and can be up to 510 characters.'
                                  },

                                  {
                                    name:             'update_headshot',
                                    type:             'check',
                                    validation:       'exists',
                                    errorMsg:         'wrong',
                                    isController:      true,
                                    control:          !!update
                                  },

                                  {
                                    name:             'headshot',
                                    type:             'file',
                                    validation:       'jpeg',
                                    errorMsg:         'pick a valid jpeg file (10MB max)',
                                    control:          'update_headshot',
                                  },
                            ];







    return <Form fields={fields} onSubmit={handleUpload} initialValues={update} />
}



