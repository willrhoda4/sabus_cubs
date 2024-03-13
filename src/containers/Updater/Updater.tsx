






/**
 *  this is a component for users who want to update or cancel their subscriptions.
 *  to access it, they'll need to request an access link from the donation tab in the support page.
 * 
 *  the component will check the token provided in the url against the database,
 *  and if it's valid, it'll display the user's current information.
 * 
 *  options are provided to update the user's contact information, credit card info, or donation amount.
 *  cancelling the subscription is also an option.
 */


import { useState, 
         useEffect   }      from 'react';

// import   useNewStatus       from '../../hooks/useNewStatus';
// import   useNotificatiion   from '../../hooks/useNotification';

import   TabsDiv            from '../../common/tabs/TabsDiv'

import   ErrorCard          from '../../common/cards/ErrorCard';
import   ContactInfo        from './components/ContactInfo';
import   CreditCard         from './components/CreditCard';
import   Amount             from './components/Amount';
import   Cancel             from './components/Cancel';

import   Axios              from 'axios';

import { FormState }        from '../../types/form';






export default function Updater(): JSX.Element {



    // get the token from the url
    const   token                           = new URLSearchParams(window.location.search).get('token');

    const   tabNames                        = [ 'contact',   'amount',  'credit card', 'cancel' ];

    const [ displayed,      setDisplayed  ] = useState<string>('contact');
    const [ doneeInfo,      setDoneeInfo  ] = useState<FormState>({});
    const [ tokenError,     setTokenError ] = useState< 'noToken' | 'badToken' | false>(false);

    

    



    // checks token when component mounts
    useEffect(() => {

        // if there's no token, there's no update happening.
        if ( !token ) { return setTokenError('noToken'); }

     

        // check the token against the database
        // if it's valid, set the doneeInfo state to the user's current info
        // if not, set the error state to 'badToken'
        Axios.post(`${import.meta.env.VITE_API_URL}verifyUpdate`, { token } ) 
             .then( res => {
                                setDoneeInfo(res.data.doneeInfo);
                                localStorage.setItem( 'jwt', res.data.token );
                           }                                                )
            .catch( ()  => setTokenError('badToken')                        );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ token ] );


    


    // toggles errorMsg between noToken and badToken states.
    const errorMsg  = tokenError === 'noToken' ? `You can't access the update page without a token.`
                                               : `Your token is either invalid or expired. Try requesting a new login link.`





    return (

        <div className={`
                            w-full h-fit
                            flex flex-col items-center
                            px-2
                        `}
        >

            { 
                tokenError ?    <ErrorCard 
                                    title={'Token Error'}
                                    text={  errorMsg    }
                                />

                           :    <TabsDiv 
                                       activeTab={displayed} 
                                    setActiveTab={setDisplayed} 
                                       tabsArray={tabNames}
                                         bgClass='bg-brand-yellow'
                                       textClass='text-black'
                                >

                                        {
                                              displayed === 'credit card'  ? <CreditCard  doneeInfo={doneeInfo}  />
                                            : displayed === 'amount'       ? <Amount      doneeInfo={doneeInfo}  />
                                            : displayed === 'cancel'       ? <Cancel      doneeInfo={doneeInfo}  />
                                            :                                <ContactInfo doneeInfo={doneeInfo}  />       
                                        }

                                </TabsDiv>
            }

        </div>
    );

}
