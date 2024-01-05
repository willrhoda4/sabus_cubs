






import { FooterLinkProps   } from '../../../types/menu';
import { useNavigate       } from 'react-router-dom';



/**
 * generates a link for the FoooterLinks component.
 * in most cases, an inLink is generated, 
 * but if the link has an outLinkURL, an outLink is generated.
 */
export default function FooterLink( { page, link } : FooterLinkProps ) : JSX.Element {

    /**
     *  navigate is a function from react-router-dom.
     * 
     *  if an id is provided, we'll feed it to the navigate state,
     *  otherwise, we'll dervie the id from the link name
     *  (replacing spaces with underscores).
     * 
     *  we'll also feed the navigate state a timeStamp,
     *  which is a workaround to ensure that reclicks are valid.
     * 
     *  linkClass provides styles.
     */


    const navigate    = useNavigate()
    const id          = link.id ?? link.name.replace(/ /g, '_');
    const timeStamp   = Date.now()
    const linkClass   = 'hover:text-brand-red leading-3'

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