



import Button        from "../../common/buttons/Button";
import HamburgerMenu from "./components/Hamburger";





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
                            z-10
                            w-full h-16
                            px-4
                            flex
                            justify-between items-center
                            bg-gray-200
                            border-b-2 border-gray-400
                         `}
          >
            <HamburgerMenu setMenuDisplayed={setMenuDisplayed} />
            <Button onClick={() => setMenuDisplayed((prev : boolean) => !prev)}
                        text='Donate'
            />
          </div>
        );
      }
      