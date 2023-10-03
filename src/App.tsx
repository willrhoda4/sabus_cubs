










import                      './App.css'
import { Route,
         Routes,  
         useLocation } from 'react-router-dom';

import { useState }    from 'react'

import   Admin         from './containers/Admin/Admin.tsx';
import   Home          from './containers/Home/Home.tsx';
import   Contact       from './containers/Contact/Contact.tsx';
import   Info          from './containers/Info/Info.tsx';

import   Navbar        from './containers/NavBar/NavBar.tsx';
import   Menu          from './containers/Menu/Menu.tsx';


function App() {


  const [ menuDisplayed, setMenuDisplayed ] = useState(false);
  const [ editing,       setEditing       ] = useState('faq');

  const   location = useLocation().pathname;

  const   pages : string[] = location !== '/simba' ? [ 'home', 'info', 'support', 'gallery', 'contact', 'news' ]
                                                   : [ 'faq',  'items', ];


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
                      px-4
                      flex flex-col
                      justify-start items-center
                      relative,
                   `}
      >
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/simba"   element={<Admin editing={editing}/>} />
          <Route path="/info"    element={<Info />} />
          <Route path="/support" element={<p>support</p>} />
          <Route path="/gallery" element={<p>gallery</p>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news"    element={<p>news</p>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
