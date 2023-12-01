





import Donations       from '../../assets/donations.svg?react'
import Volunteer     from '../../assets/volunteer.svg?react'
import Supplies      from '../../assets/supplies.svg?react'
import Fundraising   from '../../assets/fundraising.svg?react'


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
        name: 'Supplies',
        icon:  Supplies,
    },

    {
        name: 'Fundraising',
        icon:  Fundraising,
    },

]



export default  supportLinks