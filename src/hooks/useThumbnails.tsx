








import { useState  } from 'react';
import { FormState } from '../types/form';  

export default function useThumbnails( formState: FormState ) {


  const [ imagePreviewUrls, setImagePreviewUrls ] = useState<Record<string, string>>({});


  const setThumbnail = ( fieldName: string) => {

    const file = formState[ fieldName ] as File | null;

    if (file) {

        const reader = new FileReader();
              reader.onloadend = () => setImagePreviewUrls( prevUrls => ({
                                                                            ...prevUrls,
                                                                            [fieldName]: reader.result as string,
                                                                        }));
    
              reader.readAsDataURL(file);

    } else {
        

                                       setImagePreviewUrls( prevUrls => {                    
                                                                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                                            const { [fieldName]: _, ...rest } = prevUrls; 
                                                                            return rest;
                                                                        });
    }
  };

  return [imagePreviewUrls, setThumbnail] as const;
}
