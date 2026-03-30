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
    // Las rutas de entrada ahora son relativas a la raíz 'web'.
    rollupOptions: {
      input: {
        main: 'src/index.html',
        contacto: 'src/contacto.html',
        404: 'src/404.html',
        proyectos: 'src/proyectos.html',
        desarrollo: 'src/desarrollo.html'
      }
    }
  }
})

