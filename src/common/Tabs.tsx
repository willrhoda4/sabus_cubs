












type TabsProps = {

    tabsArray       : string[]
    activeTab       : string
    setActiveTab    : React.Dispatch<React.SetStateAction<string>>
    bgClass?        : string
    textClass?      : string
  }
  

  
  export default function Tabs ( { tabsArray, activeTab, setActiveTab, bgClass, textClass } : TabsProps ) {



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
                                        py-3 
                                        text-center font-bold 
                                        transition-colors 
                                        ${ textClass  ?? 'text-black' }
                                        ${ bgClass    ?? 'bg-white'   }
                                        ${ activeTab === tab && 'opacity-75 ' }
                                        ${ index === 0 ? 'rounded-tl-md' : '' } 
                                        ${ index === tabsArray.length - 1 ? 'rounded-tr-md' : '' }
                                  `}
                    >
                        {tab}
                    </button>
                )
            } ) }
        </div>
    );
}
  
  