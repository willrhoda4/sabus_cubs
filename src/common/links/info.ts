





import Story   from '../../assets/story.svg?react'
import Mission from '../../assets/mission.svg?react'
import Values  from '../../assets/values.svg?react'
import Actions from '../../assets/actions.svg?react'
import Board   from '../../assets/board.svg?react'
import FAQ     from '../../assets/faq.svg?react'


import { LinkProps } from '../../types/menu'






const infoLinks : LinkProps[] = [

    {
        name: 'Story',
        icon:  Story,
    },

    {
        name: 'Mission',
        icon:  Mission,
    },

    {
        name: 'Values',
        icon:  Values,
    },

    {
        name: 'Actions',
        icon:  Actions,
    },

    {
        name: 'Board',
        icon:  Board,
    },

    {
        name: 'FAQ',
        icon:  FAQ,
    }
]



export default  infoLinks