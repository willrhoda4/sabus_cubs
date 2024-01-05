



import   Card              from '../../common/cards/Card';
import   GalleryImage      from '../../common/images/GalleryImage'

import   IconInstagram     from '../../assets/icons/instagram.svg?react'

import { GalleryProps }    from '../../types/gallery'

import   useLocationScroll from '../../hooks/useLocationScroll'
import   copy              from '../../assets/copy';

import { Helmet       }     from 'react-helmet';



export default function Gallery( { photoData } : GalleryProps): JSX.Element {




    
    useLocationScroll();


    return (
        
        <div className='mx-2'>

            <Helmet>
                <title>Sabu's Cubs – Gallery</title>
                <meta name='description' content={`See the latest content that we've published on the Sabu's Cubs Instagram account.`} />
            </Helmet>



            <div         
                       id='gallery'
                className={`
                                grid gap-20
                                grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                                p-20
                            `}
            >
                {
                    photoData && photoData.length > 0 && photoData.map((photo, index) =>    <GalleryImage 
                                                                                                    key={index} 
                                                                                                    index={index} 
                                                                                                    url={photo} 
                                                                                                className={`
                                                                                                            transition transform hover:scale-125
                                                                                                            duration-500 ease-in-out 
                                                                                                        `}
                                                                                            />)
                }
            </div>


            <Card 
                wrapClass='max-w-2xl my-20 mx-auto'
                headingClass='bg-brand-red text-white'
                heading='follow us!'
            >


                <a  
                    href='https://www.instagram.com/sabuscubswpg/' 
                    target='_blank' 
                    rel='noreferrer'
                    className='flex items-center cursor-pointer hover:text-brand-red'
                >
                    <IconInstagram
                        height={'60px'}
                        width={'60px'}
                        className='mr-4 px-2 hover:animate-wiggle grow-0 shrink-0'
                        style={{ color: '#A62826' }}
                    />  

                    { copy('instaCTA') }

                </a>

            </Card>

        </div>
    )
}