









import     useRenderKey     from '../../../hooks/useRenderKey';

import     StoryRack        from '../../News/components/StoryRack';
import     StoryForm        from './forms/StoryForm';





export default function FAQ(): JSX.Element {


    const [ renderKey, renderFAQs ] = useRenderKey();

    return (<>

        <p>stories</p>
                
        <StoryForm getData={renderFAQs} />

        <StoryRack key={renderKey} admin={true}/>
                
    </>)
}


