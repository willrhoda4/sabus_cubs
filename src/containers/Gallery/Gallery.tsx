








import GalleryImage from "../../common/images/GalleryImage"

import { GalleryProps } from "../../types/gallery"






export default function Gallery({ photoData }: GalleryProps): JSX.Element {




    return (

        <div className={`
                            grid grid-cols-1 gap-20
                                md:grid-cols-2 lg:grid-cols-3 
                            p-20
                        `}
        >
        {
            photoData && photoData.length > 0 ? photoData.map((photo, index) => <GalleryImage key={index} index={index} url={photo} />)
                                              : <p>no photos yet</p>
        }
        </div>
    )
}