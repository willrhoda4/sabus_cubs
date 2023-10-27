











import   Axios from 'axios';

import   Form from '../../../common/forms/Form'; 

import { useState } from 'react';



import { Field, 
         FormState, 
         NewStatusFunction  }  from '../../../types/form';



const UpdateTrigger: React.FC = () => {

        
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    const openModal  = () => { setIsModalOpen(true);  };

    const closeModal = () => { setIsModalOpen(false); }; 

    const fields : Field[] =    [
                                    {
                                        name:             'email',
                                        type:             'text',
                                        validation:       'email',
                                        errorMsg:         'please provide a valid email.'
                                    },
                                ];

    function handleSubmit ( formState : FormState, newStatus : NewStatusFunction ) : Promise<boolean|void> {


        newStatus('scheduling your update...', false);
      
        const email = formState.email;

        return Axios.post( `${import.meta.env.VITE_API_URL}scheduleUpdate`,                             { email } )   
                    .then(  res => { console.log(res); newStatus('we sent you an update email.');               } )
                    .catch( err => { console.log(err); newStatus('there was an error scheduling your update.'); } );
    }


    return (
        
        <div className={`
                          relative
                          w-full 
                          border border-orange-300
                          flex flex-col items-center
                       `}
        >
            <p>Monthly donees can click below to adjust payments, update contact info or cancel their subscriptions.</p>
            <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded">manage subscription</button>

            {isModalOpen && (

                <div className={`   
                                    z-50
                                    fixed 
                                    inset-0 bg-black bg-opacity-50 
                                    flex items-center justify-center 
                                `}                
                >
                    <div className={`
                                        bg-white p-4 
                                        rounded shadow-lg 
                                        relative
                                        w-[50%] h-[50%]
                                        flex flex-col items-center
                                   `}                    
                    >

                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <Form fields={fields} onSubmit={handleSubmit} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateTrigger;


