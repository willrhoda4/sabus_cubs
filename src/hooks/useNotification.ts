






import { useContext          } from 'react';
import { NotificationContext } from '../common/NotificationProvider';



/**
 * this is a simple hook that leverages the NotificationProvider to show a notification.
 * 
 * note that the NotificationProvider needs to be implemented in the top-level component:
 * 
 * 
 * return (
 *   <NotificationProvider>
 *    // the rest of your jsx for App.tsx, or whateer your top level component is.
 *  </NotificationProvider>
 * 
 * 
 */


const useNotification = () => {

  const { showNotification } = useContext(NotificationContext);

  return showNotification;
};

export default useNotification;
