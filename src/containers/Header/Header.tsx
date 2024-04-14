






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

import   authToken            from '../../utils/authToken';
import   shuffleArray         from '../../utils/shuffleArray';
import   imageIdArray         from '../../utils/imageIdArray';
import { HeaderProps }        from '../../types/header';





export default function Header ( { editing, colours } : HeaderProps ) : JSX.Element {


   

    // we'll use the url to determine the title of the header.
    // start by grabbing the pathname, and removing the leading slash.
    const pathName = useLocation().pathname.slice(1).toLowerCase();

    
    // check if the admin is authenticated.
    const isAdminAuthenticated = authToken('check');

    // for the sake of brevity, subscription-update and newsReleases will be truncated.
    // otherwise, we'll just use the pathname as the title,
    // except for the admin dashboard, where we'll use the editing state.
    // if the pathname isn't valid, we'll just display an empty string.
    // if the admin isn't authenticated, we'll display an empty string.
    const title = useMemo(() => {

        // define an array of valid paths, so we don't display any typos.
        const validPaths = [ 'home', 'info', 'gallery', 'contact', 'support', 'news', 'subscription-update', 'simba' ];
    

        if (  pathName === 'subscription-update' ) return 'update';
        if ( !validPaths.includes( pathName )    ) return '';
        if (  pathName === 'simba'               ) return isAdminAuthenticated ? ( editing === 'newsReleases' ? 'releases' 
                                                                                                              :  editing 
                                                                                 ) 
                                                                               : '';
        return pathName;
        
    }, [ pathName, isAdminAuthenticated, editing ] );
 
   
   

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
        const stripeClass   = `w-full h-[100px] flex justify-start items-center ${colours.flipBg} shadow-brand-shadow`;


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
                                z-10
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
                                            <div key='leftGridFeature' className={`flex justify-center items-center ${colours.bg}`}>
                                                <HeaderIcon
                                                    title={ pathName === 'simba' ? 'simba' : title }
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

                    {/* center image. visible for tablet and desktop. */}
                    <CloudinaryImage 
                               id={`${centerImageId}`}
                        wrapStyle={`
                                        w-1/2 xl:w-1/3 
                                        hidden md:flex
                                        bg-brand-red 
                                        border-0 md:border-r-[16px] xl:border-x-[16px] border-black 
                                        ${fillBox}
                                   `}       
                    />


                    {/* right grid. always visisble. */}
                    <div className={`
                                        w-full md:w-1/2 xl:w-1/3 h-full 
                                        grid  gap-4
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
                <div className={`pl-4 ${stripeClass} `}>
                    <h2 className={`text-title ${colours.flipText}`}>
                        {  title  }
                    </h2>
                </div>
            </div>

        );

    }, [ colours.flipBg, colours.bg, colours.icon, colours.flipText, pathName, title, editing ] );

    
    return memoizedContent;
}

