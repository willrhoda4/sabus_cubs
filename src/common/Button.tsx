










// Catalogue prop types for the component
interface ButtonProps< T = void > {
    text: string;
    onClick: (e: React.SyntheticEvent) => T; 
  }
    
// flexible button component
export default function Button ({ text, onClick } : ButtonProps) : JSX.Element {





    return (    <button className={`
                                        w-fit h-fit
                                        p-2 m-2
                                        flex justify-center items-center
                                        bg-yellow-200
                                        border-b-2 border-gray-400
                                    `}
                            onClick={onClick} 
                >  {text}</button>                     
    
    );
}
          