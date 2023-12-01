









import FooterLinks from './FooterLinks';


import infoLinks    from '../../../common/links/info';
import supportLinks from '../../../common/links/support';
import galleryLinks from '../../../common/links/gallery';
import contactLinks from '../../../common/links/contact';

import logoSmall    from '../../../assets/logo_small.png';



export default function FooterLinksDiv () : JSX.Element {



    return (

            <div className={`
                                w-full h-fit
                                flex flex-col
                                justify-center items-center
                           `}
            >
                {/* wrapper for links */}
                <div className={`
                                    hidden
                                    grid-cols-4 gap-
                               `} 
                >

                    <FooterLinks page='info'    links={infoLinks}    />

                    <FooterLinks page='support' links={supportLinks} />

                    <FooterLinks page='gallery' links={galleryLinks} />
                
                    <FooterLinks page='contact' links={contactLinks} />
                
                </div>

                <img alt='logo' src={logoSmall} className='h-24 w-24' />
            </div>
    )
}   