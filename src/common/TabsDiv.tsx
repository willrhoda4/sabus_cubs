






import Tabs from './Tabs'; 




interface TabsDivProps {

    id?            : string;
    tabsArray      : string[];
    activeTab      : string;
    setActiveTab   : React.Dispatch<React.SetStateAction<string>>;
    bgClass?       : string
    textClass?     : string
    children       : React.ReactNode;
}

export default function TabsDiv( { tabsArray, activeTab, setActiveTab, children, bgClass, textClass } : TabsDivProps ) {


    return (

        <div className={`
                            w-full max-w-6xl h-fit px-2
                       `}
        >

            <Tabs 
                   tabsArray={tabsArray} 
                   activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                     bgClass={bgClass}
                   textClass={textClass}
            />


            <div className={`
                                w-full h-fit 
                                py-12 
                                border-4 border-black 
                                flex flex-col items-center
                           `}
            >
                { children }
            </div>            
        </div>
    );
}
