





import Donations     from '../../assets/icons/donations.svg?react'
import Volunteer     from '../../assets/icons/volunteer.svg?react'
import Supplies      from '../../assets/icons/supplies.svg?react'
import Fundraising   from '../../assets/icons/fundraising.svg?react'
import Subscriptions from '../../assets/icons/subscriptions.svg?react'


import { LinkProps } from '../../types/menu'






const supportLinks : LinkProps[] = [

    {
        name: 'Donate',
        icon:  Donations,
    },

    {
        name: 'Volunteer',
        icon:  Volunteer,
    },

    {
        name: 'Items',
        icon:  Supplies,
    },

    {
        name: 'Fundraise',
        icon:  Fundraising,
    },

    {
        name: 'Subscriptions',
        icon:  Subscriptions,
    },

]



export default  supportLinks