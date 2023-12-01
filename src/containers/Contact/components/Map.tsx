







import GoogleMap from "./GoogleMap";

import copy      from '../../../assets/copy.js'




export default function Map() {

   
    return (

        <div className={` border border-orange-300 w-full h-full p-4`} >

            <p className='font-body mb-[100px] w-3/4'>{ copy('contact' )}</p>

            <GoogleMap src={ copy('googleMapURL', 'string') as string } />
            
        </div>

    );
  }
  


