



/**
 * container component for action and value statements on info page.
 */






import   SectionTitle      from '../../../common/SectionTitle';   
import   Statement         from './Statement';
import { StatementsProps } from '../../../types/info';




export default function Statements({ title, blurb, statements, statementsOn = 'left', bgClass, textClass }: StatementsProps): JSX.Element {


    // unless 'right' is passed in for statementsOn,
    // we'll put the statements on the left and title on the right.
    // for smaller screens, we'll always put the title on top.
    const titleLeft     = statementsOn === 'right';

    // if bgClass is passed in, we'll use the same colour
    // for our icon stroke. otherwise, we'll use black.
    const iconStroke = bgClass ? textClass.slice(5) : 'black';  
  


    return <div className={`
                            flex flex-col ${ titleLeft ? 'xl:flex-row-reverse' : 'xl:flex-row' }
                            w-full 
                          `}
            >
                

                {/* title div */}
                <SectionTitle 
                    title={title}
                    blurb={blurb}
                    bgClass={bgClass}
                    textClass={textClass}
                    textRight={titleLeft}
                    responsive={true}
                />

               

                {/* statements div */}
                <div 
                    className={`
                                w-full xl:w-8/12 
                                grid grid-cols-1 md:grid-cols-2 gap-8 
                                p-8 md:p-28
                                bg-whitesmoke 
                            `}
                >
                    { statements && statements.length > 0 && statements.map( statement => <Statement key={statement.title} {...statement} stroke={iconStroke} />) }
                </div>,    
            </div>;
}

