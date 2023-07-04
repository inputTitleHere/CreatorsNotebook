import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import packageJson from "./package.json"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000
  },
  define:{
    APP_VERSION:JSON.stringify(packageJson.version)
  },
  resolve:{
    alias:[
      {find:"@public", replacement:"/public"},
      {find:"@src",replacement:"/src"}
    ]
  }
})
