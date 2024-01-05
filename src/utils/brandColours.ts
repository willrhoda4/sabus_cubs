






/**
 * this function stores a dozen colour objects in the combinations array.
 * these objects consist of tailwind classes based on the organization's brand colours.
 * 
 * if you call it without any argumentsa: brandColours(), it will return the enteire array.
 * 
 * if you call it with the argument 'random': brandColours('random'), it will return a random palette.
 */






export interface BrandColours {
    bg          : string;
    text        : string;
    flipBg      : string;
    flipText    : string;
    icon        : string;
    button      : string;
}


// define overloads to explicitly type the return value
export default function brandColours()                      : BrandColours[];
export default function brandColours(random  : 'random')    : BrandColours;
export default function brandColours(random? : 'random')    : BrandColours | BrandColours[] {

    const combinations : BrandColours[] = [
        {
            bg: 'bg-brand-blue',
            text: 'text-brand-red',
            flipBg: 'bg-brand-red',
            flipText: 'text-brand-blue',
            icon: '#A62826',
            button: 'bg-brand-red',
        },
        {
            bg: 'bg-brand-red',
            text: 'text-brand-blue',
            flipBg: 'bg-brand-blue',
            flipText: 'text-brand-red',
            icon: '#2774AB',
            button: 'bg-brand-blue',
        },
        {
            bg: 'bg-brand-blue',
            text: 'text-brand-grey',
            flipBg: 'bg-brand-grey',
            flipText: 'text-brand-blue',
            icon: '#252D33',
            button: 'bg-brand-grey',
        },
        {
            bg: 'bg-brand-red',
            text: 'text-brand-yellow',
            flipBg: 'bg-brand-yellow',
            flipText: 'text-brand-red',
            icon: '#ABAB27',
            button: 'bg-brand-yellow',
        },
        {
            bg: 'bg-brand-grey',
            text: 'text-brand-blue',
            flipBg: 'bg-brand-blue',
            flipText: 'text-brand-grey',
            icon: '#2774AB',
            button: 'bg-brand-blue',
        },
        {
            bg: 'bg-brand-blue',
            text: 'text-brand-yellow',
            flipBg: 'bg-brand-yellow',
            flipText: 'text-brand-blue',
            icon: '#ABAB27',
            button: 'bg-brand-yellow',
        },
        {
            bg: 'bg-brand-red',
            text: 'text-brand-grey',
            flipBg: 'bg-brand-grey',
            flipText: 'text-brand-red',
            icon: '#252D33',
            button: 'bg-brand-grey',
        },
        {
            bg: 'bg-brand-yellow',
            text: 'text-brand-red',
            flipBg: 'bg-brand-red',
            flipText: 'text-brand-yellow',
            icon: '#A62826',
            button: 'bg-brand-red',
        },
        {
            bg: 'bg-brand-grey',
            text: 'text-brand-yellow',
            flipBg: 'bg-brand-yellow',
            flipText: 'text-brand-grey',
            icon: '#ABAB27',
            button: 'bg-brand-yellow',
        },
        {
            bg: 'bg-brand-yellow',
            text: 'text-brand-blue',
            flipBg: 'bg-brand-blue',
            flipText: 'text-brand-yellow',
            icon: '#2774AB',
            button: 'bg-brand-blue',
        },
        {
            bg: 'bg-brand-grey',
            text: 'text-brand-red',
            flipBg: 'bg-brand-red',
            flipText: 'text-brand-grey',
            icon: '#A62826',
            button: 'bg-brand-red',
        },
        {
            bg: 'bg-brand-yellow',
            text: 'text-brand-grey',
            flipBg: 'bg-brand-grey',
            flipText: 'text-brand-yellow',
            icon: '#252D33',
            button: 'bg-brand-grey',
        }
    ];

    
    if ( random ) { return combinations[ Math.floor( Math.random() * combinations.length ) ] }

    else          { return combinations;                                                     }
}
