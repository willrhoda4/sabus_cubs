











import { Link,        }  from 'react-router-dom';

import { NavLinkProps }  from '../../../types/menu';





// generate nav links for the Menu
export default function NavLink ( { index, page, admin, setMenuDisplayed, setEditing, onMouseOver } : NavLinkProps) : JSX.Element {





   // generate slashed path and capitalized title from name
   const path  = '/'+page;
   const title = page[0].toUpperCase()+page.slice(1);
        
   

                           // there's no icons for the admin menu,
                           // so we'll just change the page and close the menu            
   const link = admin ?    <div  
                                        key={index} 
                                onMouseOver={onMouseOver}
                                    onClick={ () => {   
                                                        setEditing(page); 
                                                        setMenuDisplayed(false);
                                                    } }
                            >{title}</div>

                           // for the forward-facing site, we'll render icons based on hover
                       :    <Link 
                                        key={index} 
                                onMouseOver={onMouseOver}
                                         to={path} 
                                    onClick={ () => {   
                                                        setMenuDisplayed(false);
                                                        window.scrollTo(0, 0);
                                                    } }                  
                            >{title}</Link>   


   return link
}






     