





import { Statement as StatementType } from '../../../types/info';

export default function Statement( { title, copy, icon: Icon, stroke = 'black'} : StatementType): JSX.Element {


                  
    return (
        <div className={`
                            grid grid-cols-[auto_1fr] 
                            w-full m-8 
                       `}
        >
            <div className={`
                                flex items-center justify-center 
                           `}
            >
                <Icon
                    stroke={stroke}
                    height={'6rem'} // or use classes like h-20 for TailwindCSS
                    width={'6rem'}  // or use classes like w-20 for TailwindCSS
                    className='mx-8 hover:animate-wiggle'
                />

            </div>

            <div className={`
                                flex flex-col items-start 
                                p-4 
                           `}
            >

                <h2 className='font-heading text-l mb-1'>{title}</h2>
                <p  className='font-body text-sm'>{copy}</p>

            </div>
        </div>
    );
}



// import { Statement } from '../../../types/info';



// export default function Statement ( { title, copy, icon : Icon } : Statement ) : JSX.Element {




//     return (

//         <div className={`
//                             grid grid-cols-3
//                             w-full 
//                             m-8
//                             border border-blue-500
//                        `}
//         >

//             <div className={`
//                                 col-span-1
//                                 flex items-center justify-center
//                                 border border-orange-500
//                            `}
//             >
//                 <Icon 
//                     stroke={'black'}
//                     height={'100px'}
//                     width={'100px'}
//                     className='mx-8 hover:animate-wiggle'
//                 />
//             </div>

//             <div className={`
//                                 col-span-2
//                                 flex- flex-col items-start
//                                 p-1
//                                 border border-green-500
//                            `}
//             >
//                 <h2 className='font-fontFamilyHeading text-2xl' >{title}</h2>

//                 <p className='font-fontFamilyBody text-md '>{copy}</p>
//             </div>
                

//         </div>

//     )
// }