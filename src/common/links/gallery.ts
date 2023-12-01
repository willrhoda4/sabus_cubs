











import  Gallery      from '../../assets/gallery.svg?react'
import  Instagram    from '../../assets/icon_instagram.svg?react'


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