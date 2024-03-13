






import   Login                   from './components/Login';


import   Emails                  from './components/Emails';
import   NewsReleases            from './components/NewsReleases';
import   Content                 from './components/Content';
import   Donations               from './components/Donations';



import { useState   }            from 'react';

import { AdminProps }            from '../../types/admin'

import   logoSmall               from '../../assets/logo_small.png';

import {  Helmet    }            from 'react-helmet';






export default function Admin ( { editing, brandColours } : AdminProps ) : JSX.Element {



    const [ authenticated, setAuthenticated ] =   useState(false);


   

    const displaying = editing === 'content'       ? <Content      />
                     : editing === 'releases'      ? <NewsReleases />
                     : editing === 'emails'        ? <Emails       />
                     : editing === 'donations'     ? <Donations    />
                     :                               <p className='text-body'>please select a page.</p>;


   


    return (

        // we'll use a flex-col to stack the content over a simple footer.
        <div className={`
                            w-full h-fit 
                            flex flex-col 
                            items-center justify-center
                            ${ brandColours.bg }
                            mt-[-96px]
                       `}
        >

            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet> 
           
           {/* display content or the login component, depending on authenticated */}
            <div className={`
                                w-10/12 sm:w:9/12 xl:w:8/12
                                bg-white
                                child:flex child:flex-col child:items-center
                                child:my-24 child:px-2
                        `}
            >
                { !authenticated ? <Login setAuthenticated={setAuthenticated} /> : displaying }
            </div>

            {/* footer with Sabu's Cubs logo */}
            <div className={`
                                w-full
                                flex items-center justify-center
                                ${ brandColours.flipBg }
                        `}
            >
                <img alt='logo' src={logoSmall} className='h-auto w-24 my-16' />
            </div>

        </div>
    );
}