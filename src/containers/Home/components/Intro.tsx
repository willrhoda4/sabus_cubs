








import copy from '../../../assets/copy';





// simple intro blurb component for home page
export default function Intro () : JSX.Element {



    return (

        <div className={`
                        w-full h-fit
                        mb-24
                        flex flex-col items-center
                     `}
      >
        <h1 className={` 
                          text-title 
                          leading-[4.5rem]
                          text-center
                       `}>Sabu's Cubs</h1>
       
        { copy('intro', 'mx-2 max-w-3xl text-center') }

      </div>

    )
}