







import   Map             from './components/Map';
import   EmailForm       from './components/EmailForm';
import   Social          from './components/Social';
import   TabsDiv         from '../../common/TabsDiv';

import  useStateFromURL  from '../../hooks/useStateFromURL';

import { ContactProps }  from '../../types/contact';




export default function Contact( { photoData } : ContactProps): JSX.Element {



    const [ displayed, setDisplayed ] = useStateFromURL('section', 'map');


    const   tabsNames   : string[]  = [ 'map', 'email', 'social' ];
    
    
    return (
    
        <div className={`
                            w-full max-w-5xl h-fit 
                            px-4 py-20
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
                    displayed === 'map'     ? <Map       />       
                :   displayed === 'social'  ? <Social    photoData={photoData} />    
                :                             <EmailForm /> 
                }

            </TabsDiv>

        </div>
    );
}