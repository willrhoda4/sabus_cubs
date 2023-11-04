








import {  useState, 
          useCallback, 
          createContext, 
          ReactNode       } from 'react';






// Define the type of the context value
interface NotificationContextValue {

  showNotification: (  message   : string, 
                       duration? : number  ) => void;
}

// Create a Context with a default value of an empty function
export const NotificationContext =      createContext<NotificationContextValue>({ showNotification: () => {} });


interface NotificationProviderProps   { children   : ReactNode;                     }


export const NotificationProvider = ( { children } : NotificationProviderProps ) => {


    const [ notifications, setNotifications ] = useState<{ id: number, message: string }[]>([]);


    const showNotification = useCallback( (message: string, duration = 3000) => {


        const id = new Date().getTime(); // Unique ID for each notification


        setNotifications(prev => [...prev, { id, message }]);


        setTimeout(() => {
          setNotifications(prev => prev.filter(notification => notification.id !== id));
        }, duration);


    }, []);

    return (
      
      <NotificationContext.Provider value={{ showNotification }}>
        {children}
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className="fixed bottom-5 right-5 bg-gray-700 text-white p-2 rounded-lg z-50"
          >
            {notification.message}
          </div>
        ))}
      </NotificationContext.Provider>
    );
};
