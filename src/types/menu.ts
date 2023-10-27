






// note that this script services bothe the Menu and NavBar components




// prop interface for Menu component
export interface MenuProps {

    pages            : string[];
    setMenuDisplayed : (func: (prev: boolean) => boolean) => void;
    setEditing       : (newState: string) => void;
}





// prop interface for NavBar's hamburger menu component (Hamburger)
export interface HamburgerProps {

    setMenuDisplayed: (func: (prev: boolean) => boolean) => void;
}