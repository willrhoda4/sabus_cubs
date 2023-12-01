









// import   SVGIcon           from "../images/SVGIcon";

import { ButtonArgs,
         ButtonBankProps } from "../../types/button";

// import   deleteIcon        from '../../assets/icon_trash.svg';

// import  useSVGIcon        from "../../hooks/useSVGIcon";




// this one works by accepting arrays of names, icons, onClicks, 
// and conditions, with each index corresponding to a button.
// it might feel a little clunky, but setting it up ends up being a lot more 
// readable than a bunch of objects with a bunch of keys and values. 
export default function ButtonBank ( { names, icons, stroke, onClicks, conditions, wrapStyle, currentState, } : ButtonBankProps ) {
    
   

   
    function button ( ...args : ButtonArgs ) {

        const [ name, Icon, stroke, onClick, thisCondition, index ] = args;    

         

        // this is the class for the button itself.
        // it accepts additional classes as an argument,
        const buttonClass = (plus : string) =>  `  
                                                    rounded-md bg-white 
                                                    m-0.5 
                                                    text-center text-sm font-medium 
                                                    ${ Icon ? 'translate-y-[2px]' : 'translate-y-[-.5px]' }
                                                    hover:bg-gray-100 
                                                    ${plus}
                                                `;

        // if there's no conditions prop or thisCondition argument is null,
        // then the button is always rendered (set condition to true).
        // otherwise, the button is only rendered if the condition is true.
        const condition = !conditions || thisCondition === null ? true : thisCondition; 


        // if there's no icon prop or icon argument is null,
        // then the button is rendered with text.
        // if the condition is false, then some extra x padding 
        // is added to the button to keep the button's width consistent.
        return (<div key={index}>
            {   condition   ?  <button type='button' onClick={onClick} className={buttonClass('px-4')} >

                                        {   Icon    ?  <Icon
                                                            stroke={stroke}
                                                            height={'24'}
                                                            width={'24'}
                                                            className={`transition-all ${name === currentState && 'brightness-50'}`}
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
                            :   <button type='button' className={ buttonClass('px-7') } disabled />
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
                    onClicks.map((_icon, index) => {     const buttonName =                      names[index];
                                                         const buttonIcon =   icons      &&      icons[index];   
                                                         const onClick    =                   onClicks[index];
                                                         const condition  =   conditions && conditions[index]; 

                                                        return button(buttonName, buttonIcon, stroke, onClick, condition, index)
                                                  }
                                )
                }
                {/* {DeleteIcon} */}
            </div>
        </div>
    )
    
}
