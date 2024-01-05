

/**
 * renders a statement to feeed the Statements component
 */



import { Statement as StatementType } from '../../../types/info';




export default function Statement( { title, copy, icon: Icon, stroke = 'black'} : StatementType) : JSX.Element {


    // everything will be in a column and centered for small screens.
    // when we get to large screens, we'll put the icon and text-alignment on the left             
    return (

        <div className={`
                            flex flex-col lg:flex-row items-center
                            w-full
                       `}
        >
                <Icon
                    stroke={stroke}
                    height={'60px'}
                    width={'60px'} 
                    className='mx-8 shrink-0 grow-0'
                />


            <div className={`
                                flex flex-col items-center lg:items-start
                                max-w-[400px]
                                text-center lg:text-left
                                p-4 
                           `}
            >

                <h2 className='font-heading text-4xl mb-1'>{title}</h2>
                <p  className='font-body text-l'>{copy}</p>

            </div>
        </div>
    );
}


