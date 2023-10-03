










interface FullWidthImageProps {

  image: string;
  alt?: string;
}

export default function FullWidthImage({ image, alt='' }: FullWidthImageProps): JSX.Element {


  return (

    <div className={`
                        w-[100vw]
                   `}
    >
        <img      src={image}    
                  alt={alt}       
            className={`w-full max-h-[50vh] object-cover`} 
        />
    </div>
  );
}

