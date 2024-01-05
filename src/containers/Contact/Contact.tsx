







import   Map             from './components/Map';
import   EmailForm       from './components/EmailForm';
import   Social          from './components/Social';
import   TabsDiv         from '../../common/tabs/TabsDiv';

import  useStateFromURL  from '../../hooks/useStateFromURL';

import { ContactProps }  from '../../types/contact';

import { Helmet       }  from 'react-helmet';



export default function Contact( { photoData } : ContactProps): JSX.Element {



    const [ displayed, setDisplayed ] = useStateFromURL('section', 'location');


    const   tabNames   : string[]  = [ 'location', 'email', 'social' ];
    
    
    return (
    
        <div className={`
                            w-full h-fit
                            flex flex-col items-center
                       `}
        >

            <Helmet>
                <title>Sabu's Cubs – Contact</title>
                <meta name='description' content={`Check out our social media channels or reach out to us through our on-site email form.`} />
            </Helmet>



            <TabsDiv 
                activeTab={displayed} 
                setActiveTab={setDisplayed} 
                tabsArray={tabNames}
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