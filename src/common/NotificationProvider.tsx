








import {  useState, 
          useCallback, 
          createContext, 
          ReactNode       } from 'react';

import    useStyles from '../hooks/useStyles';





/**
 * type definition for the context value.
 * 
 * defines a function 'showNotification' that displays a notification message.
 * the function accepts a message string and an optional duration in milliseconds.
 */interface NotificationContextValue {

  showNotification: (  message   : string, 
                       duration? : number  ) => void;
}




/**
 * context for managing notifications within the application.
 * the default value for the context is an object with a 'showNotification' function stub.
 */
export const NotificationContext    = createContext<NotificationContextValue>({ showNotification: () => {} });


interface NotificationProviderProps { children : ReactNode; }





/**
 * provider component for the notification context.
 * 
 * this component manages the state of notifications and provides a method
 * 'showNotification' to trigger new notifications. notifications are displayed
 * for a specified duration and then automatically dismissed.
 * 
 * @param { NotificationProviderProps } props - Component props containing children nodes.
 * @returns A context provider wrapping child components to enable notification functionality.
 */
export const NotificationProvider = ( { children } : NotificationProviderProps ) => {


    const [ notifications, setNotifications ] = useState<{ id: number, message: string }[]>([]);

    const   theme                             = useStyles('neobrutalism');




    /**
     * function to display a new notification.
     * 
     * generates a unique ID for each notification, adds it to the state, and sets a timer
     * to remove the notification after the specified duration.
     * 
     * @param {string}  message        - the message to be displayed in the notification.
     * @param {number} [duration=3000] - duration in milliseconds for which the notification is displayed.
     */
    const showNotification = useCallback( (message: string, duration = 3000) => {


        const id = new Date().getTime(); // Unique ID for each notification


        setNotifications(prev => [ ...prev, { id, message } ] );


        setTimeout(() => {
          setNotifications(prev => prev.filter(notification => notification.id !== id));
        }, duration);


    }, []);

    return (
      
      <NotificationContext.Provider value={ { showNotification } }>

        {children}
        {notifications.map(notification => (

          <div 
                  key={notification.id} 
            className={theme.notification?.()}
          >
            {notification.message}
          </div>
        ))}
      </NotificationContext.Provider>
    );
};
