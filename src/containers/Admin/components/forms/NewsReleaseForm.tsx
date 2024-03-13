






/**
 * news release form for the admin dashboard.
 * unlike other admin forms, this one doesn't leverage
 * the AdminForm component, because it uses a different
 * endpoint.
 */





import   Form                 from '../../../../common/forms/Form';

import   Axios                from 'axios';

import {
         Field,
         FormState, 
         NewStatusFunction  } from '../../../../types/form';

import   authToken           from '../../../../utils/authToken';

import   useNotification     from '../../../../hooks/useNotification';





export default function NewsReleaseForm ( { getData } : { getData : () => void } ): JSX.Element {


    const notification = useNotification();



    // even though this form doesn't use the AdminForm component,
    // it still uses the Form component that AdminForm is built on,
    // so we need to define the fields like this.
    const fields : Field[] =    [
                                    {
                                        name:             'headline',
                                        type:             'text',
                                        validation:      ['length', 1, 255],
                                        errorMsg:         'Let\'s keep it under 255 characters.'
                                    },

                                    
                                    {
                                        name:             'content',
                                        type:             'textArea',
                                        validation:      ['length', 1, 2550],
                                        errorMsg:         'Let\'s keep it under 2550 characters.'
                                    },
                                ]


    // this is the submit function that gets passed to the Form component
    // it's pretty straightforward, shipping the headline and content to the
    // generateNewsRelease endpoint, and then resetting the form.
    // a valid JWT is required to access this endpoint, so we use authToken().
    async function handleSubmit( formState : FormState, newStatus : NewStatusFunction, resetForm : () => void ) {

        newStatus( 'generating news release...', false )

        const reqBody = { ...formState, date: new Date() }

        try   {
                    const response = await Axios.post( `${import.meta.env.VITE_API_URL}generateNewsRelease`, 
                                                          reqBody, 
                                                          authToken() 
                                                     );

                    console.log(response);
                    newStatus( 'news release successfully generated!' );
                    notification('a sample release has been delivered to your email.')
                    getData();
                    return resetForm();
              }

        catch {
                    newStatus( 'something went wrong, please try again later.' );
              }

    }

    return  <Form fields={fields} onSubmit={handleSubmit} />
}