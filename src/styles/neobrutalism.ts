








import { StyleFunctions,
         StyleArgObject   } from '../types/styles';




const neobrutalism : StyleFunctions = {  

    button: () => `
        flex items-center 
        cursor-pointer 
        rounded-md 
        border-2 border-black
        px-10 py-3 
        font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        transition-all 
        hover:translate-x-[3px] 
        hover:translate-y-[3px] 
        hover:shadow-none
    `,



    input: (args? : StyleArgObject) => `
        w-full min-w-[10rem]
        p-1
        rounded-md 
        border-2 ${args && args.error ? 'border-brand-red' : 'border-black'} 
        ${args && args.type === 'textArea' && 'min-h-[20rem]'}
        font-bold 
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none 
        transition-all 
        focus:translate-x-[3px] 
        focus:translate-y-[3px] 
        focus:shadow-none
    `,


    menuWrapper: () => `
        flex
        fixed bottom-0 left-0
        z-10
        w-1/2 h-[calc(100vh-5rem)]
        
    `,

    // for convenience, we'll use these styles to target the main menu's children as well.
    // the last-child rule is to make sure the border makes it all the way down the screen.
    // to make this work, we'll add a dummy div at the end of the main menu.
    mainMenu: () => `
    flex flex-col
    w-8/12 h-full
    bg-white
    font-heading
        child:cursor-pointer
        child:w-full child:h-fit
        child:px-4 child:py-6
        child:border-black
        child:border-b-4 child:border-r-4
        child-hover:border-r-0
        child-hover:bg-brand-blue
        child-hover:text-brand-yellow
        child:last-child:h-full
`,

    subMenu: () => `
        w-4/12 h-full
        flex flex-col items-center
        border-r-4 border-black
        bg-brand-blue
    `



};


export default neobrutalism