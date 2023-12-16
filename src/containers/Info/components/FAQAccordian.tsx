








import { useEffect, useRef, useState } from 'react'

type FAQProps = {
    id              : number    
    question        : string
    answer          : string
    displayed       : false | number
    setDisplayed    : (id: false | number) => void
}

export default function FAQAccordian( { id, question, answer, displayed, setDisplayed } : FAQProps ) {


        
    const [answerHeight, setAnswerHeight] = useState(0); // Store the height as a number
    const contentRef = useRef<HTMLDivElement>(null);
    const open = displayed === id;

    useEffect(() => {
        if (contentRef.current) {
            // Directly set height as a number
            setAnswerHeight(open ? contentRef.current.scrollHeight : 0);
        }
    }, [open]);


    return ( 

        <div className={`
                            w-full max-w-4xl
                            my-8
                            rounded-md 
                            border-2 border-black 
                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                       `}
        >

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
                <p 
                    className={`
                                    mr-4 
                                    text-2xl 
                                    transition-transform ease-in-out
                                    ${ open && 'rotate-45' }
                              `}
                >+</p>
            </button>

            



            <div
                      ref={   contentRef }
                    style={ { height: open ? `${answerHeight}px` : '0px', }} 
                className={`
                                w-full
                                overflow-hidden
                                transition-[height]
                                duration-400 ease-in-out
                                ${ open ? `height-[${answerHeight}]` : 'height-0' }
                          `}
                >
               <p className='p-5 font-body'>{answer}</p>
            </div>

        </div>

               

    )

}



