








import { Field }                from "../../../../types/form";
import { AdminFormParentProps } from "../../../../types/admin";


import   AdminForm              from "../../../../common/forms/AdminForm";








export default function JournalistListForm( {update, getData, setEditing} : AdminFormParentProps ): JSX.Element {




    const fields : Field[] =    [
                                    {
                                        name:             'name',
                                        type:             'text',
                                        validation:      ['length', 1, 255],
                                        errorMsg:         'Let\'s keep it under 255 characters.'
                                    },

                                    
                                    {
                                        name:             'email',
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
                                ];



    return (

        <AdminForm 
              table={'journalists'}
              update={update}
              getData={getData}
              setEditing={setEditing}
              fields={fields}
        />

    )
}