








import   TabsDiv       from '../../common/TabsDiv';
import   Supplies      from './components/Supplies';
import   Donate        from './components/Donate';
import   Fundraisers   from './components/Fundraisers';
import   Volunteer     from './components/Volunteer';

import   UpdateTrigger from './components/UpdateTrigger';


// import { useState   }  from 'react';

import useLocationState from '../../hooks/useLocationState';




export default function Support(): JSX.Element {







    const [ displayed, setDisplayed ] = useLocationState<string>('donate', 'support-tabs');


    const   tabNames : string[]   = [ 'donate', 'volunteer', 'supplies', 'fundraisers' ];

    
    return (<>
                                        
<div id='support-tabs'>
        <TabsDiv 
               activeTab={displayed} 
            setActiveTab={setDisplayed} 
               tabsArray={tabNames}
                 bgClass='bg-brand-red'
               textClass='text-white'
        >
            {   
                displayed === 'volunteer'   ? <Volunteer    />    
            :   displayed === 'supplies'    ? <Supplies     />       
            :   displayed === 'fundraisers' ? <Fundraisers  />   
            :                                 <Donate       />    
            }


        </TabsDiv>
        </div>

        

        { displayed === 'donate' && <UpdateTrigger /> }

    </>);
}

