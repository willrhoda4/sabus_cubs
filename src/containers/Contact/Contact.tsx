







import   Map             from './components/Map';
import   EmailForm       from './components/EmailForm';
import   Social          from './components/Social';
import   ButtonBank      from '../../common/buttons/ButtonBank';

import { useState }      from 'react';




export default function Contact(): JSX.Element {

    type DisplayedState = 'email' | 'social' | 'map';

    type ButtonAction   = () => void;



    const [ displayed, setDisplayed ] = useState<DisplayedState>('map');


    const buttonNames     : string[]       = [      'map',                     'email',                     'social'                ];
    const buttonFunctions : ButtonAction[] = [ () => setDisplayed('map'), () => setDisplayed('email'), () => setDisplayed('social') ];
    
    
    return (<>

        <ButtonBank
            names={      buttonNames      }
            onClicks={   buttonFunctions  }
        />

        {/* render based on displayed. If sonmething goes wrong with state, 
            just give them the email form. */}
        {   
             displayed === 'map'    ? <Map       />       
          :  displayed === 'social' ? <Social    />    
          :                           <EmailForm /> 
        }


    </>);
}