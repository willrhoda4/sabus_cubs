



/**
 * 
 * Accordian component for FAQ page
 */




import { useEffect, 
         useRef, 
         useState } from 'react'

import { FAQProps } from '../../../types/info';

export default function FAQAccordian( { id, question, answer, displayed, setDisplayed } : FAQProps ) {


    /**
     * answerHeight tracks the height of the answer div.
     * contentRef is used to get the height of the answer div.
     * open is a boolean that tracks whether the drawer is open or not.
     */ 
    const [ answerHeight, setAnswerHeight ] = useState(0); // Store the height as a number
    const   contentRef                      = useRef<HTMLDivElement>(null);
    const   open                            = displayed === id;


    // updates answerHeight whenver drawer opens/closes
    useEffect(() => {

        if (contentRef.current) {
            // Directly set height as a number
            setAnswerHeight( open ? contentRef.current.scrollHeight : 0 );
        }

    }, [ open ]);


    return ( 

        //  wrapper component.
        //  dictates the FAQ shadow and shape.
        <div className={`
                            w-full max-w-4xl
                            my-8
                            rounded-md 
                            border-2 border-black 
                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                       `}
        >

            {/* the entire question is a button,
                until it's opened.
                we'll add a small bottom border when this occurs */}
            <button
                role='button'
                className={`
                                flex items-center justify-between 
                                w-full p-5 
                                font-bold bg-brand-red text-white
                                ${ open && 'border-b-2 border-black'}
                          `}
                onClick={ !open ? () => setDisplayed(id)
                                : () => setDisplayed(false)
                        }
            >
                {question}
                    
                {/* the plus sign will transform to an x by
                    rotating 45 degrees when the question is open */}
                <p 
                    className={`
                                    mr-4 
                                    text-2xl 
                                    transition-transform ease-in-out
                                    ${ open && 'rotate-45' }
                              `}
                >+</p>
            </button>

            


            {/* the answer is hidden until the drawer opens.
                we use inline styles here to make the animation work.
                the ref is necessary to trigger the effect hook that sets answerHeight. */}
            <div
                      ref={   contentRef }
                    style={ { height: open ? `${answerHeight}px` : '0px', }} 
                className={`
                                w-full
                                overflow-hidden
                                transition-all
                                duration-400 ease-in-out
                          `}
                >
               <p className='p-5 font-body'>{answer}</p>
            </div>

        </div>

               

    )

}



