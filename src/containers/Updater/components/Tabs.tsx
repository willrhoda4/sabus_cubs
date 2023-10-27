












type TabsProps = {

    tabsArray       : string[]
    activeTab       : string
    setActiveTab    : React.Dispatch<React.SetStateAction<string>>
  }
  

  
  export default function Tabs ({ tabsArray, activeTab, setActiveTab } : TabsProps) {



      
    const bgColor  = ( isActive : boolean ) => { return isActive ? 'bg-purple-600' : 'bg-purple-400'; };



    return (

        <div className={`flex w-full`}>

            {tabsArray.map((tab, index) => {

                return (

                    <button
                            key={index}
                        onClick={() => setActiveTab(tab)}
                        className={`
                                        w-full
                                        cursor-pointer 
                                        border-2 border-black 
                                        px-6 py-3 
                                        text-center font-bold 
                                        transition-colors 
                                        ${bgColor(activeTab === tab)}
                                        ${index === 0 ? 'rounded-tl-md' : ''} 
                                        ${index === tabsArray.length - 1 ? 'rounded-tr-md' : ''}
                                `}
                    >
                        {tab}
                    </button>
                )
            } ) }
        </div>
    );
}
  
  