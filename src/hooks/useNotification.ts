







/**
 * custom hook for utilizing the notification context.
 * 
 * this hook provides an easy way to show notifications throughout the application.
 * it should be used in components nested within 'NotificationProvider' to ensure
 * access to the 'showNotification' function. for univeral access, wrap the entire app:
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
 * usage:
 * 
 * // import
 * import useNotification from './hooks/useNotification';
 * 
 * // declare
 * const showNotification = useNotification();
 * 
 * // use
 * showNotification('Your message here', 3000); // Shows notification for 3000ms
 */



import { useContext          } from 'react';
import { NotificationContext } from '../common/notifications/NotificationProvider';





export default function useNotification () {

  const { showNotification } = useContext(NotificationContext);

  return  showNotification;
}

