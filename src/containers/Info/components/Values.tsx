








import   Statements from './Statements';

import { Statement } from '../../../types/info';

import   Compassion       from '../../../assets/icons/compassion.svg?react';
import   Transparency     from '../../../assets/icons/transparency.svg?react';
import   Inclusion        from '../../../assets/icons/inclusion.svg?react';
import   Community        from '../../../assets/icons/community.svg?react';
import   Environment      from '../../../assets/icons/environment.svg?react';
import   Knowledge        from '../../../assets/icons/knowledge.svg?react';
import   Safety           from '../../../assets/icons/safety.svg?react';




export default function Values () : JSX.Element {

    const values : Statement[]= [
                                    {
                                        title: 'Community',
                                        icon:   Community,
                                        copy:  'fostering a strong, supportive network that connects families and friends throughout the neighbourhood',
                                    },
                                    {
                                        title: 'Compassion',
                                        icon:   Compassion,
                                        copy:  'cultivating empathy and understanding and approaching others with respect for their personal journey',
                                    },
                                    
                                    {
                                        title: 'Transparency',
                                        icon:   Transparency,
                                        copy:  'always being honest, clear and open with all of our communications.',
                                    },
                                    {
                                        title: 'Inclusion',
                                        icon:   Inclusion,
                                        copy:  'embracing diversity, celebrating inclusion and ensuring everyone among us has a voice that can be heard',
                                    },
                                    
                                    {
                                        title: 'Environment',
                                        icon:   Environment,
                                        copy:  'actively working to protect and sustain our natural world, for the benefit of ourselves and others',
                                    },
                                    {
                                        title: 'Knowledge',
                                        icon:   Knowledge,
                                        copy:  'empowering through education, increasing awareness, and preserving wisdom for the future',
                                    },
                                    {
                                        title: 'Safety',
                                        icon:   Safety,
                                        copy:  'prioritizing the well-being and security of everyone who is part of our community',
                                    },

                                ]


    return <Statements
                title='Values'
                blurb='the core goals and beliefs that motivate us and bring us together'
                statements={values}
                bgClass='bg-brand-grey'
                textClass='bg-brand-red'
            />
}