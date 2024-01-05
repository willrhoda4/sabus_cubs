


import   CloudImg      from '../../../common/images/CloudImg';

import { BoardMember } from '../../../types/info';



export default function boardProfile (boardMember: BoardMember) : JSX.Element {

    const { full_name , title, bio, public_id, id } = boardMember;

    return (

        <div       key={id as number}
             className={`
                            flex flex-col items-center
                            h-fit w-full max-w-lg
                       `}
        >

            <CloudImg id={public_id as string} wrapStyle={`h-auto w-full`} />

            <h3 className='font-heading text-4xl mt-2'>{ full_name as string }</h3>
            <h4 className='font-body font-bold text-l mb-4'>{ title     as string }</h4>
            <p  className='font-body text-md'>{ bio       as string }</p>

        </div>

    )
}