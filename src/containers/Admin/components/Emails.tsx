






import   TabsDiv         from '../../../common/tabs/TabsDiv';

import { useState }      from 'react';

import EmailList    from './emails/EmailList'
import Journalists  from './emails/Journalists'





export default function Emails(): JSX.Element {



    const [ displayed, setDisplayed ] = useState('email list');


    const   tabNames   : string[]  = [ 'email list', 'journalists' ];
    
    
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
                bgClass='bg-brand-red'
                textClass='text-white'
            >

                <div className={`
                                    w-full h-fit 
                                        child:flex 
                                        child:flex-col 
                                        child:items-center
                               `}
                >

                    {
                        displayed === 'email list' ? <EmailList     />       
                                                   : <Journalists   /> 
                    }

                </div>

            </TabsDiv>

        </div>
    );
}