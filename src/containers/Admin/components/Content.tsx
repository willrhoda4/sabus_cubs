








import   TabsDiv         from '../../../common/tabs/TabsDiv';

import { useState }      from 'react';

import   FAQ             from './content/FAQ';
import   Board           from './content/Board';
import   Items           from './content/Items';
import   Stories         from './content/Stories';





export default function Content(): JSX.Element {



    const [ displayed, setDisplayed ] = useState('faq');


    const   tabNames   : string[]  = [ 'faq', 'board', 'items', 'stories' ];
    
    
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
                bgClass='bg-brand-blue'
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
                    displayed === 'faq'           ? <FAQ     />       
                :   displayed === 'board'         ? <Board   />    
                :   displayed === 'stories'       ? <Stories />    
                :                                   <Items   /> 
                }
                </div>
            </TabsDiv>

        </div>
    );
}