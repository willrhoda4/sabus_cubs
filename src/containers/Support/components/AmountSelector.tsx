



/**
 * simple display component to pick an amount to donate.
 * 
 * it's a 2x4 grid of buttons, with the last one being a custom input.
 * 
 * click custom, and the input appears. click a button, and the input disappears.
 * 
 * it accepts an amount state and setter from its parent, 
 * and a wrapStyles prop, which is a string of tailwind classes to apply to the wrapper div.
 */






import { useState,
         useEffect,
         useRef      } from 'react';

interface AmountSelectorProps {
    amount:      number,
    setAmount:   React.Dispatch<React.SetStateAction<number>>,
    wrapStyles?: string
}



export default function AmountSelector ( { amount, setAmount, wrapStyles } : AmountSelectorProps ) {


    // state to display the custom input
    const [ custom,    setCustomn   ]     = useState<boolean>(false);

    // array of pre-set amounts
    const   amounts : (number|'custom')[] = [ 5, 10, 20, 50, 100, 200, 500, 'custom' ];

    // ref for the custom input. used to focus on it when it appears.
    const   focusRef                      = useRef<HTMLInputElement>(null); 



    
    // focus on custom input when it is activated
    useEffect(() => {

        if (custom) { focusRef.current?.focus(); }
        
    }, [custom]);



    // helper function to render the buttons
    function selectorButton ( value : number | 'custom' ) : JSX.Element {


        // click handler for selector buttons
        function handleClick( e: React.MouseEvent<HTMLButtonElement> ) {



            // Prevent the default action and stop propagation of the event
            e.preventDefault();


            if (value === 'custom') {   // activating custom input
                                        setAmount(0);
                                        setCustomn(true);
                                    } 
            else                    {   // selecting a pre-set amount amount
                                        setAmount(value);
                                        setCustomn(false);
                                    }
        }

        // whether or not this button is selected
        // we use this to apply the selected styles
        const selected = custom ? value ==='custom'
                                : value === amount;

        return (

            <button
                      key={ value }
                className={`
                                font-heading
                                text-2xl md:text-4xl 
                                w-20 md:w-32
                                px-1 py-4
                                border-2 border-black
                                ${ selected && 'text-brand-red' }
                          `}
                   onClick={ handleClick }
            >
                {                                       // if the value is 'custom', render the custom inputhttps://arstechnica.com/gadgets/2023/12/google-podcasts-dies-april-2024-youtube-music-migration-tool-goes-live/
                    custom && value === 'custom'  ?     <div className='flex w-full justify-center'>
                                                            <p>$</p>
                                                            <input
                                                                     ref={focusRef}
                                                                   value={ amount }
                                                                onChange={ e =>   {
                                                                                    const val = e.target.value;
                                                                                    // Regular expression to allow only digits
                                                                                    /^\d*$/.test(val) && setAmount(Number(val));
                                                                                  }
                                                                          }
                                                                className={`w-full h-auto outline-0`}
                                                                />
                                                        </div>
                                                        // prepend a $ to the value if it's not 'custom'
                                                    :  `${ value !== 'custom' ? '$' : '' }${ value }`
                                                    
                }
            </button>
        );
    }



    return (

        <div className={wrapStyles}>

                <div className={`
                                    w-full
                                    grid gap-0
                                    grid-cols-4 grid-rows-2 
                                    border-4 border-black
                                    z-10
                               `}
                >
                    { amounts.map( amount => selectorButton( amount ) ) }
                </div>

        </div>
    );
}





