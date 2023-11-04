












import                               './App.css'

import { loadStripe }           from '@stripe/stripe-js';
import { Elements   }           from '@stripe/react-stripe-js';

import { Route,
         Routes,  
         useLocation }          from 'react-router-dom';

import { useState,
         useMemo     }          from 'react'

import   useIGData              from './hooks/useIGData.ts';

import { Field, 
         FormState, 
         NewStatusFunction  }   from './types/form';

import { NotificationProvider } from './common/NotificationProvider.tsx';

import   Admin                  from './containers/Admin/Admin.tsx';
import   Home                   from './containers/Home/Home.tsx';
import   Contact                from './containers/Contact/Contact.tsx';
import   Info                   from './containers/Info/Info.tsx';
import   Support                from './containers/Support/Support.tsx';
import   Gallery                from './containers/Gallery/Gallery.tsx';

import   Updater                from './containers/Updater/Updater.tsx';
 
import   Navbar                 from './containers/NavBar/NavBar.tsx';
import   Menu                   from './containers/Menu/Menu.tsx';

import   Form                   from './common/forms/Form.tsx';


function App() {





  const [ menuDisplayed, setMenuDisplayed ] = useState(false);
  const [ editing,       setEditing       ] = useState('faq');

  const   photoData                         = useIGData();

  const   location                          = useLocation().pathname;

  const   pages : string[] = location !== '/simba' ? [ 'home', 'info',  'support', 'gallery', 'contact', 'news' ]
                                                   : [ 'faq',  'items', 'board', 'stories', 'journalists', 'newsReleases' ];

  const stripePromise = useMemo(() => {

      return loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY as string);

  }, []);





  const fields : Field[] =  [
                                  {
                                    name:             'name',
                                    type:             'text',
                                    validation:      ['length', 5, 15],
                                    errorMsg:         'wrong'
                                  },

                                  
                                  {
                                    name:             'email',
                                    type:             'text',
                                    validation:       'email',
                                    errorMsg:         'wrong'
                                  },

                                  {
                                    name:             'ask_my_job',
                                    type:             'check',
                                    validation:       'exists',
                                    errorMsg:         'wrong',
                                    isController:      true
                                  },

                                  {
                                    name:             'title',
                                    type:             'select',
                                    validation:       'exists',
                                    errorMsg:         'wrong',
                                    control:          'ask_my_job',
                                    options:          [ 1, 5, 'Mr', 'Mrs', 'Ms', 'Dr', 'Prof'] 
                                  },

                                  {
                                    name:             'range',
                                    type:             'select',
                                    validation:       'exists',
                                    errorMsg:         'wrong',
                                    control:          'ask_my_job',
                                    options:          [ 1, 5 ] 
                                  },


                            ];


  const submitter = (state: FormState, newStatus: NewStatusFunction) => {console.log(state); newStatus('submitted'); return Promise.resolve(true) }






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

      {/* absolutely positioned pop-out menu summoned by menuDisplayed */}
      { menuDisplayed && <Menu    
                               setMenuDisplayed={setMenuDisplayed}
                                     setEditing={setEditing}
                                          pages={pages}
                         /> }

      {/* sticky nav bar component for top of screen */}
      <Navbar setMenuDisplayed={setMenuDisplayed} />

      {/* container for page elements handled by react router */}
      <div     id='pageContainer'
        className={`
                      w-full h-fit
                      flex flex-col
                      justify-start items-center
                      relative,
                   `}
      >
        <NotificationProvider>
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path="/"                       element={<Home />} />
              <Route path="/simba"                  element={<Admin editing={editing}/>} />
              <Route path="/info"                   element={<Info />} />
              <Route path="/support"                element={<Support />} />
              <Route path="/gallery"                element={<Gallery photoData={photoData} />} />
              <Route path="/contact"                element={<Contact />} />
              <Route path="/news"                   element={<Form fields={fields} onSubmit={submitter} />} />
              <Route path="/subscription-update"    element={<Updater />} />
            </Routes>
          </Elements>
        </NotificationProvider>
      </div>
    </div>
  )
}

export default App












                   


