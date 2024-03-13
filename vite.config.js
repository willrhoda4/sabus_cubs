





// we'll need to import the dotenv package at the top of our vite.config.js file,
// to workaround import.meta only being available in src.   
import dotenv from 'dotenv';
       dotenv.config();


import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig     } from 'vite';
import   react              from '@vitejs/plugin-react-swc';
import   svgr               from 'vite-plugin-svgr';




export default defineConfig({

  plugins: [

    react(), 

    svgr(), 

    // Sentry plugin for the client
    sentryVitePlugin({
      org: "william-rhoda",
      project: "sabus_cubs-react",
      authToken: process.env.VITE_SENTRY_CLIENT_AUTH_TOKEN, //'process' is not defined.eslintno-undef

    }),

    // Sentry plugin for the server
    sentryVitePlugin({
      org: "william-rhoda",
      project: "sabus_cubs-node",
      authToken: process.env.VITE_SENTRY_SERVER_AUTH_TOKEN, //'process' is not defined.eslintno-undef


    } ),
  ],

  build: {
    sourcemap: true
  }
  
});




// import { sentryVitePlugin } from "@sentry/vite-plugin";
// import { defineConfig     } from 'vite'
// import   react              from '@vitejs/plugin-react-swc'
// import   svgr               from 'vite-plugin-svgr';


// export default defineConfig({
//   plugins:  [react(), svgr(), sentryVitePlugin({
//     org: "william-rhoda",
//     project: "sabus_cubs-react"
//   })],

//   build: {
//     sourcemap: true
//   }
// })