










import { useState,
         useEffect,
         useRef      } from 'react';

interface AmountSelectorProps {
    amount:      number,
    setAmount:   React.Dispatch<React.SetStateAction<number>>,
    wrapStyles?: string
}



export default function AmountSelector ( { amount, setAmount, wrapStyles } : AmountSelectorProps ) {



    const [ custom,    setCustomn   ]     = useState<boolean>(false);

    const   amounts : (number|'custom')[] = [ 5, 10, 20, 50, 100, 200, 500, 'custom' ];

    const   focusRef                      = useRef<HTMLInputElement>(null); 


    
    // focus on custom input when it is activated
    useEffect(() => {

        if (custom) { focusRef.current?.focus(); }
        
    }, [custom]);



    
    function selectorButton ( value : number | 'custom' ) : JSX.Element {


        // click handler for selector buttons
        function handleClick( e: React.MouseEvent<HTMLButtonElement> ) {



            // Prevent the default action and stop propagation of the event
            e.preventDefault();
            // e.stopPropagation();



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
        const selected = custom ? value ==='custom'
                                : value === amount;

        return (

            <button
                      key={ value }
                className={`
                                font-heading
                                w-28
                                p-1
                                border-2 border-black
                                ${ selected && 'text-brand-red' }
                          `}
                   onClick={ handleClick }
            >
                {
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
                                                                className={`w-16 h-12 outline-0`}
                                                                />
                                                        </div>

                                                    :  `${ value !== 'custom' ? '$' : '' }${ value }`
                                                    
                }
            </button>
        );
    }



    return (

        <div className={wrapStyles}>


                <div className={`
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





