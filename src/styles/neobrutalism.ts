








import { StyleFunctions,
         UseStyleArgProps } from '../types/styles';

//Expression expected.ts(1109)
const neobrutalism: StyleFunctions = {


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



    input: (args? : UseStyleArgProps) => `
        w-full
        p-1
        rounded-md 
        border-2 ${args && args.error ? 'border-pink-300' : 'border-black'} 
        min-w-[10rem]
        ${args && args.type === 'textArea' && 'min-h-[20rem]'}
        font-bold 
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none 
        transition-all 
        focus:translate-x-[3px] 
        focus:translate-y-[3px] 
        focus:shadow-none
    `
};


export default neobrutalism