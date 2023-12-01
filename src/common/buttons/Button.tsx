




import { ButtonProps } from '../../types/button'

import   useStyles     from '../../hooks/useStyles';









    
// flexible button component
export default function Button ( { text, onClick, style = 'neobrutalism' } : ButtonProps ) : JSX.Element {


    const theme        = useStyles(style);

    const buttonStyle  = theme.button?.();

    return (    <button     
                      onClick={ onClick } 
                    className={ buttonStyle }

                > {text}</button>                     
    
    );
}
       

