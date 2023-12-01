








import { Cloudinary    } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImageProps } from '../../types/images';






function CloudinaryImage ({ id, wrapStyle } : CloudinaryImageProps ) {


  const cld = new Cloudinary( { cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME as string } } );
  const img = cld.image(id);


  return (

    <div className={wrapStyle}>
      <AdvancedImage cldImg={img} />
    </div>

  );
}

export default CloudinaryImage;
