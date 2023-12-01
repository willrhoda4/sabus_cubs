








import CloudinaryImage from '../../../common/images/CloudImg';

import copy from '../../../assets/copy';




export default function Story () : JSX.Element {





    return (
        
        <div className={`
                            grid grid-cols-2 
                            w-full
                            py-20
                            bg-whitesmoke
                       `}
        >

            <div className={`
                                col-span-1
                                flex flex-col
                                pl-28 pr-12
                           `}
            >

                <p className='font-title'>Story</p>
                { copy('story') }
            
            </div>


            <div className={`
                                col-span-1
                                flex items-center justify-end
                                px-10
                           `}
            >

                <CloudinaryImage id='groupshot' wrapStyle='w-full h-auto' />

            </div>

        </div>
    )
}