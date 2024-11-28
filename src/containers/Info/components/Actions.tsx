








import   Statements from './Statements';

import { Statement } from '../../../types/info';

import   Walks            from '../../../assets/icons/walks.svg?react';
import   Cleanup          from '../../../assets/icons/cleanup.svg?react';
import   Mentorship       from '../../../assets/icons/mentorship.svg?react';
import   FamilyMeals      from '../../../assets/icons/familyMeals.svg?react';
import   OpenGym          from '../../../assets/icons/openGym.svg?react';




export default function Actions () : JSX.Element {

    const actions : Statement[]= [
                                    {
                                        title: 'Community Walks',
                                        icon:   Walks,
                                        copy:  'for us, walking the walk really starts with boots on the sidewalk',
                                    },
                                    {
                                        title: 'Neighbourhood Cleanups',
                                        icon:   Cleanup,
                                        copy:  'doing our part to make sure our streets and parks have a little less litter on them.',
                                    },
                                    {
                                        title: 'Mentorship',
                                        icon:   Mentorship,
                                        copy:  'providing our youth volunteers with support and guidance to help them succeed',
                                    },
                                    {
                                        title: 'Athletics',
                                        icon:   OpenGym,
                                        copy:  'promoting good health and providing a positive outlet with gym time and access to sporting equipment',
                                    },
                                    {
                                        title: 'Family Meals',
                                        icon:   FamilyMeals,
                                        copy:  'after every weekly walk, we wind down by enjoying each other’s company and a plate of food',
                                    },
                                   

                                ]


    return  <Statements
                title='Actions'
                blurb={`steps we're taking to promote positive change in our community`}
                statements={actions}
                statementsOn='right'
                bgClass='bg-brand-grey'
                textClass='text-brand-yellow'
            />
}