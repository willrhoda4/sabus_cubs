







import   Map             from './components/Map';
import   EmailForm       from './components/EmailForm';
import   Social          from './components/Social';
import   TabsDiv         from '../../common/TabsDiv';

import  useStateFromURL  from '../../hooks/useStateFromURL';

import { ContactProps }  from '../../types/contact';





export default function Contact( { photoData } : ContactProps): JSX.Element {



    const [ displayed, setDisplayed ] = useStateFromURL('section', 'location');


    const   tabsNames   : string[]  = [ 'location', 'email', 'social' ];
    
    
    return (
    
        <div className={`
                            w-full h-fit
                            flex flex-col items-center
                       `}
        >



            <TabsDiv 
                activeTab={displayed} 
                setActiveTab={setDisplayed} 
                tabsArray={tabsNames}
                bgClass='bg-brand-blue'
                textClass='text-white'
            >

                {
                    displayed === 'location'     ? <Map                             />       
                :   displayed === 'social'       ? <Social    photoData={photoData} />    
                :                                  <EmailForm                       /> 
                }

            </TabsDiv>

        </div>
    );
}