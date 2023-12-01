







import EmailSignup      from './components/EmailSignup';
import FooterLinksDiv   from './components/FooterLinksDiv';





export default function Footer () : JSX.Element {



    return (
        
        // container for the footer.
        // wraps nav links, as well as email signup form.
        <footer className={`
                                w-full h-fit
                                flex flex-col
                          `}
        >

            <EmailSignup />

            <FooterLinksDiv />

        </footer>
    )
}   