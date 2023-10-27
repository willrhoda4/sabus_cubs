









import { GalleryImageProps } from "../../types/image"




export default function GalleryImage ({url, index}: GalleryImageProps) : JSX.Element {





    return (

        <a key={index}
            target="_blank"
            rel="noreferrer"
            href='https://www.instagram.com/sabuscubswpg/'
            >
           
                <img  
                    alt='imported from Instagram' 
                    src={url} 
                />
        </a>
    )
}