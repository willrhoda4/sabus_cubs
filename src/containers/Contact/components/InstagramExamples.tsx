







    import   GalleryImage   from "../../../common/images/GalleryImage";
    import { GalleryProps } from "../../../types/gallery";



    export default function InstagramExamples( { photoData } : GalleryProps): JSX.Element {



        return (

            <div className='grid grid-cols-2 w-full'>

                { photoData && photoData.slice(0, 6).map( ( photo, index ) => (

                    <GalleryImage 
                        key={index}
                        index={index}
                        url={photo}
                        className={`
                                        relative
                                        w-full h-[167px] 
                                        object-cover
                                        transition transform hover:scale-125 hover:z-20
                                        duration-500 ease-in-out 
                                `}
                    />

                ) ) }
            </div>
        );
    }