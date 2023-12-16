








import CloudinaryImage from '../../../common/images/CloudImg';

import copy from '../../../assets/copy';




export default function Story () : JSX.Element {





    return (
        
        <div className={`
                            flex flex-col xl:flex-row
                            w-full
                            py-20
                            bg-whitesmoke
                       `}
        >

            <div className={`
                                w-full xl:w-1/2
                                flex flex-col items-start
                                px-10 xl:pl-28 xl:pr-12
                           `}
            >

                <p className='text-title'>Story</p>
                { copy('story') }
            
            </div>


            <div className={`
                                w-full xl:w-1/2 max-w-4xl
                                self-center
                                p-0 xl:p-10
                                my-10
                           `}
            >

                <CloudinaryImage id='groupshot' wrapStyle='w-full h-auto' />
            </div>

        </div>
    )
}