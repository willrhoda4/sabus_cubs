



import Button        from "../../common/buttons/Button";
import HamburgerMenu from "./components/Hamburger";
import SocialLinkSelector from "./components/SocialLinkSelector";





// catalogue prop types for the component
interface NavbarProps {

    setMenuDisplayed: (func: (prev: boolean) => boolean) => void;
}

// sticky navbar component for top of screen
export default function Navbar ({ setMenuDisplayed } : NavbarProps) : JSX.Element {





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

            <HamburgerMenu setMenuDisplayed={setMenuDisplayed} />

            <div className='flex'>

              <SocialLinkSelector />

              <Button onClick={() => setMenuDisplayed((prev : boolean) => !prev)}
                         text='Donate'
                         style='neobrutalism'
              />

            </div>

          </div>
        );
      }
      