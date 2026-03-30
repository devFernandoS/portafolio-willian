import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({

  root: 'src',           // Vite opera desde web/src/
  publicDir: '../public',

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        //  adelante, SIN 'src/', SIN resolve(__dirname, ...)
        main: 'src/index.html',
        contacto: 'src/contacto.html',
        '404': 'src/404.html',
        proyectos: 'src/proyectos.html',
        desarrollo: 'src/desarrollo.html'
      }
    }
  }
})





