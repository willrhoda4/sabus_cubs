









import     useRenderKey     from '../../../hooks/useRenderKey';
import     NewsReleaseRack  from '../../News/components/NewsReleaseRack';
import     NewsReleaseForm  from './forms/NewsReleaseForm';





export default function NewsReleases(): JSX.Element {


    const  [ renderKey, renderReleasess ] = useRenderKey();

    return (
        
        <div>
                  
            <NewsReleaseForm getData={renderReleasess}    />

            <NewsReleaseRack key={renderKey} admin={true} />
                  
        </div>
    )
}


