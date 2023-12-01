






import { LinkProps,
         FooterLinksProps } from '../../../types/menu'

import{ Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




export default function FooterLinks( { page, links } : FooterLinksProps ) : JSX.Element {

    const navigate = useNavigate();

    


    // function footerLink ( link : LinkProps ) {


    //     return (

    //         <Link 
    //             key={ link.name }
    //              to={ { 
    //                     pathname: `/${page}`, 
    //                        state: { id: link.id ?? link.name.toLowerCase() }, 
    //                          key: Math.random() // This forces a re-render
    //                 } }                  
    //             className='hover:underline'
    //         >
    //             {link.name}
    //         </Link>
    //     )
    // }


    function footerLink (link: LinkProps ) {

        const id          = link.id ?? link.name.replace(/ /g, '_');
        const timeStamp   = Date.now()
        const linkClass   = 'hover:underline hover:text-brand-red leading-3'

        const handleClick = () => navigate(`/${page}`, { state: { id: id, timeStamp: timeStamp } } );

        const inLink = <a 
                                key={link.name}
                            onClick={handleClick}
                            className={linkClass}
                        >
                            {link.name.toLowerCase()}
                        </a>

        const outLink = <a 
                              href={link.outLinkURL} 
                            target="_blank" 
                               rel="noopener noreferrer"
                            className={linkClass}
                        >
                            {link.name.toLowerCase()}
                        </a>

        return link.outLinkURL ? outLink : inLink;

        
      }



    return (

        <div className={`
                            flex flex-col 
                            w-24 h-fit
                       `}
        >
            <Link 
                       to={`/${page}`}
                className={`
                            my-2 
                            font-bold font-xl 
                            hover:text-brand-red 
                            cursor-pointer
                          `}
            >
                {page[0].toUpperCase()+page.slice(1)}
            </Link>

            { links && links.map( (link, index) => <div key={index} >{ footerLink(link) }</div>) }
        </div>
    )
}