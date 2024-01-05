









import   FooterLinks        from './FooterLinks';

import   infoLinks          from '../../../common/links/info';
import   supportLinks       from '../../../common/links/support';
import   galleryLinks       from '../../../common/links/gallery';
import   contactLinks       from '../../../common/links/contact';

import   logoSmall          from '../../../assets/logo_small.png';

import   SocialLinkSelector from '../../../common/links/SocialLinkSelector';

import { Link }             from 'react-router-dom';



// wraps the bottom half of the foooter.
// (everything below the email signup form)
// contains nav links, as well as logo and social links.
export default function FooterLinksDiv () : JSX.Element {



    return (

        <div className={`
                            w-full h-fit
                            p-12   lg:p-24
                            bg-black
                            flex
                            justify-center md:justify-between
                            items-center
                        `}
        >
            {/* wrapper for nav links */}
            <div className={`
                                hidden md:flex
                                text-white
                            `} 
            >

                <FooterLinks page='info'    links={infoLinks}    />

                <FooterLinks page='support' links={supportLinks} />

                <FooterLinks page='contact' links={contactLinks} />
            
                <FooterLinks page='gallery' links={galleryLinks} />
            
            </div>

            {/* wrapper  logo and social links*/}
            <div className={`
                                flex flex-col
                                justify-between items-center
                            `}
            >
                <Link to='/'>
                    <img 
                        alt='logo' 
                        src={logoSmall} 
                        onClick={() => window.scrollTo(0, 0)}
                        className='h-auto w-24 mb-8' />
                </Link>
                <SocialLinkSelector stroke='white' />
            </div>            
        </div>
    )
}   