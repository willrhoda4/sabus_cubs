










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

            <p className='text-title self-end mb-20'>Mission</p>

            <div className={`
                                text-heading 
                                self-center 
                                m-8
                           `}>
                <p>{ copy('mission1', 'string') }</p>
                <p>{ copy('mission2', 'string') }</p>
            </div>

          


        </div>
    )
}