










import { useEffect, 
         useRef,      }      from 'react';

import { useLocation  }      from 'react-router-dom';

import   useStyles           from '../../hooks/useStyles';

import useToggleAnimation    from '../../hooks/useToggleAnimation';

import { MenuProps   }       from '../../types/menu';

import   MenuIcons           from './components/MenuIcons';
import   NavLink             from './components/NavLink';




// pop-out menu for left side of screen
export default function Menu ( { 
                                    pages, 
                                    iconsDisplayed, 
                                    menuDisplayed,
                                    setMenuDisplayed, 
                                    setIconsDisplayed, 
                                    hamburgerRef,
                                    setEditing, 
                                    editor 
                                } : MenuProps) : JSX.Element {
    
    

    const   popOutRef                         = useRef<HTMLDivElement | null>(null);

    const   theme                             = useStyles('neobrutalism');

    const   thisPage                          = useLocation().pathname.slice(1)

    const [ mainMenuAnimation, menuIsOpen    ] = useToggleAnimation({  

                                                                        isOpen:          menuDisplayed,
                                                                        openAnimation:  'animate-slide-in-left',
                                                                        closeAnimation: 'animate-slide-out-left-after',
                                                                        closingTime:     800,
                                                                   });
  
    const  subMenuAnimation                    = useToggleAnimation({
                                                                        isOpen:          menuDisplayed,
                                                                        openAnimation:  'animate-submenu-slide-in', 
                                                                        closeAnimation: 'animate-submenu-slide-out', 
                                                                        closingTime:     800, 
                                                                   })[0]; // mainMenuAnimation and subMenuAnimation return the same menuIsOpen,
                                                                         // therefore, we'll just need the animation class.
  
  


    // Close dropdown menu if user clicks outside of it
    useEffect(() => {           

        function handleClickOutside (event : MouseEvent) {  


            // if the user clicks on the hamburger, call it off.
            // we'll let the hamburger handle its own clicks.
            if (    hamburgerRef.current && 
                    hamburgerRef.current.contains(event.target as Node)
               )  { return; }

              
            // Ensure that the menu is being displayed and that
            //popOutnRef.current is an instance of Node
            // before we bother checking if the click was outside the menu.
            if (
                    popOutRef.current                            &&
                   !popOutRef.current.contains(event.target as Node)

               ) {     
                    setMenuDisplayed(() => false); 
                    setIconsDisplayed(thisPage);
                 }
        }

        document.addEventListener("mousedown", handleClickOutside);
    
        return () => { document.removeEventListener("mousedown", handleClickOutside); }

    }, [hamburgerRef, setEditing, setIconsDisplayed, setMenuDisplayed, thisPage] );

    
    




    return (
        <>
            { menuIsOpen && (
                
                <nav ref={popOutRef} className={theme.menuWrapper?.()}>
            
                    <>
                        {/* left column  : page links */}
                        <div className={theme.mainMenu?.({ animation: mainMenuAnimation })}>

                            { pages.map((page, index) => (
                                                            
                                <NavLink
                                    key={index}
                                    index={index} 
                                    page={page}
                                    editor={editor}
                                    setEditing={setEditing}
                                    setMenuDisplayed={setMenuDisplayed}
                                    onMouseOver={() => setIconsDisplayed(page)}
                                />
                            ) ) }
                            <div /> {/* we'll use a dummy div to carry the border to the bottom of the window */}
                        </div>
            
                        {/* right column : section links */}
                        <div className={theme.subMenu?.({ animation: subMenuAnimation })}>
                            <MenuIcons
                                iconsDisplayed={iconsDisplayed}
                                setMenuDisplayed={setMenuDisplayed}
                            />
                        </div>
                    </>

                </nav>
                ) }</>
    );
          
}
          