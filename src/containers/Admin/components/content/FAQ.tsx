



/**
 * 
 *  container component for FAQ tab on content page in admin dashboard.
 * 
 *  we use the useRenderKey hook to force a re-render of 
 *  the FAQBuffet component after a new FAQ is added.
 */









import     useRenderKey     from '../../../../hooks/useRenderKey';

import     FAQBuffet        from '../../../Info/components/FAQBuffet';
import     FAQForm          from '../forms/FAQForm';





export default function FAQ(): JSX.Element {


    const [ renderKey, renderFAQs ] = useRenderKey();

    return (
        
        <div className={`
                            flex flex-col items-center
                            w-full h-fit
                       `}
        >
                    
            <FAQForm getData={renderFAQs} />

            <FAQBuffet key={renderKey} admin={true}/>
                  
        </div>
    )
}


