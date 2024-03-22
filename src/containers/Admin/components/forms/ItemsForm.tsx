









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



























