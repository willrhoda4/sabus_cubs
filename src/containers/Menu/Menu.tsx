








import { useEffect, 
         useRef,     } from 'react';
import { Link,
         useLocation } from 'react-router-dom';



import { MenuProps   } from '../../types/menu';





// pop-out menu for left side of screen
export default function Menu ({ pages, setMenuDisplayed, setEditing } : MenuProps) : JSX.Element {
    
    

    const popOutRef  = useRef<HTMLDivElement | null>(null);

    const editing    = useLocation().pathname === '/simba';


    // Close dropdown menu if user clicks outside of it
    useEffect(() => {

        function handleClickOutside (event : MouseEvent) {  
            
            // Ensure that the menu is being displayed and that
            //popOutnRef.current is an instance of Node
            // before we bother checking if the click was outside the menu.
            if (
                    popOutRef.current                            &&
                   !popOutRef.current.contains(event.target as Node)

               ) {  setMenuDisplayed(() => false); }
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
                            
        const link = editing ? <div  {...commonProps} onClick={() => setEditing(page)}>{title}</div>
                             : <Link {...commonProps} to={path}                       >{title}</Link>   


        return link
    }


    
    
    return (
        <nav      ref={popOutRef}
            className={`
                        fixed bottom-0 left-0
                        z-10
                        w-1/2 h-[calc(100vh-5rem)]
                        self-start
                        flex flex-col
                        bg-gray-200
                        border-b-2 border-gray-400
                        `}
        >
            {  pages.map( (page, index) => navLink(page, index) ) }
        </nav>
    );
}
          