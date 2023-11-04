







import   FAQ          from "./components/FAQ";
import   Board        from "./components/Board";
import   Items        from "./components/Items";
import   Stories      from "./components/Stories";
import   Journalists  from "./components/Journalists";
import   NewsReleases from "./components/NewsReleases";
import { AdminProps } from '../../types/admin'






export default function Admin ({editing} : AdminProps) : JSX.Element {



    const displaying = editing === 'faq'          ? <FAQ /> 
                     : editing === 'items'        ? <Items />
                     : editing === 'board'        ? <Board />
                     : editing === 'stories'      ? <Stories />
                     : editing === 'journalists'  ? <Journalists />
                     : editing === 'newsReleases' ? <NewsReleases />
                     :                              <p>other</p>;






    return (<div className='w-3/4'>

            {displaying}

    </div>);
}