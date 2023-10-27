











import { useState, 
         useEffect   } from 'react';

import   Tabs          from './components/Tabs'
import   ContactInfo   from './components/ContactInfo';
import   CreditCard    from './components/CreditCard';
import   Amount        from './components/Amount';
import   Cancel        from './components/Cancel';

import   Axios         from 'axios';

import { FormState }   from '../../types/form';






export default function Updater(): JSX.Element {




    const   token                       = new URLSearchParams(window.location.search).get('token');

    const [ activeTab,  setActiveTab  ] = useState<string>('contact');
    const [ doneeInfo,  setDoneeInfo  ] = useState<FormState>({});
    const [ errorMsg,   setErrorMsg   ] = useState<string | null>(null);

    const   updateOptions               = [ 'contact', 'amount', 'credit card', 'cancel' ];





    useEffect(() => {


        if (!token) { return setErrorMsg('no token'); }


        Axios.post(`${import.meta.env.VITE_API_URL}verifyUpdate`, { token } ) 
            .then( res => setDoneeInfo(res.data)                            )
            .catch( ()  => setErrorMsg('invalid or expired token')          );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token] );






    const content   = activeTab === 'credit card'  ? <CreditCard  doneeInfo={doneeInfo}  />
                    : activeTab === 'amount'       ? <Amount      doneeInfo={doneeInfo}  />
                    : activeTab === 'cancel'       ? <Cancel      doneeInfo={doneeInfo}  />
                    :                                <ContactInfo doneeInfo={doneeInfo}  />
                    








  return (

    <div className='w-[80%] m-8'>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabsArray={updateOptions} />

        <div className={`
                            w-full h-[500px] 
                            p-8  
                            border-4 border-black
                       `} 
        >
            { errorMsg ? <p>{errorMsg}</p> : content }
        </div>
    </div>

  );
}
