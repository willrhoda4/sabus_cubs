









// shared type alias for common button arguments
type ButtonArgs = [ 
                        string, 
                        SvgIcon | null, 
                        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, 
                        boolean | null | undefined,
                        number

                  ];

//  intersectiomn type for the button function
// type ButtonFunctionArgs = ButtonArgs & number; // Add the index argument



// Define a type or interface for an SVG icon
interface SvgIcon {
    svgContent: string;
    key?: string;
  }


// catalogue prop types for the component
interface ButtonBankProps {
    
    names         : string[];
    icons?        : SvgIcon[];
    onClicks      : ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)[];
    conditions?   : boolean[];
    wrapStyle?    : string;
    currentState? : string;
    
}


// this one works by accepting arrays of names, icons, onClicks, 
// and conditions, with each index corresponding to a button.
// it might feel a little clunky, but setting it up ends up being a lot more 
// readable than a bunch of objects with a bunch of keys and values. 
export default function ButtonBank ({names, icons, onClicks, conditions, wrapStyle, currentState} : ButtonBankProps) {
    
   
   
    function button (...args : ButtonArgs) {

        const [name, icon, onClick, thisCondition, index] = args;    //this error here: Type 'never' must have a '[Symbol.iterator]()' method that returns an iterator.ts(2488)

         

        // this is the class for the button itself.
        // it accepts additional classes as an argument,
        const buttonClass = (plus : string) =>  `  
                                                    rounded-md bg-white 
                                                    m-0.5 
                                                    text-center text-sm font-medium 
                                                    ${ icon ? 'translate-y-[2px]' : 'translate-y-[-.5px]' }
                                                    hover:bg-gray-100 
                                                    ${plus}
                                                `;

        // if there's no conditions prop or thisCondition argument is null,
        // then the button is always rendered (set condition to true).
        // otherwise, the button is only rendered if the condition is true.
        const condition = !conditions || thisCondition == null ? true : thisCondition; 


        // if there's no icon prop or icon argument is null,
        // then the button is rendered with text.
        // if the condition is false, then some extra x padding 
        // is added to the button to keep the button's width consistent.
        return (<div key={index}>
            {   condition   ?  <button type='button' onClick={onClick} className={buttonClass('px-4')} >

                                        {   icon    ?   <img alt={name+'icon'} 
                                                             src={icon.svgContent}              
                                                             className={ currentState === name ? 'transition-all brightness-50' 
                                                                                               : 'transition-all'
                                                                        }
                                                        />
                                                    :   <p className={ `    transition-colors 
                                                                            translate-y-[-2px]
                                                                            ${ name === currentState ? 'text-black' 
                                                                                                     : 'text-gray-300' 
                                                                             }
                                                                      `}
                                                        >{name}</p>
                                        }
                                    </button>
                            :   <button type='button' className={buttonClass('px-7')} />
            }
        </div>)
    }



    // we'll render based on onClicks, since it
    // (and names) should always be the right length.
    // use ternaries to check if the other props exist.
    return (
        <div className={wrapStyle}>
            <div className='    w-fit
                                rounded-lg border border-gray-300 
                                shadow-sm
                                flex items-center
                        '
            >
                {   onClicks.length !== 0 &&
                    onClicks.map((icon, index) => {     const buttonName =                     names[index];
                                                        const buttonIcon =   icons      ?      icons[index] : null;  
                                                        const onClick    =                  onClicks[index];
                                                        const condition  =   conditions ? conditions[index] : null;

                                                        return button(buttonName, buttonIcon, onClick, condition, index)
                                                  }
                                )
                }
            </div>
        </div>
    )
    
}
