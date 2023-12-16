









import { SocialPlatformProps } from "../../../types/contact"




export default function SocialPlatform({ icon : Icon, content, url }: SocialPlatformProps): JSX.Element {



    return (

        <div className={`
                            flex flex-col items-center justify-between
                            w-full h-full justify-between
                        `}
        >

            <a  
                href={url} 
                target='_blank' 
                rel='noreferrer'
                className='flex items-center cursor-pointer hover:text-brand-red'
            >

                <Icon
                    stroke={'black'}
                    height={'80px'}
                    width={'80px'}
                    className='m-8 animate-wiggle'
                />    

            </a>

            <div className={`
                                w-full max-w-xs 
                                h-[517px]
                                border-4 border-black p-1
                                rounded-tl-md rounded-tr-md
                           `}
            >
                {content}
            </div>

        </div>
    );
}
