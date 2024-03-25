





import Story   from '../../assets/icons/story.svg?react'
import Mission from '../../assets/icons/mission.svg?react'
import Values  from '../../assets/icons/values.svg?react'
import Actions from '../../assets/icons/actions.svg?react'
import Board   from '../../assets/icons/board.svg?react'
import FAQ     from '../../assets/icons/FAQ.svg?react'


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