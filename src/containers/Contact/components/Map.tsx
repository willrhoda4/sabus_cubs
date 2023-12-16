







import GoogleMap from "./GoogleMap";

import copy      from '../../../assets/copy.js'




export default function Map() {



    // common style for components p elements
    const pStyles = `
        text-body 
        w-full max-w-xl
        lg:pr-12
        my-20
        self-start
    `;

   
    return (

        <div className={` 
                            w-full h-fit
                            flex flex-col lg:flex-row
                            px-4 md:px-8 lg:px-12   
                       `} 
        >

            { copy('contact', pStyles ) }

            <GoogleMap src={ copy('googleMapURL', 'string') as string } />
            
        </div>

    );
  }
  


