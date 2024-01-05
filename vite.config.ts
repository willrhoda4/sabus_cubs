import { sentryVitePlugin } from "@sentry/vite-plugin";





import { defineConfig } from 'vite'
import   react          from '@vitejs/plugin-react-swc'
import   svgr           from 'vite-plugin-svgr';


// https://vitejs.dev/config/
export default defineConfig({
  plugins:  [react(), svgr(), sentryVitePlugin({
    org: "william-rhoda",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  }
})