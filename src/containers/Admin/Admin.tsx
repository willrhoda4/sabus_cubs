







import   FAQ                from './components/FAQ';
import   Board              from './components/Board';
import   Items              from './components/Items';
import   Stories            from './components/Stories';
import   Journalists        from './components/Journalists';
import   NewsReleases       from './components/NewsReleases';
import { AdminProps }       from '../../types/admin'
import   logoSmall          from '../../assets/logo_small.png';







export default function Admin ( { editing, brandColours } : AdminProps ) : JSX.Element {



    const displaying = editing === 'faq'          ? <FAQ /> 
                     : editing === 'items'        ? <Items />
                     : editing === 'board'        ? <Board />
                     : editing === 'stories'      ? <Stories />
                     : editing === 'journalists'  ? <Journalists />
                     : editing === 'newsReleases' ? <NewsReleases />
                     :                              <p>please select a page.</p>;






    return (

        <div className={`
                            w-full h-fit 
                            flex flex-col 
                            items-center justify-center
                            ${ brandColours.bg }
                            mt-[-96px]
                       `}
        >
            
            <div className={`
                                w-10/12 sm:w:9/12 xl:w:8/12
                                bg-white
                                    child:flex child:flex-col child:items-center
                                    child:my-24 child:px-2
                           `}
            >
                { displaying }
            </div>

            <div className={`
                                w-full
                                flex items-center justify-center
                                ${ brandColours.flipBg }
                           `}
            >
                <img alt='logo' src={logoSmall} className='h-auto w-24 my-16' />
            </div>

        </div>
    );
}