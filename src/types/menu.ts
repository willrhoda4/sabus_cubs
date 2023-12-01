

import { SetState } from './form';




// note that this script services bothe the Menu and NavBar components



// prop interface for Menu component
export interface MenuProps {

    pages             : string[];
    iconsDisplayed    : string;
    setIconsDisplayed : SetState<string>;    
    setMenuDisplayed  : SetState<boolean>;       
    setEditing        : (newState: string) => void;
    editor            : boolean;
}





// prop interface for NavBar's hamburger menu component (Hamburger)
export interface HamburgerProps {

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
    icon        : React.ComponentType<React.SVGProps<SVGSVGElement>>,
   
}



export interface FooterLinksProps { 
    page  : string;
    links : LinkProps[]
 }