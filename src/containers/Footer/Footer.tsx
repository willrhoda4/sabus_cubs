







import   EmailSignupDiv   from './components/EmailSignupDiv';
import   Friends          from './components/Friends';
import   FooterLinksDiv   from './components/FooterLinksDiv';
import { BrandColours }   from '../../utils/brandColours';




// container for the footer.
// wraps nav links, as well as email signup form.
export default function Footer ( { brandColours } : { brandColours : BrandColours } ) : JSX.Element {



    return (
        
       
        <footer className={`
                                w-full h-fit
                                flex flex-col
                                mt-48
                          `}
        >

            <EmailSignupDiv brandColours={brandColours} />

            <Friends />

            <FooterLinksDiv />

        </footer>
    )
}   