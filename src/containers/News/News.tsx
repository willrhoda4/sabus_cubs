










import SectionTitle     from '../../common/SectionTitle';
import StoryRack        from './components/StoryRack';
import NewsReleaseRack  from "./components/NewsReleaseRack";

import copy             from '../../assets/copy';

import useLocationScroll  from '../../hooks/useLocationScroll';




export default function News () : JSX.Element {


    useLocationScroll();


    return (

        <div className={`w-full h-fit flex flex-col`}>


            {/* leavek this div in place to eliminate white space */}
            <div className={`w-full h-fit flex flex-col items-center mt-[-96px]`}>

                <div id='news_stories'  className='w-full h-fit flex flex-col'>
                    {/* title div */}
                    <SectionTitle 
                            title={'Spotlight on Sabu'}
                            blurb={copy('newsStories', 'string') as string}
                            bgClass={'bg-black'}
                            textClass={'text-brand-red'}
                            textRight={true}
                            responsive={false}
                        />

                    <StoryRack />
                </div>

                <div id='news_releases' className={`
                                                    w-full h-fit 
                                                    flex flex-col 
                                                  `}
                >
                    {/* title div */}
                    <SectionTitle 
                            title={'News Releases'}
                            blurb={copy('newsReleases', 'string') as string}
                            bgClass={'bg-brand-red'}
                            textClass={'text-brand-yellow'}
                            textRight={false}
                            responsive={false}
                        />

                    <div className='px-2'>
                        <NewsReleaseRack />
                    </div>
                </div>



            </div>
        </div>
    )
}