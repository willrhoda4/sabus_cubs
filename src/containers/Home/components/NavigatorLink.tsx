







import brandColours from '../../../utils/brandColours';

import { useNavigate } from 'react-router-dom';



interface NavigatorLinkProps {
    data  : {
                icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
                name: string,            
            },
    index : number,

}

export default function NavigatorLink ( { index, data } : NavigatorLinkProps ) : JSX.Element {



    
    const navigate = useNavigate();

    const colours  = brandColours();  

    const palettes = [ 5, 6, 7, 8, 0, 1 ];

    const handleClick =  () => data.name === 'donate' ? navigate('/support',     { state: { id: 'donate' } } )
                                                      : navigate(`/${data.name}`                             );
   


    return (


        <button
            onClick={ handleClick }
          className={`
                        w-full h-full
                        flex flex-col items-center justify-center 
                        py-12
                        ${ colours[palettes[index]].bg }
                        hover:bg-opacity-10
                    `}
        >
            <data.icon 
                style={{ color: colours[palettes[index]].icon }}
                height='60px'
                width='60px'
                className='x-1 px-2 hover:animate-wiggle'
            />
            <p className={`${colours[palettes[index]].text}`}>{data.name}</p>
        </button>

    )
}