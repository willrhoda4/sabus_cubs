










import copy from '../../../assets/copy';





export default function Mission () : JSX.Element {




    return (

        <div className={`
                            w-full h-fit
                            flex  flex-col
                            pt-20 px-12 pb-40
                            bg-brand-blue
                            text-brand-yellow
                       `}
        >

            <p className='font-title self-end mb-20'>Mission</p>

            <p className={`font-heading self-center m-8`}>{ copy('mission', 'string') }</p>

          


        </div>
    )
}