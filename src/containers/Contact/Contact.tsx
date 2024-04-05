







import   Map             from './components/Map';
import   EmailForm       from './components/EmailForm';
import   Social          from './components/Social';
import   TabsDiv         from '../../common/tabs/TabsDiv';

import  useLocationState from '../../hooks/useLocationState'

import { ContactProps }  from '../../types/contact';

import { Helmet       }  from 'react-helmet';



export default function Contact( { photoData } : ContactProps): JSX.Element {



    const [ displayed, setDisplayed ] = useLocationState<string>('location', 'contact-tabs');

    const   tabNames   : string[]     = [ 'location', 'email', 'social-media' ];
    
    
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


            <div id='contact-tabs' className='w-full flex justify-center'>
                <TabsDiv 
                    activeTab={displayed} 
                    setActiveTab={setDisplayed} 
                    tabsArray={tabNames}
                    bgClass='bg-brand-blue'
                    textClass='text-white'
                >

                    {
                        displayed === 'location'     ? <Map                             />       
                    :   displayed === 'social-media' ? <Social    photoData={photoData} />    
                    :                                  <EmailForm                       /> 
                    }

                </TabsDiv>
            </div>

        </div>
    );
}