









import CloudinaryImage from './CloudImg'; // Adjust the import path as needed

export default function ImageStrip ( { ids, bgClass = 'bg-black' } : { ids : string[], bgClass : string  } ) {



  return (


    <div className={`
                        grid grid-cols-3 gap-2 md:gap-4 lg:gap-8
                        p-2 md:p-4 lg:p-8 
                        ${ bgClass }
                   `}>

        { ids.map( ( id : string, index : number ) => <CloudinaryImage key={index} id={id} wrapStyle='w-full h-auto' /> ) }

    </div>
  );
}

