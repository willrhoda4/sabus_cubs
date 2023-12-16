











import  Stories      from '../../assets/icons/stories.svg?react'
import  NewsReleases    from '../../assets/icons/news_releases.svg?react'


import { LinkProps } from '../../types/menu'






const galleryLinks : LinkProps[] = [

    {
        name:       'News Stories',
        icon:        Stories,
        id:         'news_stories',
    },

    {
        name:       'News Releases',
        icon:        NewsReleases,
        id:         'news_releases',
    },

]



export default  galleryLinks