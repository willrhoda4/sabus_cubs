







import { useState } from "react";



interface HamburgerProps {

    setMenuDisplayed: (func: (prev: boolean) => boolean) => void;
}



export default function Hamburger ({ setMenuDisplayed } : HamburgerProps) : JSX.Element {


    const [ isHovered, setIsHovered ] = useState(false);

    const layerClass : string = ` 
                                  w-full h-1
                                  ${ !isHovered ? 'scale-100' : 'scale-110'}                    
                                  bg-gray-700 
                                  transition-transform transform 
                                  rounded
                                `;



    return (

        <div
            onMouseEnter={ () => setIsHovered(true)  }
            onMouseLeave={ () => setIsHovered(false) }
                 onClick={ () => setMenuDisplayed((prev : boolean) => !prev) }
               className={ ` 
                            w-8 cursor-pointer
                            ${ !isHovered ? 'h-8' : 'h-9'}                                
                            transition-all duration-500
                            flex flex-col justify-around  
                           `  
                        }
        >
            <div className={layerClass}></div>
            <div className={layerClass}></div>
            <div className={layerClass}></div>
        </div>
    );
}





