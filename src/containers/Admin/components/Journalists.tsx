







import JournalistForm from './forms/JournalistForm';
import JournalistList from './JournalistRack';

import useRenderKey   from '../../../hooks/useRenderKey';



export default function Journalists(): JSX.Element {


    const [ renderKey, renderJournalists ] = useRenderKey();

    

    return (<>

                
        <JournalistForm getData={renderJournalists} />

        <JournalistList key={renderKey} admin={true} />
                
    </>)
}