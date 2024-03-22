












import                               './App.css'

import { Route,
         Routes,  
         useLocation }          from 'react-router-dom';

import { NotificationProvider } from './common/notifications/NotificationProvider.tsx';


// hook imports
import { loadStripe }           from '@stripe/stripe-js';
import { Elements   }           from '@stripe/react-stripe-js';
         
import { useState, 
         useMemo,
         useRef      }          from 'react'

import   useIGData              from './hooks/useIGData.ts';
import   useBrandColours        from './hooks/useBrandColours.ts';

// page imports
import   Admin                  from './containers/Admin/Admin.tsx';
import   Home                   from './containers/Home/Home.tsx';
import   Contact                from './containers/Contact/Contact.tsx';
import   Info                   from './containers/Info/Info.tsx';
import   Support                from './containers/Support/Support.tsx';
import   Gallery                from './containers/Gallery/Gallery.tsx';
import   News                   from './containers/News/News.tsx';

import   Updater                from './containers/Updater/Updater.tsx';
 
// component imports
import   Navbar                 from './containers/NavBar/NavBar.tsx';
import   Menu                   from './containers/Menu/Menu.tsx';
import   Header                 from './containers/Header/Header.tsx';
import   Footer                 from './containers/Footer/Footer.tsx'; 
import   ErrorBoundary          from './common/fallbacks/ErrorBoundary.tsx';
import   Fallback               from './common/fallbacks/Fallback.tsx';










 



function App() {





  const [ menuDisplayed,  setMenuDisplayed  ] = useState(false);
  const [ iconsDisplayed, setIconsDisplayed ] = useState('home');
  const [ editing,        setEditing        ] = useState('content');

  const   photoData                           = useIGData();

  const   brandColours                        = useBrandColours(editing);
 
  const   location                            = useLocation().pathname;

  const   hamburgerRef                        = useRef<HTMLDivElement | null>(null);

  const   admin                               = location === '/simba';

  const   pages : string[] = !admin  ? [ 'home',    'info',   'support',  'gallery', 'contact', 'news' ]
                                     : [ 'content', 'emails', 'releases', 'donations'                  ];

  // memoized to tame the stripe warning about multiple instances of the stripe object
  const   stripePromise = useMemo(() => {

      return loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY as string);

  }, []);

  const fallbackProps = { 
                          title: 'Did you get lost?',
                          text:  'The page you\'re looking for doesn\'t exist. Please navigate home to continue your jounrey.'
                        }





  return (

    // top-level container for the app
    <div        id='App'
         className={`
                      relative
                      w-full h-full 
                      flex flex-col
                      justify-start items-center
                   `}
    >

      {/* catch-all error boundary, just in case. */}
      <ErrorBoundary> 
       

        {/* absolutely positioned pop-out menu indrectly summoned by menuDisplayed,
            the actual rendering is managed internally by the component */}
        <Menu    
                menuDisplayed={menuDisplayed}
              setMenuDisplayed={setMenuDisplayed}
            setIconsDisplayed={setIconsDisplayed}
                iconsDisplayed={iconsDisplayed}
                  hamburgerRef={hamburgerRef}
                    setEditing={setEditing}
                        admin ={admin }
                        pages={pages} 
        /> 

        {/* sticky nav bar component for top of screen */}
        <Navbar hamburgerRef={hamburgerRef} setMenuDisplayed={setMenuDisplayed} />

        {/* header collage component */}
        <Header editing={editing} colours={brandColours} />

        

        {/* container for page elements handled by react router */}
        <div     id='pageContainer'
          className={`
                        w-full h-fit
                        flex flex-col
                        justify-start items-center
                        relative
                    `}
        >
          <NotificationProvider>

            <Elements stripe={stripePromise}>
            

              <Routes>
                <Route path='/'                       element={<Home />} />
                <Route path='/home'                   element={<Home />} />
                <Route path='/simba'                  element={<Admin editing={editing} brandColours={brandColours} />} />
                <Route path='/info'                   element={<Info />} />
                <Route path='/support'                element={<Support />} />
                <Route path='/gallery'                element={<Gallery photoData={photoData} />} />
                <Route path='/contact'                element={<Contact photoData={photoData} />} />
                <Route path='/news'                   element={<News />} />
                <Route path='/subscription-update'    element={<Updater />} />
                <Route path='*'                       element={<Fallback title={fallbackProps.title} text={fallbackProps.text} />}  />
              </Routes>

              { location !== '/simba' && <Footer brandColours={brandColours} /> }

            </Elements>

          </NotificationProvider>

        </div>

      </ErrorBoundary>

    </div>

  )

}

export default App












                   


