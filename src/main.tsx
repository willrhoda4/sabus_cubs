



import   * as Sentry      from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import   React            from 'react';
import { BrowserRouter }  from 'react-router-dom';
import { createRoot    }  from 'react-dom/client';
import   App              from './App';




// Initialize Sentry
Sentry.init( {

  dsn: import.meta.env.VITE_SENTRY_DSN,

  integrations: [
    new BrowserTracing({
      tracePropagationTargets: [ 'localhost', /^https:\/\/sabuscubs\.com\// ],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  tracesSampleRate: 1.0,         // capture 100% of the transactions for performance monitoring
  replaysSessionSampleRate: 0.1, // session replay sample rate
  replaysOnErrorSampleRate: 1.0, // increase sample rate when errors occur
});

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}




// import    App            from './App';
// import { BrowserRouter } from 'react-router-dom';
// import { createRoot    } from 'react-dom/client';




// const container = document.getElementById('root');

// if   (container) {

//   const root = createRoot(container);
//   root.render(<BrowserRouter><App /></BrowserRouter>);
  
// }


