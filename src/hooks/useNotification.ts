







/**
 * Custom hook for utilizing the notification context.
 * 
 * This hook provides an easy way to show notifications throughout the application.
 * It should be used in components nested within 'NotificationProvider' to ensure
 * access to the 'showNotification' function.
 * 
 * Usage:
 * const showNotification = useNotification();
 * showNotification('Your message here', 3000); // Shows notification for 3000 ms
 */



import { useContext          } from 'react';
import { NotificationContext } from '../common/NotificationProvider';





const useNotification = () => {

  const { showNotification } = useContext(NotificationContext);

  return showNotification;
};

export default useNotification;
