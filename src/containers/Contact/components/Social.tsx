











import   FacebookFeed      from './FacebookFeed';
import   InstagramExamples from './InstagramExamples';
import   SocialPlatform    from './SocialPlatform';

import { ContactProps }    from '../../../types/contact';

import   IconInstagram     from '../../../assets/icons/instagram.svg?react'
import   IconFacebook      from '../../../assets/icons/facebook.svg?react'








export default function Social({ photoData }: ContactProps): JSX.Element {




    return (


        <div className={`
                            w-full h-fit
                            flex flex-col md:flex-row 
                            items-center justify-center
                       `}
        >

            <SocialPlatform
                name='Instagram'
                icon={IconInstagram}
                content={<InstagramExamples photoData={photoData} />}
                url='https://www.instagram.com/sabuscubswpg/'
            />

            <SocialPlatform
                name='Facebook'
                icon={IconFacebook}
                content={<FacebookFeed name='Sabus Cubs' url='https://www.facebook.com/sabuscubs' />}
                url='https://www.facebook.com/sabuscubs/'
            />
            
        </div>
    );
}
