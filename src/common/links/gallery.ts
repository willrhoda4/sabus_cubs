











import  Gallery      from '../../assets/icons/gallery.svg?react'
import  Instagram    from '../../assets/icons/instagram.svg?react'


import { LinkProps } from '../../types/menu'






const galleryLinks : LinkProps[] = [

    {
        name:       'On Site',
        icon:        Gallery,
        id:         'gallery',
    },

    {
        name:       'Instagram',
        icon:        Instagram,
        outLinkURL: 'https://www.instagram.com/sabuscubswpg/',
    },

]



export default  galleryLinks