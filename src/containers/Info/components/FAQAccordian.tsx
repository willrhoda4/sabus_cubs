








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
                            w-3/4
                            m-8
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
               <p className="p-5">{answer}</p>
            </div>

        </div>

               

    )

}






{/* 
import { useEffect, useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

type Props = {
  question: string
  answer: string
}

export default function Accordion({ question, answer }: Props) {
  const [showContent, setShowContent] = useState(false)
  const [contentHeight, setContentHeight] = useState('0px')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`)
    }
  }, [showContent])

  return (

    <div className="w-[500px] rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">

      <button
        role="button"
        aria-expanded={showContent}
        style={{ borderBottom: showContent ? 'solid 2px' : '0px' }}
        className="flex w-full items-center justify-between rounded-[5px] border-black bg-[#bc95d4] p-5 font-bold"
        onClick={() => {
          setShowContent(!showContent)
        }}
      >
        {question}
        <FiPlus
          style={{ transform: `rotate(${showContent ? '45deg' : '0'})` }}
          className="ml-4 min-h-[24px] min-w-[24px] transition-transform ease-in-out"
        />
      </button>

      <div
        ref={contentRef}
        style={{ height: showContent ? `${contentHeight}` : '0' }}
        className="overflow-hidden rounded-[5px] bg-white font-bold transition-[height] ease-in-out"
      >
        <p className="p-5">{answer}</p>
      </div>

    </div>
  )
} */}











// import { useState, 
//     useRef, 
//     useEffect } from 'react';






// type FAQProps = {
// id              : number    
// question        : string
// answer          : string
// displayed       : false | number
// setDisplayed    : (id: false | number) => void
// }




// export default function FAQAccordion( { id, question, answer, displayed, setDisplayed  }: FAQProps ) {


// const [ height,      setHeight] = useState(0);
// const   contentRef              = useRef<HTMLDivElement | null>(null);



// useEffect(() => {

//    displayed === id  &&
//    contentRef.current ? setHeight(contentRef.current.scrollHeight)
//                       : setHeight(0);
   
// }, [displayed, id]);



// return (

//    <div className={`
//                        w-full h-fit 
//                        m-8 
//                        rounded-md 
//                        border-2 border-black 
//                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
//                   `}
//    >
//        <button
//                 role='button'
//              onClick={ () => setDisplayed(displayed !== id ? id : false) }
//            className={`
//                            flex items-center justify-between 
//                            w-full p-5 
//                            font-bold 
//                            bg-brand-red text-white
//                      `}
//        >
//            {question}
//            <p className={`
//                            ml-4 
//                            min-h-[24px] min-w-[24px] 
//                            transition-transform ease-in-out 
//                            ${displayed === id && 'rotate-45' }
//                         `}
//            >+</p>
//        </button>

//        <div
//            ref={contentRef}
//            className={`
//                            w-full 
//                            overflow-hidden 
//                            transition-height 
//                            ease-in-out duration-4000
//                      `}
//                 style={ { height: height } }
//        >
//            <p className="p-5">{answer}</p>
//        </div>
//    </div>
// );
// }