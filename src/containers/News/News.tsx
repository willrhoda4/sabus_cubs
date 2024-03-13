










import   SectionTitle       from '../../common/SectionTitle';
import   StoryRack          from './components/StoryRack';
import   NewsReleaseRack    from "./components/NewsReleaseRack";

import   copy               from '../../assets/copy';

import   useLocationScroll  from '../../hooks/useLocationScroll';

import { Helmet }           from 'react-helmet';

import   ImageStrip         from '../../common/images/ImageStrip';




export default function News () : JSX.Element {


    useLocationScroll();


    return (

        

        <div className={`w-full h-fit flex flex-col`}>

            <Helmet>
                <title>Sabu's Cubs – News</title>
                <meta name='description' content={`Peruse our collection of Sabu's Cubs news stories, or browse throuogh our archive of news releases.`} />
            </Helmet>


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
                    <ImageStrip bgClass='bg-brand-blue' ids={ [ 'walkie_talkie_left', 'teeter_totter', 'walkie_talkie_right', ] } />

                    {/* title div */}
                    <SectionTitle 
                            title={'News Releases'}
                            blurb={copy('newsReleases', 'string') as string}
                            bgClass={'bg-brand-red'}
                            textClass={'text-brand-yellow'}
                            textRight={false}
                            responsive={false}
                        />

                    <div className='px-2 flex justify-center'>
                        <NewsReleaseRack />
                    </div>
                </div>



            </div>
        </div>
    )
}