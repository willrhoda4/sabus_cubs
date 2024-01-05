






import IconError from '../../assets/icons/error.svg?react';
import Card      from './Card';



interface ErrorCardProps {
    title: string;
    text: string;
}




// simple display component.
// gets thrown up if there's a problem with the token.
export default function ErrorCard ( { title, text } : ErrorCardProps ) : JSX.Element {




   

    return (
        
        <Card 
                wrapClass={`
                            mx-4
                            max-w-2xl 
                            self-center justify-self-center
                          `}
             headingClass='bg-brand-yellow text-black'
                  heading={title}
             contentClass='flex items-center justify-between'
        >

            <IconError className='w-12 h-12 mr-8' />

            <p className='w-full h-auto text-body'>{text}</p>

        </Card>
    )
}  
