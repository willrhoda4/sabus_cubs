









import     useRenderKey     from '../../../hooks/useRenderKey';

import     FAQBuffet        from '../../Info/components/FAQBuffet';
import     FAQForm          from './forms/FAQForm';





export default function FAQ(): JSX.Element {


    const [ renderKey, renderFAQs ] = useRenderKey();

    return (<>
                  
        <FAQForm getData={renderFAQs} />

        <FAQBuffet key={renderKey} admin={true}/>
                  
    </>)
}


