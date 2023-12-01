





import Location   from '../../assets/location.svg?react'
import Email from '../../assets/icon_email.svg?react'
import SocialMedia  from '../../assets/social_media.svg?react'


import { LinkProps } from '../../types/menu'






const contactLinks : LinkProps[] = [

    {
        name: 'Location',
        icon:  Location,
    },

    {
        name: 'Email',
        icon:  Email,
    },

    {
        name: 'Social Media',
        icon:  SocialMedia,
        id:   'social-media',
    },

  
]



export default  contactLinks