








import   TabsDiv          from '../../common/tabs/TabsDiv';
import   Supplies         from './components/Supplies';
import   Donate           from './components/Donate';
import   Fundraisers      from './components/Fundraisers';
import   Volunteer        from './components/Volunteer';

import   UpdateTrigger    from './components/UpdateTrigger';
 
import { useEffect }      from 'react'

import   useLocationState from '../../hooks/useLocationState';

import   scrollTo         from '../../utils/scrollTo';

import { Helmet }          from 'react-helmet';





export default function Support(): JSX.Element {



    // common styles for components p elements
    const pStyles = `
                        text-body 
                        w-full max-w-xl
                        py-8 
                        self-start
                    `;



    const [ displayed, setDisplayed ] = useLocationState<string>('donate', 'support-tabs');

    const   tabNames : string[]       = [ 'donate', 'volunteer', 'items', 'fundraise' ];


    // simple hook to handle the subscription link.
    // it was the only edge case that didn't work with the
    // navlinks setup. seemed simplest to just handle it here.
    useEffect(() => {

        if ( displayed === 'subscriptions' ) {
            
            setDisplayed('donate');
            scrollTo('subscriptions');
        }

    }, [ displayed, setDisplayed ] );




    
    return (
    
        <div className={`
                            w-full h-fit
                            flex flex-col items-center 
                       `}
        >
            <Helmet>
                <title>Sabu's Cubs – Support</title>
                <meta name='description' content={`Make an online donation or see a list of items we're always looking out for.`} />
            </Helmet>

                                            
            <div id='support-tabs' className='w-full flex justify-center'>
                <TabsDiv 
                       activeTab={displayed} 
                    setActiveTab={setDisplayed} 
                       tabsArray={tabNames}
                         bgClass='bg-brand-red'
                       textClass='text-white'
                >
                    {   
                        displayed === 'volunteer'   ? <Volunteer    pStyles={pStyles}/>    
                    :   displayed === 'items'       ? <Supplies     pStyles={pStyles}/>       
                    :   displayed === 'fundraise'   ? <Fundraisers  pStyles={pStyles}/>   
                    :                                 <Donate       pStyles={pStyles}/>    
                    }


                </TabsDiv>
            </div>

            {/* allows regular donees to login and update their info. */}
            <div id='subscriptions' className='w-fit mt-24'>
                { displayed === 'donate' && <UpdateTrigger /> }
            </div>

        </div>
    )
}

