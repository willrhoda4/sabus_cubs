

/**
 * this component is responsible for rendering the 'Friends of Sabu's Cubs' section of the footer
 * the map function is setup to handle conditional placeholders for the grid layout,
 * allowing for symmetrical appearance on all screen sizes.
 * 
 * since we have 12 friends, this isn't necessary, but if we wanted to have 10, 
 * for example, we'd setup the friends array like this:
 * 
 * const friends = [

        <div id='placeholder' className='hidden md:block' />,
        OPKMB,
        <div id='placeholder' className='hidden md:block lg:hidden' />,
        fourSacredHearts,
        <div id='placeholder' className='hidden lg:block' />,
        careKits,
        takePrideWPG,
        gonzaga,
        directFocus,
        stPauls,
        cropo,
        superiorPropane,
        timHortons
    ]
 * 
 */




import React                from 'react';

import careKits             from '../../../assets/friends/care_kits.jpeg';
import directFocus          from '../../../assets/friends/direct_focus.svg';
import gonzaga              from '../../../assets/friends/gonzaga.png';
import OPKMB                from '../../../assets/friends/opk_mb.png';
import stPauls              from '../../../assets/friends/st_pauls.png';
import takePrideWPG         from '../../../assets/friends/take_pride_wpg.jpeg';
import timHortons           from '../../../assets/friends/tim_hortons.png';  
import communityHelpers     from '../../../assets/friends/community_helpers_unite.jpeg';
import NECRC                from '../../../assets/friends/NECRC.jpeg';
import wiigiishin           from '../../../assets/friends/wiigiishin.jpg';




export default function Friends () : JSX.Element {



    const friends = [

        <div id='placeholder' className='hidden md:block' />,
        OPKMB,
        <div id='placeholder' className='hidden md:block lg:hidden' />,
        wiigiishin,
        <div id='placeholder' className='hidden lg:block' />,
        careKits,
        NECRC,
        communityHelpers,
        takePrideWPG,
        gonzaga,
        directFocus,
        stPauls,
        timHortons
    ]




    return (

        <div className={`
                            w-full h-fit
                            py-24 px-8
                            flex flex-col items-center 
                       `}
        >
            
            <p className='text-heading text-center  text-brand-red'>Friends of Sabu</p>

            <p className='text-body text-center my-16'>We're grateful to be supported by all of these amazing organizations.</p>

            <div className={`
                                w-1/2 
                                h-fit
                                grid gap-8
                                grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                                md:
                           `}
            >
                {
                    friends.map((friend, index) => {

                        // Check if 'friend' is a JSX element of type 'div'
                        // If it is a 'div', it's a placeholder, so just return it
                        if (React.isValidElement(friend) && friend.type === 'div') { return friend; } 
                        

                        // If it's not a 'div', it's an image
                        else {

                            return (
                                <div key={`friend-${index}`} className='h-32 flex justify-center items-center'>
                                    <img 
                                        alt={`friend-${index}`} 
                                        src={friend as string} 
                                        className='h-3/4 w-auto object-contain' 
                                    />
                                </div>
                            );
                        }
                    } ) 
                }
            </div>

        </div>

    )
}