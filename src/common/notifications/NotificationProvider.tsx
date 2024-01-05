



/**
 * provider component for the notification context.
 * 
 * this component manages the state of notifications and provides a method
 * (showNotification) to trigger new notifications. notifications are displayed
 * for a specified duration and then automatically dismissed.
 * 
 * essentially, use this component to wrap any components that need to display notifications.
 * if you want universal notifications, wrap the entire application in this component:
 * 
 * 
 * 
 *  <NotificationProvider>
          <Elements stripe={stripePromise}>


            <Routes>
              <Route path='/'                       element={<Home />} />
              <Route path='/home'                   element={<Home />} />
              <Route path='/simba'                  element={<Admin editing={editing} brandColours={brandColours} />} />
              <Route path='/info'                   element={<Info />} />
              <Route path='/support'                element={<Support />} />
              <Route path='/gallery'                element={<Gallery photoData={photoData} />} />
              <Route path='/contact'                element={<Contact photoData={photoData} />} />
              <Route path='/news'                   element={<News />} />
              <Route path='/subscription-update'    element={<Updater />} />
            </Routes>

            { location !== '/simba' && <Footer brandColours={brandColours} /> }

          </Elements>
        </NotificationProvider>
 * 
 *  pass showNotification to the useNotification hook for easy usage.
 *        
 * @param { NotificationProviderProps } props - Component props containing children nodes.
 * @returns A context provider wrapping child components to enable notification functionality.
 */








import    Notification                from './Notification';

import {  useState, 
          useCallback, 
          createContext            }  from 'react';


import {  NotificationContextValue, 
          NotificationProviderProps,
          NotificationProps        } from '../../types/notifications';


import      brandColours,
          { BrandColours            } from '../../utils/brandColours';





//context for managing notifications within the application.
//the default value for the context is an object with a 'showNotification' function stub.
export const NotificationContext = createContext<NotificationContextValue>({ showNotification: () => {} });



export const NotificationProvider = ( { children } : NotificationProviderProps ) => {



    const [ notifications, setNotifications ] = useState< NotificationProps[] >([]);



    /**
     * function to display a new notification.
     * 
     * generates a unique ID for each notification, adds it to the state, and sets a timer
     * to remove the notification after the specified duration.
     * 
     * @param {string}  message        - the message to be displayed in the notification.
     * @param {number} [duration=5000] - duration in milliseconds for which the notification is displayed.
     */
    const showNotification = useCallback( ( message: string, duration = 5000 ) => {


      // Unique ID for each notification
      const id      = new Date().getTime(); 

      const colours = brandColours('random') as BrandColours; 

      // Add the notification to the state
      setNotifications( prev => [ ...prev, { id, message, duration, colours } ] );

      // Remove the notification after 'duration'.
      // duration defaults to 5000ms.
      setTimeout(() => {
          setNotifications(prev => prev.filter(notification => notification.id !== id));
      }, duration);


    }, []);


    
    return (
      
      <NotificationContext.Provider value={ { showNotification } }>

        {children}

        <div className={`
                          fixed bottom-5 right-5 
                          flex flex-col items-end justify-end
                          transition-all 
                          w-80
                       `}
                  style={ { height: `${notifications.length*80}px` } } 

        >
          { notifications.map(notification => (

              <Notification 
                              key={notification.id} 
                              id={notification.id}
                              message={notification.message} 
                              duration={notification.duration}
                              colours={notification.colours}
              />
          ) ) }
        </div>
      </NotificationContext.Provider>
    );
};
