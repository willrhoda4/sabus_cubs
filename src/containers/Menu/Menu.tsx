








import { useEffect, 
         useRef,      } from 'react';

import { Link, 
         useLocation, 
         useNavigate  } from 'react-router-dom';

import   useStyles      from '../../hooks/useStyles';



import { MenuProps   }  from '../../types/menu';


import   infoLinks      from '../../common/links/info';
import   supportLinks   from '../../common/links/support';
import   galleryLinks   from '../../common/links/gallery';
import   contactLinks   from '../../common/links/contact';





// pop-out menu for left side of screen
export default function Menu ({ pages, iconsDisplayed, setIconsDisplayed, setMenuDisplayed, setEditing, editor } : MenuProps) : JSX.Element {
    
    

    const popOutRef  = useRef<HTMLDivElement | null>(null);


    const theme      = useStyles('neobrutalism');

    const thisPage   = useLocation().pathname.slice(1)

    const navigate   = useNavigate();


    // Close dropdown menu if user clicks outside of it
    useEffect(() => {

        function handleClickOutside (event : MouseEvent) {  
            
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

    }, [setEditing, setIconsDisplayed, setMenuDisplayed, thisPage]);

    
    

    // generate nav links from pages prop
    function navLink (page : string, key : number) : JSX.Element {

        // generate slashed path and capitalized title from name
        const path  = '/'+page;
        const title = page[0].toUpperCase()+page.slice(1);
                            
        const link = editor ?   <div  
                                    key={key}  
                                    onClick={    () => {   setEditing(page); 
                                                           setMenuDisplayed(false);
                                                       } }
                                >{title}</div>

                            :   <Link 
                                    key={key}  
                                    to={path} 
                                    onMouseOver={ () =>     setIconsDisplayed(page) }    
                                    onClick={     () => {   
                                                            setMenuDisplayed(false);
                                                            window.scrollTo(0, 0);
                                                        } }                  
                                >{title}</Link>   


        return link
    }



    function menuIcons () {

        const displayedIcons = () => {

            switch (iconsDisplayed) {

                case 'info'    : return infoLinks;
                case 'support' : return supportLinks;
                case 'gallery' : return galleryLinks;
                case 'contact' : return contactLinks;
                default        : return [];
            }
        }


        return displayedIcons().map( (link, index) => {
           
           
           
            const { name, icon : Icon, outLinkURL } = link;
           
            const icon       =  <Icon
                                    height={'45px'}
                                    width={'45px'}
                                    className='mx-1 px-2 hover:animate-wiggle'
                                    style={{ color: '#ABAB27' }}
                                />      

            const id          = link.id ?? name.toLowerCase();

            const timeStamp   = Date.now()

            const handleClick = () =>   {
                                            navigate(`/${iconsDisplayed}`, { state: { id: id, timeStamp: timeStamp } } );
                                            setMenuDisplayed(false);
                                        }

            const inLink      = <a 
                                    key={index}
                                    onClick={handleClick}
                                    className='flex flex-col'
                                >
                                    {icon}  
                                    <p className='text-brand-yellow'>{name}</p>
                                </a>

            const outLink     = <a 
                                    key={index}
                                    href={outLinkURL} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={handleClick}
                                    className='flex flex-col'
                                >
                                    {icon}
                                    <p className='text-brand-yellow'>{name}</p> 
                                </a>

            return outLinkURL ? outLink : inLink;
        })
    }


    



    return (
        <nav      ref={popOutRef}
            className={theme.menuWrapper?.()}   //Parsing error: Expression expected.eslint

        >
            {/* left column  : page links */}
            <div className={theme.mainMenu?.()} >   
                {  pages.map( (page, index) => navLink(page, index) ) }
                <div /> {/* we'll use a dummy div to carry the border to the bottom of the screen */}
            </div>

            {/* right column : section links */}
            { !editor && <div className={ theme.subMenu?.() } >
                            { menuIcons() }
                         </div>
            }
        </nav>
    );
}
          