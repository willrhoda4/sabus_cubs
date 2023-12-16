










import   Button               from "../../common/buttons/Button";
import   HamburgerMenu        from "./components/Hamburger";
import   SocialLinkSelector   from "../../common/links/SocialLinkSelector";

import { NavbarProps }        from '../../types/menu';

import { useNavigate }        from 'react-router-dom';




// sticky navbar component for top of screen
export default function Navbar ({ hamburgerRef, setMenuDisplayed } : NavbarProps) : JSX.Element {




    const navigate = useNavigate();




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

              <Button onClick={ () => navigate(`/support`, { state: { id: 'donate', timeStamp: Date.now() } } ) }
                         text='Donate'
                         theme='neobrutalism'
              />

            </div>

          </div>
        );
      }
      