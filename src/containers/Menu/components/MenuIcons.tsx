










import { useNavigate      } from 'react-router-dom';


import { MenuIconsProps   }  from '../../../types/menu';


import   infoLinks      from '../../../common/links/info';
import   supportLinks   from '../../../common/links/support';
import   galleryLinks   from '../../../common/links/gallery';
import   contactLinks   from '../../../common/links/contact';
import   newsLinks      from '../../../common/links/news';





// pop-out menu for left side of screen
export default function MenuIcons ({ iconsDisplayed, setMenuDisplayed,} : MenuIconsProps) : JSX.Element {



    const navigate       = useNavigate();

    const displayedIcons = () => {

        switch (iconsDisplayed) {

            case 'info'    : return infoLinks;
            case 'support' : return supportLinks;
            case 'gallery' : return galleryLinks;
            case 'contact' : return contactLinks;
            case 'news'    : return newsLinks;
            default        : return [];
        }
    }


   return   <div>
                {

                    displayedIcons().map( (link, index) => {
                        
                        
                        const { name, icon : Icon, outLinkURL } = link;
                        
                        const icon       =  <Icon
                                                height={'60px'}
                                                width={'60px'}
                                                className='mx-1 px-2 hover:animate-wiggle'
                                                style={{ color: '#A62826' }}
                                            />      

                        const id          = link.id ?? name.toLowerCase();

                        const timeStamp   = Date.now()

                        const linkClass   = `
                                                m-4 
                                                flex flex-col items-center
                                            `;

                        const nameClass   = `
                                                text-brand-red 
                                                text-center 
                                                font-body 
                                                text-sm md:text-base lg:text-lg 
                                            `

                        const handleClick = () =>   {
                                                        navigate(`/${iconsDisplayed}`, { state: { id: id, timeStamp: timeStamp } } );
                                                        setMenuDisplayed(false);
                                                    }

                        const inLink      = <a 
                                                key={index}
                                                onClick={handleClick}
                                                className={linkClass}
                                            >
                                                {icon}  
                                                <p className={nameClass}>{name}</p>
                                            </a>

                        const outLink     = <a 
                                                key={index}
                                                href={outLinkURL} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                onClick={ () => setMenuDisplayed(false) }
                                                className={linkClass}
                                            >
                                                {icon}
                                                <p className={nameClass}>{name}</p> 
                                            </a>

                        return outLinkURL ? outLink : inLink;
                    } )
                }
            </div>

}
        


