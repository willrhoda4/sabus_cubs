







import { GoogleMapProps } from "../../../types/contact";






export default function GoogleMap( {src, className } : GoogleMapProps ) {

            
    
    

    return (

            <div className={`
                                relative
                                w-full 
                                pb-[56.25%]
                                ${className}
                           `}  //   56.25% = 16:9 Aspect Ratio 
        >
            <iframe
                className={`
                                absolute 
                                top-0 left-0 
                                w-full h-full 
                                border-none
                          `} // Full width, no border
                       src={src}
                   loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            />

        </div>
    );
  }
  


