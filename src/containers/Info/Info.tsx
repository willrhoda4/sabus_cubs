








import copy from './copy';
                   


import   CloudImg  from '../../common/images/CloudImg';

import   FAQBuffet from './components/FAQBuffet';
import   Mission   from './components/Mission';







export default function Info (): JSX.Element {




    return (
        
        <div className={`
                            w-full h-fit
                            flex flex-col
                       `}
        >

            <Mission text={copy.mission} />
    
            <FAQBuffet />
    
           <CloudImg id='baby_ember' wrapStyle='w-1/2 h-auto' />

    
        </div>
    )
}
