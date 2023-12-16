







import IconFacebook   from '../../assets/icons/facebook.svg?react';
import IconInstagram  from '../../assets/icons/instagram.svg?react';
import IconMail       from '../../assets/icons/mail.svg?react';
                                

import SocialLink     from './SocialLink';





export default function SocialLinkSelector({ stroke = 'black'} : { stroke?: string } ) {


    const platforms =   [
                            {
                                name: 'facebook',
                                icon:  IconFacebook,
                                url:  'https://www.facebook.com/sabuscubs'
                            },

                            {
                                name: 'email',
                                icon:  IconMail,
                                url:  'https://www.sabuscubs.com/contact?how=email'
                            },

                            {
                                name: 'instagram',
                                icon:  IconInstagram,
                                url:  'https://www.instagram.com/sabuscubswpg/'
                            },
                        ]
                        




    return (

        <div className={`
                            flex items-center
                            px-1
                            mr-2
                       `}
        >
            { platforms.map( platform => <SocialLink key={platform.name} stroke={stroke} { ...platform } /> ) }

        </div>                         
    )
 }