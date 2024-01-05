










import   IconHome             from '../../../assets/icons/home.svg?react';
import   IconInfo             from '../../../assets/icons/info.svg?react';
import   IconGallery          from '../../../assets/icons/gallery.svg?react';
import   IconContact          from '../../../assets/icons/email.svg?react';
import   IconSupport          from '../../../assets/icons/support.svg?react';
import   IconNews             from '../../../assets/icons/news.svg?react';
import   IconStories          from '../../../assets/icons/stories.svg?react';
import   IconEmails           from '../../../assets/icons/email.svg?react';
import   IconNewsReleases     from '../../../assets/icons/news_releases.svg?react';
import   IconDonate           from '../../../assets/icons/donations.svg?react';
import   IconUpdate           from '../../../assets/icons/update.svg?react';
import   IconFAQ           from '../../../assets/icons/FAQ.svg?react';

import { HeaderIconProps   }  from '../../../types/header';




export default function HeaderIcon ( { title, editing, height, width, className, style } : HeaderIconProps ) : JSX.Element {



     
    type  IconType = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    let   Icon : IconType;
 
    console.log(title, editing);

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
        case 'update':
            Icon = IconUpdate;
            break;
        case 'simba':
            switch (editing) {
                case 'content':
                    Icon = IconStories;
                    break;
                case 'donations':
                    Icon = IconDonate;
                    break;
                case 'emails':
                    Icon = IconEmails;
                    break;
                case 'releases':
                    Icon = IconNewsReleases;
                    break;
                default:
                    Icon = IconHome;
            }
            break;
        default:
            Icon = IconFAQ;
    }
    

    return  <Icon
                height={height}
                width={width}
                className={className}
                style={style}
            />
                

}