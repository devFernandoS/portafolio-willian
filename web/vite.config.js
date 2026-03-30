import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({

  root: 'src',           // Vite opera desde web/src/
  publicDir: '../public',

  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        contacto: resolve(__dirname, 'src/contacto.html'),
        '404': resolve(__dirname, 'src/404.html'),
        proyectos: resolve(__dirname, 'src/proyectos.html'),
        desarrollo: resolve(__dirname, 'src/desarrollo.html')
        //  adelante, SIN 'src/', SIN resolve(__dirname, ...)
        // main: 'src/index.html',
        // contacto: 'src/contacto.html',
        // '404': 'src/404.html',
        // proyectos: 'src/proyectos.html',
        // desarrollo: 'src/desarrollo.html'
      }
    }
  }
})





