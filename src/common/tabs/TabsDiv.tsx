






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
                            w-full max-w-6xl h-fit 
                            rounded-md 
                            border-2 border-black 
                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
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
                                px-2 xl:px-8 py-12 
                                flex flex-col items-center
                           `}
            >
                { children }
            </div>            
        </div>
    );
}

