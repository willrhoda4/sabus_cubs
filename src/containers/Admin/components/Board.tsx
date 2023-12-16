









import     useRenderKey     from '../../../hooks/useRenderKey';

import     BoardRoster      from '../../Info/components/BoardRoster';
import     BoardForm          from './forms/BoardForm';





export default function Board(): JSX.Element {


    const [ renderKey, renderFAQs ] = useRenderKey();

    return (
        
        <div>
                  
            <BoardForm getData={renderFAQs} />

            <BoardRoster key={renderKey} admin={true} />
                  
        </div>
    )
}


