








import { useEffect, 
         useRef,     } from 'react';
import { Link,
         useLocation } from 'react-router-dom';



import { MenuProps   } from '../../types/menu';

// pop-out menu for left side of screen
export default function Menu ({ pages, setMenuDisplayed, setEditing } : MenuProps) : JSX.Element {
    
    

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const editing    = useLocation().pathname === '/simba';


    // Close dropdown menu if user clicks outside of it
    useEffect(() => {

        function handleClickOutside (event : MouseEvent) {  
            
            // Ensure that the menu is being displayed and that
            // dropdownRef.current is an instance of Node
            // before we bother checking if the click was outside the menu.
            if (
                    dropdownRef.current                            &&
                   !dropdownRef.current.contains(event.target as Node)

               ) {  setMenuDisplayed(() => false);  }
        }

        document.addEventListener("mousedown", handleClickOutside);
    
        return () => { document.removeEventListener("mousedown", handleClickOutside); }

    }, [setMenuDisplayed]);

    

    // generate nav links from pages prop
    function navLink (page : string, key : number) : JSX.Element {

        // generate slashed path and capitalized title from name
        const path  = '/'+page;
        const title = page[0].toUpperCase()+page.slice(1);

        const commonProps = {   
                                key,
                                className:`
                                                w-full h-fit
                                                px-2 py-4
                                                border border-gray-400
                                           `,                                 
                            }
                            /*
                                                                                Argument of type '(prev: string) => boolean' is not assignable to parameter of type '(prev: string) => string'.
                                                                                  Type 'boolean' is not assignable to type 'string'
                                                                                    vvvvvvvvvvvvvvvvv*/
        const link = editing ? <div  {...commonProps} onClick={() => setEditing(page)}>{title}</div>
                             : <Link {...commonProps} to={path}                                           >{title}</Link>   


        return link
    }


    
    
    return (
        <div       ref={dropdownRef}
            className={`
                        absolute
                        z-20
                        w-1/2 h-[100vh]
                        self-start
                        flex flex-col
                        bg-gray-200
                        border-b-2 border-gray-400
                        `}
        >
            {  pages.map( (page, index) => navLink(page, index) ) }
        </div>
    );
    }
          