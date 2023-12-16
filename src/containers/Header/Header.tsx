






/**
 *  a collage of images that make up the header of the site.
 *  we use this component on every page of the site,
 *  even the admin dashboard.
 */




import { useMemo     }        from 'react';
import { useLocation }        from 'react-router-dom';

import   CloudinaryImage      from '../../common/images/CloudImg';
import   HeaderIcon           from './components/HeaderIcon';

import   logo                 from '../../assets/logo_large.png';

import   shuffleArray         from '../../utils/shuffleArray';
import   imageIdArray         from '../../utils/imageIdArray';
import { HeaderProps }        from '../../types/header';





export default function Header ( { editing, colours } : HeaderProps ) : JSX.Element {


    // get the location from the url
    // we use this immediately to determine what titleto display,
    // and then we use it to determine what icon to display.
    // if path is /simba title will be based on editing prop.
    const location         = useLocation();
    const title            = location.pathname.slice(1).toLowerCase();




    // we'll memoize the content of the header,
    // so it won't  to re-render every time we open the menu.
    const memoizedContent   = useMemo(() => {
        
        
        // we've imported a utility function that 
        // generates a random array of image ids.
        // we'll use this to grab 7 ids, and split them
        // between the left and right grids, and center image.
        const imageIds      = imageIdArray(7);
        const leftGridIds   = imageIds.slice(0, 3);
        const centerImageId = imageIds[3];
        const rightGridIds  = imageIds.slice(4, 7);


        // the first class ensures images fill their boxes
        // the second class is for the top and bottom stripes.
        const fillBox       = 'child:object-cover child:w-full child:h-full';
        const stripeClass   = `w-full h-[100px] flex justify-start items-center ${colours.flipBg}`;


        // a quick helper function that puts together the grid of images.
        // it takes an array of image ids, and a feature element.
        // we'll pass in an icon for the left grid,
        // and the logo for the right grid.
        const generateGrid  =  ( ids : string[], feature : JSX.Element ) => shuffleArray( [

            ...ids.map((id, index) => (
                <CloudinaryImage 
                          key={index}
                           id={id}
                    wrapStyle={`${fillBox}`}
                />
            ) ),
            feature
        ] );




        return (

            // wrap the header in a flex column.
            // we'll sandwich the collage between two stripes.
            <div className={`
                                flex flex-col 
                                w-full h-fit
                                mb-24 
                           `}
            >

                {/* top stripe  */}
                <div className={stripeClass} />

                {/* the collage */}
                <div className={`
                                    relative flex 
                                    w-full h-[400px] 
                                    border-black border-t-[16px] border-b-[16px]
                               `}
                >

                    {/* left grid. only visible on large screens. */}
                    <div className={`
                                        w-1/3 
                                        hidden xl:grid gap-4 
                                        grid-cols-2 grid-rows-2 
                                        bg-black
                                   `}
                    >

                        { 
                            generateGrid(   leftGridIds,    
                        
                                            // don't forget to give the feature a unique key.
                                            // the HeaderIcon component handles the
                                            <div key='leftGridFeature' className={`flex justify-center items-center ${colours.bg}`}>
                                                <HeaderIcon
                                                    title={title}
                                                    editing={editing}
                                                    height={'90px'}
                                                    width={'90px'}
                                                    className='mx-1 px-2 hover:animate-wiggle'
                                                    style={{ color: colours.icon }}
                                                />
                                            </div>
                                        )
                        }

                    </div>

                    {/* center image. always visible, but borders change. */}
                    <CloudinaryImage 
                               id={`${centerImageId}`}
                        wrapStyle={`
                                        w-full md:w-1/2 xl:w-1/3 h-full 
                                        bg-red-500 
                                        border-0 md:border-r-[16px] xl:border-x-[16px] border-black 
                                        ${fillBox}
                                   `}       
                    />


                    {/* right grid. only visible on medium and large screens. */}
                    <div className={`
                                        w-1/2 xl:w-1/3 
                                        hidden md:grid gap-4 
                                        grid-cols-2 grid-rows-2 
                                        bg-black
                                   `}
                    >
                        { 
                            generateGrid(   rightGridIds, 
                            
                                             // don't forget to give the feature a unique key.
                                            <div   
                                                key='rightGridFeature'
                                                className={`
                                                                flex justify-center items-center 
                                                                p-2
                                                                ${colours.bg}
                                                          `}
                                            >
                                                <img src={logo} alt='logo' className='h-full w-auto' />
                                            </div>
                                        )
                        }
                    </div>

                </div>

                {/* bottom stripe. title determined by url or editing in the case of location /simba. */}
                <div className={`pl-4 ${stripeClass}`}>
                    <h2 className={`text-title ${colours.flipText}`}>
                        {title !== 'simba' ? title : editing === 'newsReleases' ? 'news releases' : editing}
                    </h2>
                </div>

            </div>

        );

    }, [ title, colours.flipBg, colours.bg, colours.icon, colours.flipText, editing ]);


    
    return memoizedContent;
}

