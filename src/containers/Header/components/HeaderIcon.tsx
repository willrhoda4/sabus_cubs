










import   IconHome             from '../../../assets/icons/home.svg?react';
import   IconInfo             from '../../../assets/icons/info.svg?react';
import   IconGallery          from '../../../assets/icons/gallery.svg?react';
import   IconContact          from '../../../assets/icons/email.svg?react';
import   IconSupport          from '../../../assets/icons/support.svg?react';
import   IconNews             from '../../../assets/icons/news.svg?react';
import   IconFAQ              from '../../../assets/icons/FAQ.svg?react';
import   IconItems            from '../../../assets/icons/supplies.svg?react';
import   IconBoard            from '../../../assets/icons/board.svg?react';
import   IconStories          from '../../../assets/icons/stories.svg?react';
import   IconJournalists      from '../../../assets/icons/email.svg?react';
import   IconNewsReleases     from '../../../assets/icons/news_releases.svg?react';

import { HeaderIconProps   }  from '../../../types/header';




export default function HeaderIcon ( { title, editing, height, width, className, style } : HeaderIconProps ) : JSX.Element {



     
    type  IconType = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    let   Icon : IconType;
 



    switch (title) {
        case 'home':
            Icon = IconHome;
            break;
        case 'info':
            Icon = IconInfo;
            break;
        case 'gallery':
            Icon = IconGallery;
            break;
        case 'contact':
            Icon = IconContact;
            break;
        case 'support':
            Icon = IconSupport;
            break;
        case 'news':
            Icon = IconNews;
            break;
        case 'simba':
            switch (editing) {
                case 'faq':
                    Icon = IconFAQ;
                    break;
                case 'items':
                    Icon = IconItems;
                    break;
                case 'board':
                    Icon = IconBoard;
                    break;
                case 'stories':
                    Icon = IconStories;
                    break;
                case 'journalists':
                    Icon = IconJournalists;
                    break;
                case 'newsreleases':
                    Icon = IconNewsReleases;
                    break;
                default:
                    Icon = IconHome;
            }
            break;
        default:
            Icon = IconHome;
    }
    

    return  <Icon
                height={height}
                width={width}
                className={className}
                style={style}
            />
                

}