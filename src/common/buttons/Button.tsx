




import { ButtonProps } from '../../types/button'









// Catalogue prop types for the component

    
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
                > {text}</button>                     
    
    );
}
       



/**
 * interface ButtonProps {

  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (event: any) => any;
}

const MyButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <button onClick={(event) => onClick(event)}>{text}</button>;
};

export default MyButton;
 */