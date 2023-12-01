






// simple interface for CloudinaryImage component
export interface CloudinaryImageProps {
    id:        string;
    wrapStyle: string;
  }



//interface for an SVG icon
export interface SVGIcon {

  svgContent: string;
  key?: string;
}



// interface for GalleryImage component,
export interface GalleryImageProps {
  url:        string;
  index:      number;
  className?: string;
}




export interface SVGIconProps {
  icon        : React.ComponentType<React.SVGProps<SVGSVGElement>>;
  alt?        : string;
  className?  : string;
  size?       : string; // e.g., '24px', '2rem', etc.
  colour?     : string;
}
