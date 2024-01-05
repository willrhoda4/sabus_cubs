









import   EmailSignup    from './EmailSignup';

import   useNewStatus   from '../../../hooks/useNewStatus';

import { BrandColours } from '../../../utils/brandColours';




export default function EmailSignupDiv ( { brandColours } : { brandColours : BrandColours } ) : JSX.Element {



    const [ statusRef, newStatus  ] = useNewStatus()

    
    


    return (

        <div className={`
                            flex flex-col 
                            justify-center items-center
                            w-full h-fit 
                            py-24
                            ${brandColours.bg}
                            shadow-brand-shadow
                       `}
        >
            <p className={`
                            text-heading 
                            pb-16
                            ${brandColours.text}
                         `}
            >Join our mailing list!</p>

            <EmailSignup 
                buttonColour={brandColours.button} 
                newStatus={newStatus}
            />

            <p ref={statusRef} className={`pt-16 ${brandColours.text}`} />


        </div>
    );
}
