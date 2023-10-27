







import { useState, 
         useCallback } from 'react';




type UseRenderKeyReturn = [number, () => void];

export default function useRenderKey() : UseRenderKeyReturn{

  const [ key, setKey ] = useState<number>(0);

  const        reRender = useCallback(() : void => {

    setKey(prevKey => prevKey + 1);

  }, []);

  return [key, reRender];
}