







import   ItemsForm    from "./forms/ItemsForm";
import   ItemsList    from '../../Support/components/ItemsList';

import   useRenderKey from "../../../hooks/useRenderKey";
 






export default function Items (): JSX.Element {


    const [ renderKey, renderItems ] = useRenderKey();



   
        return (
            
            <div className={`
                                w-full h-fit
                                flex flex-col
                        `}
            >
    
                <ItemsForm getData={renderItems} />

                <ItemsList key={renderKey} admin={true} />
    
            </div>
        )
    }