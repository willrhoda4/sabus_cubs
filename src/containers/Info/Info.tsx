








                   


import   ImageStrip         from '../../common/images/ImageStrip';

import   Story              from './components/Story';
import   Mission            from './components/Mission';
import   Values             from './components/Values';
import   Actions            from './components/Actions';
import   Board              from './components/BoardRoster';
import   FAQBuffet          from './components/FAQBuffet';

import   useLocationScroll  from '../../hooks/useLocationScroll';
// import   useScrollToUrlParam  from '../../hooks/useScrollToURLParam';




export default function Info (): JSX.Element {


    useLocationScroll();
    // useScrollToUrlParam('section');

    return (
        
        <div className={`
                            w-full h-fit
                            flex flex-col
                       `}
        >

            <div id='story'>
                <Story />
            </div>

            <ImageStrip bgClass='bg-brand-grey' ids={ [ 'loading_cart', 'preparing_smudge', 'ready_to_walk',  ] } />

            <div id='mission'>
                <Mission />
            </div>

            <ImageStrip bgClass='bg-brand-brown' ids={ [ 'sandwich_pass', 'double_dunk', 'past_house', ] } />
    
            <div id='values'>
                <Values />
            </div>

            <ImageStrip bgClass='bg-brand-yellow'   ids={ [ 'peace_signs', 'teeter_totter', 'the_boys', ] } />

            <div id='actions'>
                <Actions />
            </div>

            <ImageStrip bgClass='bg-brand-grey'   ids={ [ 'maintaining_smudge', 'face_squeeze', 'heres_a_sandwich', ] } />

            <div id='board' className='flex flex-col'>
                <p className='font-title self-start m-20'>Board</p>
                <Board />
            </div>

            <ImageStrip bgClass='bg-brand-red'   ids={ [ 'jumpshot_right', 'pulling_cart', 'jumpshot_left', ] } />

    
            <div id='faq_buffet' className='flex flex-col'>
                <p className='font-title self-end m-20'>FAQ</p>
                <FAQBuffet />
            </div>
    

    
        </div>
    )
}
