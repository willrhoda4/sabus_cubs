







import JournalistForm from '../forms/JournalistForm';
import JournalistRack from './JournalistRack';

import useRenderKey   from '../../../../hooks/useRenderKey';



export default function Journalists(): JSX.Element {


    const [ renderKey, renderJournalists ] = useRenderKey();

    

    return (
    
        <div>
     
            <JournalistForm getData={renderJournalists} />

            <JournalistRack key={renderKey} admin={true} />
                    
        </div>
        )
}