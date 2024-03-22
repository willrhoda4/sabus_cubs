

import { SetState } from './form';




// note that this script services bothe the Menu and NavBar components



// prop interface for Menu component
export interface MenuProps {

    pages             : string[];
    iconsDisplayed    : string;
    setIconsDisplayed : SetState<string>;  
    menuDisplayed     : boolean;
    setMenuDisplayed  : SetState<boolean>; 
    hamburgerRef      : React.RefObject<HTMLDivElement>;       
    setEditing        : (newState: string) => void;
    admin            : boolean;
}


// prop interface for NavLink, a nested subcomponent for Menu.
export interface NavLinkProps {

    index             : number;
    page              : string;
    admin             : boolean;
    setMenuDisplayed  : SetState<boolean>;        
    setEditing        : (newState: string) => void;
    onMouseOver       : () => void;
}


// prop interface for MenuIcons, a nested subcomponent for Menu.
export interface MenuIconsProps {

    iconsDisplayed    : string;
    setMenuDisplayed  : SetState<boolean>;      
}








// prop interface for NavBar's hamburger menu component (Hamburger)
export interface NavbarProps {

    hamburgerRef      : React.RefObject<HTMLDivElement>;       
    setMenuDisplayed: (func: (prev: boolean) => boolean) => void;
}





export interface LinkProps {
    name        : string;
    icon        : React.ComponentType<React.SVGProps<SVGSVGElement>>,
    id?         : string,
    onlyFooter? : boolean,
    outLinkURL? : string,
}


export interface SocialLinkProps {
    url        : string;
    icon       : React.ComponentType<React.SVGProps<SVGSVGElement>>,
    stroke?    : string;
}


export interface FooterLinkProps { 
    page  : string;
    link  : LinkProps
 }


 export interface FooterLinksProps { 
    page  : string;
    links : LinkProps[]
 }