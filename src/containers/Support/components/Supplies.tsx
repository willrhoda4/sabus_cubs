




import   copy          from '../../../assets/copy';

import   Button        from '../../../common/buttons/Button';

import   ItemsList     from './ItemsList';

import { Link       }  from 'react-router-dom';




export default function Supplies ( { pStyles } : { pStyles : string } ) : JSX.Element {


    return (

        <div   className={` 
                            w-full h-fit
                            flex flex-col items-center
                         `} 
        >

            { copy('supplies', pStyles) }

            <ItemsList />

            <div className={`flex flex-col 
                                md:flex-row 
                             justify-center items-center
                             `}>
                <Link  to={'/contact?section=email&subject=supply%20donation'} >
                    <Button text='get in touch' styles='m-4' />
                </Link>

                <a href={import.meta.env.VITE_AMAZON_WISHLIST} target="_blank" rel="noopener noreferrer">
                    <Button text='amazon wishlist' styles='m-4' />
                </a>
            </div>
        </div>

    );

}