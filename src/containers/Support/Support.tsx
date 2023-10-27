







import   ButtonBank   from '../../common/buttons/ButtonBank';

import   ItemsList    from './components/ItemsList';
import   Donate       from './components/Donate';

import { useState   } from 'react';




export default function Support(): JSX.Element {




    type DisplayedState = 'donate' | 'volunteer' | 'supplies' | 'fundraisers';

    type ButtonAction   = () => void;



    const [ displayed, setDisplayed ] = useState<DisplayedState>('donate');

    const   display = (component : DisplayedState) => () => setDisplayed(component);

    const   buttonNames     : string[]       = [         'donate',          'volunteer',          'supplies',          'fundraisers'  ];
    const   buttonFunctions : ButtonAction[] = [ display('donate'), display('volunteer'), display('supplies'), display('fundraisers') ];

    
    return (
                   
        <div>

            <ButtonBank
                names={      buttonNames      }
                onClicks={   buttonFunctions  }
            />

        
            {   
                displayed === 'supplies'    ? <ItemsList  />       
            :   displayed === 'donate'      ? <Donate     />       
            :                                <p>{`donate ${displayed}`}</p>    
            }


        </div>);
}
