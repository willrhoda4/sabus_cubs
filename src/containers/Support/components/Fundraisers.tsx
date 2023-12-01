









import   copy             from '../../../assets/copy';

import { Link }           from 'react-router-dom';

import   Button           from '../../../common/buttons/Button';







export default function Fundraisers() : JSX.Element {




   



    return ( 
        <div className={`
                            w-full h-fit 
                            p-8 my-8
                            flex flex-col items-center
                       `}
        >
            
            <p className={`
                            w-ful 
                            pr-[40%] my-8
                            font-body
                         `}
            >{ copy('fundraiser') }</p>
            
            <Link  to={'/contact?section=email&subject=fundraising%20opportunity'} >
                <Button text='reach out now'/>
            </Link>


        </div>
    )
} 