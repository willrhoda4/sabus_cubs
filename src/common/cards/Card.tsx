








import { CardProps } from '../../types/notifications';
  


  export default function Card ( { wrapClass, contentClass,  headingClass, heading, children } : CardProps ) {


    return (
      
      <div className={`
                        w-full h-fit 
                        rounded-md 
                        border-2 border-black 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                        ${wrapClass}
                     `}
      >

        <div className={`
                            border-b-2 border-black 
                            text-heading
                            p-4
                            ${headingClass}
                        `}>
          <h2 className="text-lg">{heading}</h2>
        </div>

        <div className={`py-8 px-8 ${contentClass}`}>
            {children}
        </div>


      </div>
    )
  }
  