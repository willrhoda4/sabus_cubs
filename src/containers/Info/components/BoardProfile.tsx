


import CloudImg from '../../../common/images/CloudImg';

import { BoardMember } from '../../../types/info';



export default function boardProfile (boardMember: BoardMember) : JSX.Element {

    const { full_name , title, bio, public_id, id } = boardMember;

    return (

        <div       key={id as number}
             className={`
                            flex items-center
                            h-60 w-1/2
                            p-4 m-4
                            border
                       `}
        >

            <CloudImg id={public_id as string} wrapStyle={`h-auto w-1/2`} />

            <div className={`
                                flex flex-col
                                h-full w-1/2
                                border
                           `}
            >
                <h3 className='h-1/4'>{ full_name as string }</h3>
                <h4 className='h-1/4'>{ title     as string }</h4>
                <p  className='h-1/2'>{ bio       as string }</p>
            </div>

        </div>

    )
}