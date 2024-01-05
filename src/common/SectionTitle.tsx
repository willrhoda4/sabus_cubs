






import { SectionTitleProps } from '../types/content';



export default function SectionTitle ( { title, blurb, bgClass, textClass, textRight, responsive } : SectionTitleProps ) : JSX.Element {


    const commonClasses = `${ textRight && 'text-end justify-self-end' }`;

    return (    


        <div 
            className={`
                            w-full                      
                            flex items-center 
                            ${ textRight ? 'justify-end' : 'justify-start' } 
                            px-4  md:px-12  
                            py-32                     
                            ${bgClass} ${textClass}
                            ${  responsive  && 'xl:w-4/12 xl:py-0' }
                            shadow-brand-shadow
                      `} 
        >
                <div>
                    <h2 className={`${ commonClasses } text-title   leading-[5.5rem]` } >{title}</h2>
                    <p  className={`${ commonClasses } font-heading text-4xl mt-4 max-w-2xl`                 } >{blurb}</p>
                </div>
        </div>
    )
}