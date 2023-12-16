






import { BrandColours } from "../utils/brandColours";



export interface HeaderProps {

    // icon         : React.ElementType
    editing      : string;
    colours      : BrandColours;
}



export interface HeaderIconProps {

    title        : string;
    editing      : string;
    height       : string
    width        : string
    className    : string
    style        : { [key: string]: string  }
}