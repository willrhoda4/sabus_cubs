









import   ImageStrip         from '../../common/images/ImageStrip';

import   Story              from './components/Story';
import   Mission            from './components/Mission';
import   Values             from './components/Values';
import   Actions            from './components/Actions';
import   Board              from './components/BoardRoster';
import   FAQBuffet          from './components/FAQBuffet';

import   useLocationScroll  from '../../hooks/useLocationScroll';

import { Helmet }           from 'react-helmet'



export default function Info (): JSX.Element {   



    useLocationScroll();

    
    return (
        
        <div className={`
                            w-full h-fit
                            flex flex-col
                       `}
        >

            <Helmet>
                <title>Sabu's Cubs – Info</title>
                <meta name='description' content={`Read about our story, values and actions. Then, meet our board and check out our FAQ section.`} />
            </Helmet>


            <div id='story'>
                <Story />
            </div>

            <ImageStrip bgClass='bg-brand-grey' ids={ [ 'loading_cart', 'preparing_smudge', 'ready_to_walk',  ] } />

            <div id='mission'>
                <Mission />
            </div>

            <ImageStrip bgClass='bg-brand-brown' ids={ [ 'soup_stack', 'past_house', 'double_dunk', ] } />
    
            <div id='values'>
                <Values />
            </div>

            <ImageStrip bgClass='bg-brand-yellow'   ids={ [ 'peace_signs', 'the_boys', 'thumbs_up' ] } />

            <div id='actions'>
                <Actions />
            </div>

            <ImageStrip bgClass='bg-brand-blue'   ids={ [ 'maintaining_smudge', 'face_squeeze', 'heres_a_sandwich', ] } />

            <div id='board' className='flex flex-col'>
                <p className='text-title self-start m-4 md:m-10 xl:m-20'>Board</p>
                <Board />
            </div>

            <ImageStrip bgClass='bg-brand-red'   ids={ [ 'jumpshot_right', 'pulling_cart', 'jumpshot_left', ] } />

    
            <div id='faq' className='flex flex-col px-2'>
                <p className='text-title self-end m-20'>FAQ</p>
                <FAQBuffet />
            </div>
    

    
        </div>
    )
}
