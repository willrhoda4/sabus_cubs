










import   Button               from '../../common/buttons/Button';
import   HamburgerMenu        from './components/Hamburger';
import   SocialLinkSelector   from '../../common/links/SocialLinkSelector';

import { NavbarProps }        from '../../types/menu';

import { useNavigate,
         useLocation }        from 'react-router-dom';

import { useEffect,
         useState    }        from 'react';


import   Axios                from 'axios';

import   authToken            from '../../utils/authToken';




// sticky navbar component for top of screen
export default function Navbar ({ hamburgerRef, setMenuDisplayed } : NavbarProps) : JSX.Element {


    // hook for programmatic navigation. used for donate button
    const   navigate                               = useNavigate();

    // tracks whether we're on the admin dashboard
    const   location                               = useLocation().pathname;
    const   isAdmin                                = location === '/simba';

    // tracks current database state for maintenance mode
    const [ maintenanceMode, setMaintenanceMode ]  = useState(false);



    
    // on initial render, get the current maintenance mode setting from the database and set state
    useEffect(() => {


          Axios.post(`${import.meta.env.VITE_API_URL}public/getData`, [ 'site_settings', [ [ 'setting_name', 'maintenance_mode' ] ] ] )
               .then(  res => setMaintenanceMode(res.data[0].setting_value)                                                           )
               .catch( err => console.error(err)                                                                                      );

    }, []);




    // click handler to toggle maintenance mode
    function toggleMaintenanceMode() {

        const warning = maintenanceMode ? 'Are you sure you want to deactivate maintenance mode? This will put the site back online.' 
                                        : 'Are you sure you want to activate maintenance mode? This will make the site inaccessible to users.';

        // if user is not logged in, alert them that they need to be logged in to toggle maintenance mode
        if ( !localStorage.getItem('jwt') ) return alert('You need to be logged in to toggle maintenance mode');
      
        // if user is logged in, confirm they want to toggle maintenance mode.
        if ( window.confirm(warning) ) {

          Axios.post( `${import.meta.env.VITE_API_URL}admin/toggleMaintenanceMode`, {}, authToken()  )
               .then(  res => { console.log(res.data); setMaintenanceMode(res.data.isMaintenanceMode)    }                     )
              .catch(  err => console.error(err)                                                     );
        }
    }

    // donate button for public site. links to support page.
    const donateButton      = <Button onClick={ () => navigate(`/support`, { state: { id: 'donate', timeStamp: Date.now() } } ) }
                                      text='Donate'
                                      theme='neobrutalism'
                              />;

    // maintenance mode button for admin dashboard
    const maintenanceButton = <Button onClick={ toggleMaintenanceMode }
                                      text={`${ maintenanceMode ? 'stop' : 'start' } maintenance`}
                                      theme='neobrutalism'
                              />;





        return (
          <div className={`
                            relative
                            sticky top-0
                            z-20
                            w-full h-20
                            px-6
                            flex
                            justify-between items-center
                            bg-white
                            border-b-4 border-black
                         `}
          >

            <HamburgerMenu hamburgerRef={hamburgerRef} setMenuDisplayed={setMenuDisplayed} />

            <div className='flex'>

              <SocialLinkSelector />

              { isAdmin ? maintenanceButton : donateButton }

            </div>

          </div>
        );
      }
      