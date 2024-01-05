






/**
 * Notification component that works full time for NotificationProvider
 */

import { NotificationProps } from '../../types/notifications';

import { useEffect,
         useState          } from 'react'; 

import   useToggleAnimation  from '../../hooks/useToggleAnimation';

import   useStyles           from '../../hooks/useStyles';  






export default function Notification ( { id, message, duration, colours } : NotificationProps) : JSX.Element | null {


    const [ displayed, setDisplayed ]     = useState(true);

    const   theme                         = useStyles('neobrutalism');

    const   closingTime                   = 400;

    const [ notificationAnimation, isDisplayed ] = useToggleAnimation({
                                                                        isOpen:          displayed,
                                                                        openAnimation:  'animate-slide-in-right-after',
                                                                        closeAnimation: 'animate-slide-out-right',
                                                                        closingTime,
                                                                      });

    // Trigger the exit animation after 'duration'
    useEffect(() => {

        const timer = setTimeout(() => {

            setDisplayed(false);

        }, duration-closingTime );

        return () => clearTimeout( timer );

    }, [duration] );

    if ( !isDisplayed ) return null;

    return (

        <div key={id} className={`${theme.notification?.( { colours, animation: notificationAnimation } ) }` } >
            {message}
        </div>
    );
}



