








import   Statements from './Statements';

import { Statement } from '../../../types/info';

import   Cleanup          from '../../../assets/icons/cleanup.svg?react';
import   Communication    from '../../../assets/icons/communication.svg?react';
import   Counselling      from '../../../assets/icons/counselling.svg?react';
import   FamilyMeals      from '../../../assets/icons/familyMeals.svg?react';
import   Walks            from '../../../assets/icons/walks.svg?react';
import   OpenGym          from '../../../assets/icons/openGym.svg?react';




export default function Actions () : JSX.Element {

    const actions : Statement[]= [
                                    {
                                        title: 'Community Walks',
                                        icon:   Walks,
                                        copy:  'This is just a quick description of the value, We should really try to keep it short and sweet.',
                                    },
                                    {
                                        title: 'Neighbourhood Cleanup',
                                        icon:   Cleanup,
                                        copy:  'This is just a quick description of the value, We should really try to keep it short and sweet.',
                                    },
                                    
                                    {
                                        title: 'Transparent Communications',
                                        icon:   Communication,
                                        copy:  'This is just a quick description of the value, We should really try to keep it short and sweet.',
                                    },
                                    {
                                        title: 'Action Counselling',
                                        icon:   Counselling,
                                        copy:  'This is just a quick description of the value, We should really try to keep it short and sweet.',
                                    },
                                    {
                                        title: 'Family Meals',
                                        icon:   FamilyMeals,
                                        copy:  'This is just a quick description of the value, We should really try to keep it short and sweet.',
                                    },
                                    {
                                        title: 'Open Gym',
                                        icon:   OpenGym,
                                        copy:  'This is just a quick description of the value, We should really try to keep it short and sweet.',
                                    },

                                ]


    return  <Statements
                title='Actions'
                blurb='some of the ways we try to give back'
                statements={actions}
                statementsOn='right'
                bgClass='bg-brand-grey'
                textClass='text-brand-yellow'
            />
}