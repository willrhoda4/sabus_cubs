







import FAQ   from "./components/FAQ";
import Board from "./components/Board";
import Items from "./components/Items";
import { AdminProps } from '../../types/admin'






export default function Admin ({editing} : AdminProps) : JSX.Element {



    const displaying = editing === 'faq'    ? <FAQ /> 
                     : editing === 'items'  ? <Items />
                     : editing === 'board'  ? <Board />
                     :                        <p>other</p>;






    return (<div className='w-3/4'>

            {displaying}

    </div>);
}