









import   copy             from '../../../assets/copy';

import { Link }           from 'react-router-dom';

import   Button           from '../../../common/buttons/Button';







export default function Fundraisers ( { pStyles } : { pStyles : string } ) : JSX.Element {




   



    return ( 
        <div className={`
                            w-full h-fit 
                            flex flex-col items-center
                            
                       `}
        >
            
            { copy('fundraiser', pStyles) }
            
            <Link 
                  to={{
                         pathname: '/contact',
                         search:   'subject=fundraising%20opportunity',
                      }}
                state={{ id:       'email' }} // This will be accessible in `location.state`
            >
                <Button text="reach out now" styles="m-4" />
            </Link>

        </div>
    )
} 