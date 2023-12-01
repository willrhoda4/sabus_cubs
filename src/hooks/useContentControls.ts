



/**
 * This guy's only real job in life is delivering a bag of tools
 * to ContentRack's renderContent prop.
 * 
 * editing typically used for admin dashboard pages, denoting which item in a data set is being edited
 * displayed can be used for FAQs and similar where you want them to pop open one at a time.
 * getData is the function that will be called to refresh the data set
 * dataSize is the length of the data set, which is passed as a prop to EditorButtons
 */





import { useState } from 'react';





export default function useContentControls( getData : () => void, dataSize : number ) {

    const   [   editing,    setEditing    ] = useState<number | false>(false);
    const   [   displayed,  setDisplayed  ] = useState<number | false>(false);

    return  { 
                editing,    setEditing,     
                displayed,  setDisplayed,   
                dataSize,   getData
            };
}