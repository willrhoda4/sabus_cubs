







import NavigatorLink     from './NavigatorLink';

import IconInfo          from '../../../assets/icons/info.svg?react';
import IconSupport       from '../../../assets/icons/support.svg?react';
import IconGallery       from '../../../assets/icons/gallery.svg?react';
import IconContact       from '../../../assets/icons/email.svg?react';
import IconNews          from '../../../assets/icons/news.svg?react';
import IconDonate        from '../../../assets/icons/donations.svg?react';





export default function Navigator(): JSX.Element {

    



    const linkData = [
        { icon: IconInfo,    name: 'info'    },
        { icon: IconSupport, name: 'support' },
        { icon: IconGallery, name: 'gallery' },
        { icon: IconContact, name: 'contact' },
        { icon: IconNews,    name: 'news'    },
        { icon: IconDonate,  name: 'donate'  },
    ];


    return (

        <div className={`
                            grid 
                            grid-cols-2  md:grid-cols-3 lg:grid-cols-6 
                            w-full h-fit
                            border-black border-y-[16px]
                            mb-[-192px]
                       `}
        >
            { linkData.map( ( data, index) => <NavigatorLink key={index} index={index} data={data} /> ) }
        </div>
    );
}
