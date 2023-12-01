











import   Statement         from './Statement';
import { StatementsProps } from '../../../types/info';




export default function Statements({ title, blurb, statements, statementsOn = 'left', bgClass, textClass }: StatementsProps): JSX.Element {


    const isLeft     = statementsOn === 'left';

    const iconStroke = bgClass ? textClass.slice(5) : 'black';  
    const layout     = [

        <div 
                  key='titleDiv' 
            className={`
                        col-span-1 
                        flex items-center 
                        ${isLeft ? 'justify-end' : 'justify-start'} 
                        px-4 
                        ${bgClass} ${textClass}
                      `}
        >
            <div>
                <h2 className='font-title'>{title}</h2>
                <p className='font-heading'>{blurb}</p>
            </div>
        </div>,

        <div 
                  key='statementsDiv' 
            className={`
                        col-span-2 
                        grid grid-cols-2 gap-8 
                        p-28
                        bg-whitesmoke 
                      `}
        >
            {statements && statements.length > 0 ? statements.map( statement => <Statement key={statement.title} {...statement} stroke={iconStroke} />) : <p>No statements yet</p>}
        </div>,
    ];

    !isLeft && layout.reverse();

    return <div className={`
                            grid grid-cols-3
                            w-full 
                        
                          `}
            >{layout}</div>;
}



// import   Statement         from './Statement';
// import { StatementsProps } from '../../../types/info';




// export default function Statements( { title, blurb, statements, statementsOn = 'left', bgClass, textClass } : StatementsProps ) : JSX.Element {


//     const isLeft = statementsOn === 'left';

//     const titleDiv = (

//         <div 
//                    key='titleDiv'
//              className={`
//                             col-span-1 
//                             flex items-center 
//                             ${ isLeft ? 'justify-end' : 'justify-start' } 
//                             ${ bgClass } 
//                             ${ textClass }
//                        `}
//         >
//             <div>
//                 <h2 className='font-title'   >{title}</h2>
//                 <p  className='font-heading' >{blurb}</p>
//             </div>
//         </div>
//     );

//     const statementsDiv = (

//         <div 
//                    key='statementsDiv'
//              className={`
//                             col-span-2 
//                             grid grid-cols-2 gap-4
//                             bg-whitesmoke
//                             border border-yellow-500
//                        `}
//         >
//             { 
//                 statements && statements.length > 0 
//                     ? statements.map( ( statement, index ) => <Statement key={index} { ...statement } /> ) 
//                     : <p>no statements yet</p>
//             }
            
//         </div>
//     );

//     const layout = [ titleDiv, statementsDiv ];

//     !isLeft && layout.reverse();



//     return (
//         <div className="grid grid-cols-3 w-full">
//             { layout }
//         </div>
//     );
// }
