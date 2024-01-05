















import   TabsDiv         from '../../../common/tabs/TabsDiv';

import { useState }      from 'react';

import   DonationsRack   from './donations/DonationsRack';








export default function Donations(): JSX.Element {



    const [ displayed, setDisplayed ] = useState('donees');


    const   tabNames   : string[]  = [ 'donees', 'subscriptions', 'donations' ];
    
    
    return (
    
        <div className={`
                            w-full h-fit
                            flex flex-col items-center
                       `}
        >



            <TabsDiv 
                activeTab={displayed} 
                setActiveTab={setDisplayed} 
                tabsArray={tabNames}
                bgClass='bg-brand-yellow'
                textClass='text-black'
            >
                <div className={`
                                    w-full h-fit
                                    flex justify-center
                                        child:flex 
                                        child:flex-col 
                                        child:items-center
                               `}
                >
                    <DonationsRack displayed={displayed} /> 
                </div>
            </TabsDiv>

        </div>
    );
}