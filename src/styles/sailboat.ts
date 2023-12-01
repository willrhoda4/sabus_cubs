










import { StyleFunctions,
         StyleArgObject } from '../types/styles';



const sailboat: StyleFunctions = {


    button: () => `
        rounded-lg 
        border border-gray-300 
        bg-white 
        px-5 py-2.5 m-2
        text-center text-sm font-medium text-gray-700 
        shadow-sm shadow-inner
        transition-all 
        hover:bg-gray-100 
        focus:ring focus:ring-gray-100 
        disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400
    `,

    input: ( args? : StyleArgObject ) => `
        w-full p-1 
        rounded-md border 
        ${!(args && args.error) ? 'border-gray-300' : 'border-pink-300'} 
        ${args && args.type === 'textArea' && 'min-h-[20rem]'}
        shadow-sm 
        focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50
    `
};


export default sailboat;