







export default function Mission ({text}:{text:string}): JSX.Element {




    return (

        <div className={`
                            w-full h-fit
                            flex items-center justify-center
                            p-12
                       `}
        >

            <p className={`
                                text-2xl
                                text-center
                                text-white
                                font-bold
                                first-letter:text-8xl
                                first-letter:leading-3
                                bg-red-300
                                p-12
                           `}
            >{text}</p>


        </div>


    )
}