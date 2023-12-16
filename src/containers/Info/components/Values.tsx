








import   Statements from './Statements';

import { Statement } from '../../../types/info';

import   Compassion from '../../../assets/icons/compassion.svg?react';
import   Discipline from '../../../assets/icons/discipline.svg?react';
import   Sport      from '../../../assets/icons/sport.svg?react';
import   Community  from '../../../assets/icons/community.svg?react';
import   Courage    from '../../../assets/icons/courage.svg?react';
import   Family     from '../../../assets/icons/family.svg?react';




export default function Values () : JSX.Element {

    const values : Statement[]= [
                                    {
                                        title: 'Compassion',
                                        icon:   Compassion,
                                        copy:  'This is just a quick description of the value, We should really try to keep it short and sweet.',
                                    },
                                    
                                    {
                                        title: 'Discipline',
                                        icon:   Discipline,
                                        copy:  'This is just a quick description of the value, We should really try to keep it short and sweet.',
                                    },
                                    {
                                        title: 'Sport',
                                        icon:   Sport,
                                        copy:  'This is just a quick description of the value, We should really try to keep it short and sweet.',
                                    },
                                    {
                                        title: 'Community',
                                        icon:   Community,
                                        copy:  'This is just a quick description of the value, We should really try to keep it short and sweet.',
                                    },
                                    {
                                        title: 'Courage',
                                        icon:   Courage,
                                        copy:  'This is just a quick description of the value, We should really try to keep it short and sweet.',
                                    },
                                    {
                                        title: 'Family',
                                        icon:   Family,
                                        copy:  'This is just a quick description of the value, We should really try to keep it short and sweet.',
                                    },

                                ]


    return <Statements
                title='Values'
                blurb='the core beliefs that matter to us the most'
                statements={values}
                bgClass='bg-brand-grey'
                textClass='bg-brand-red'
            />
}