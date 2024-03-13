






import Button from '../../../common/buttons/Button';

import copy   from '../../../assets/copy';








export default function Volunteer ( { pStyles } : { pStyles : string } ) : JSX.Element {



   


    return (
        <div className={`
                            w-full h-fit 
                            px-4 md:px-8 lg:px-12   
                            my-8
                            flex flex-col items-center
                       `}
        >
            
          
            { copy('volunteer', pStyles) }
            

            <div className={`
                                flex flex-col md:flex-row
                                items-center
                           `}
            >
                <a  
                      href='https://res.cloudinary.com/sabus-cubs/image/upload/pdf/form.pdf'
                    target="_blank" 
                       rel="noopener noreferrer"
                >
                    <Button text='volunteer form' styles='m-4'/>
                </a>

                <a  
                      href='https://res.cloudinary.com/sabus-cubs/image/upload/pdf/waiver.pdf'
                    target="_blank" 
                       rel="noopener noreferrer"
                >
                    <Button text='volunteer waiver' styles='m-4'/>
                </a>
            </div>

        </div>
    )
}