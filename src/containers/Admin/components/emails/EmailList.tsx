






import EmailSignup    from '../../../Footer/components/EmailSignup';

import EmailListRack  from './EmailListRack';

import brandColours   from '../../../../utils/brandColours';

import useNewStatus   from '../../../../hooks/useNewStatus';




export default function EmailList () : JSX.Element {

    

    const [ statusRef, newStatus ] = useNewStatus()


    return (
        <div className={`
                            w-full h-fit
                            flex flex-col items-center
                       `}
        >


            <EmailSignup 
                buttonColour={brandColours('random').button} 
                newStatus={newStatus}
            />

            <p ref={statusRef} className={`h-8 my-2 text-center`} />

            <EmailListRack />
        </div>
    )
}