








import   Form                 from '../../../../common/forms/Form';

import   Axios                from 'axios';

import {
         Field,
         FormState, 
         NewStatusFunction  } from '../../../../types/form';





export default function NewsReleaseForm ( { getData } : { getData : () => void }): JSX.Element {




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


    async function handleSubmit( formState : FormState, newStatus : NewStatusFunction, resetForm : () => void ) {

        newStatus( 'generating news release...', false )

        const reqBody = { ...formState, date: new Date() }

        try   {
                    const res = await Axios.post( `${import.meta.env.VITE_API_URL}generateNewsRelease`, reqBody )

                    console.log(res);
                    newStatus( 'news release successfully generated!' )
                    getData();
                    return resetForm();
              }

        catch {
                    newStatus( 'something went wrong, please try again later.' )
              }

    }

    return  <Form fields={fields} onSubmit={handleSubmit} />
}