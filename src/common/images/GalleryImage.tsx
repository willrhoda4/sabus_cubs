







import { GalleryImageProps } from "../../types/images";






export default function GalleryImage({ url, className }: GalleryImageProps): JSX.Element {


    return (

      <a  
        href='https://www.instagram.com/sabuscubswpg/' 
        target='_blank' 
        rel='noreferrer'
    >
        <img  
          src={url} 
          alt='imported from Instagram' 
          className={className}
        />
      </a>
    );
  }
  