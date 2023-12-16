




import { ButtonProps } from '../../types/button'

import   useStyles     from '../../hooks/useStyles';









    
// flexible button component
export default function Button ( { text, onClick, theme = 'neobrutalism', styles } : ButtonProps ) : JSX.Element {


    const buttonTheme  = useStyles(theme);

    const buttonStyle  = buttonTheme.button?.();

    return (    <button     
                      onClick={ onClick } 
                      className={`${buttonStyle || ''} ${styles || ''}`}

                > {text}</button>                     
    
    );
}
       

