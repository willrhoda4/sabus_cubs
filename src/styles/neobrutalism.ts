    







import { StyleFunctions, StyleArgObject } from '../types/styles';






const neobrutalism: StyleFunctions = {

    button: () => `
        w-fit
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



    input: (args?: StyleArgObject) => `
        w-full min-w-[10rem]
        p-1
        rounded-md
        border-2 ${args?.error ? 'border-brand-red' : 'border-black'}
        ${args?.type === 'textArea' ? 'min-h-[20rem]' : ''}
        font-bold
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none
        transition-all
        focus:translate-x-[3px]
        focus:translate-y-[3px]
        focus:shadow-none
    `,




    toggle: (args?: StyleArgObject) => `
        h-4 w-8 m-2
        rounded-2xl
        bg-brand-yellow
        border-2 border-black
        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            child:h-3 child:w-3
            child:bg-brand-grey
            child:shadow-inner
            child:rounded-2xl
            child:transition-all
            ${ args?.condition ? 'child:translate-x-4' : '' }

    `,

    menuWrapper: () => `
        flex
        fixed bottom-0 left-0
        z-20
        h-[calc(100vh-5rem)]
        w-10/12 md:w-2/3 lg:w-1/2
    `,



    mainMenu: (args?: StyleArgObject) => `
        ${args?.animation ?? ''}
        z-30
        flex flex-col
        w-8/12 h-full
        bg-white
        text-heading
        overflow-auto
        cursor-pointer
        child:w-full child:h-fit
        child:px-4
        child:py-2 child:md:py-4 child:lg:py-6
        child:border-black
        child:border-b-4 child:border-r-4
        child-hover:border-r-0
        child-hover:bg-brand-grey
        child-hover:text-brand-red
        last-child:p-0
        last-child:h-full
        last-child:hover:border-r-4
        last-child:hover:bg-white
        last-child:hover:text-black
    `,

    subMenu: (args?: StyleArgObject) => `
        ${args?.animation ?? ''}
        z-20
        w-4/12 h-full
        p-8
        flex flex-col items-center
        border-r-4 border-black
        bg-brand-grey
        overflow-auto
    `,


    notification: (args?: StyleArgObject) => `
        w-full h-16
        shadow-lg rounded-lg overflow-hidden
        flex items-center
        px-8 my-2
        ${ args?.colours?.bg   ?? '' }
        text-white
        ${ args?.animation     ?? '' }
        translate-x-[150%]
        font-bold
        border-2 border-black
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    `,


    // notification: (args?: StyleArgObject) => `
    //     fixed bottom-5 right-5 
    //     flex items-center justify-center 
    //     p-5 px-8 
    //     ${args?.colours?.text ?? ''}
    //     ${args?.colours?.bg ?? ''}
    //     font-bold 
    //     rounded-md border-2 border-black 
    //     shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    // `,


    buttonBank: () => `
        w-fit
        rounded-md border-2 border-black 
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        flex items-center
    `,


    buttonBankButton:  (args?: StyleArgObject) => `  
        rounded-md  
        m-0.5 
        text-center text-sm font-medium 
        ${ args?.condition ? 'translate-y-[2px]' : 'translate-y-[-.5px]' }
        transition hover:scale-110
        ${ args?.extra }
    `,

};



export default neobrutalism;
