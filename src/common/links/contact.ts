





import Location     from '../../assets/icons/location.svg?react'
import Email        from '../../assets/icons/email.svg?react'
import SocialMedia  from '../../assets/icons/social_media.svg?react'


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