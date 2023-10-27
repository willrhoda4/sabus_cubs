






// simple interface for CloudinaryImage component
export interface CloudinaryImageProps {
    id:        string;
    wrapStyle: string;
  }



//interface for an SVG icon
export interface SvgIcon {

  svgContent: string;
  key?: string;
}



// interface for GalleryImage component,
export interface GalleryImageProps {
  url: string;
  index: number;
}