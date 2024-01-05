







import ErrorCard   from '../cards/ErrorCard';
import logo        from '../../assets/logo_large.png';
import Button      from '../buttons/Button';



interface FallbackProps {
    title   : string;
    text    : string;
}




export default function Fallback ( { title, text } : FallbackProps ) : JSX.Element {



    return (

       <div className={`
                            w-screen h-fit
                            px-2
                            flex flex-col justify-center items-center 
                            bg-white
                      `}
        >
           

            <img 
                    src={logo} 
                    alt={`Sabu's Cubs logo`} 
                className={`
                            h-auto 
                            w-2/12 min-w-[150px] max-w-[200px]
                            mt-12 mb-4
                        `}
            />


            <a 
                href='http://localhost:5173/'
                className='mb-8'
            >
                <Button text="Back to Home" />
            </a>


            <ErrorCard title={title} text={text} />

        </div>
    )
}