import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // El directorio raíz ahora es 'web' (donde está este archivo), que es el comportamiento por defecto.
  // Ya no usamos la opción 'root: 'src''.

  // 'publicDir' es ahora relativo a la raíz 'web'.
  publicDir: 'public',

  build: {
    // 'outDir' es ahora relativo a la raíz 'web'.
    outDir: 'dist',
    emptyOutDir: true,
    // Usamos rutas absolutas para eliminar cualquier ambigüedad en el entorno de build.
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        contacto: resolve(__dirname, 'src/contacto.html'),
        404: resolve(__dirname, 'src/404.html'),
        proyectos: resolve(__dirname, 'src/proyectos.html'),
        desarrollo: resolve(__dirname, 'src/desarrollo.html')
      }
    }
  }
})


