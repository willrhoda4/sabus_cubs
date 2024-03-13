



/**
 * 
 *  container component for FAQ tab on content page in admin dashboard.
 * 
 *  we use the useRenderKey hook to force a re-render of 
 *  the FAQBuffet component after a new FAQ is added.
 * 
 *  as a redundnacy, we check if a token is in local storage
 *  before rendering the admin controls for the FAQ buffet.
 *  this is easy to workaround, but the EditorButtons component
 *  gets all its requests tested on the server anyway.
 */









import     useRenderKey     from '../../../../hooks/useRenderKey';

import     FAQBuffet        from '../../../Info/components/FAQBuffet';
import     FAQForm          from '../forms/FAQForm';





export default function FAQ(): JSX.Element {

    
    const  admin                    = localStorage.getItem('jwt') !== null;

    const [ renderKey, renderFAQs ] = useRenderKey();

    return (
        
        <div className={`
                            flex flex-col items-center
                            w-full h-fit
                       `}
        >
                    
            <FAQForm getData={renderFAQs} />

            <FAQBuffet key={renderKey} admin={admin}/>
                  
        </div>
    )
}


