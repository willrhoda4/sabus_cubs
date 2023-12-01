











import   AdminForm                 from '../../../../common/forms/AdminForm';

import { AdminFormParentProps   }  from '../../../../types/admin';
import { Field                  }  from '../../../../types/form';









export default function FAQForm( { update, getData, setEditing } : AdminFormParentProps ): JSX.Element {





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
                                  validation:      ['length', 0, 2400],
                                  errorMsg:         'Let\'s keep it under 2400 characters.'
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




