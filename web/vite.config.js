import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Le decimos a Vite que la raíz del proyecto es la carpeta 'src'
  root: 'src',

  // Esta es la carpeta donde Vite buscará los archivos estáticos
  // como imágenes, fuentes, etc. durante el desarrollo.
  publicDir: 'public',

  build: {
    // Esta es la carpeta donde Vite pondrá los archivos optimizados
    // después de ejecutar `npm run build`.
    // Salimos de 'src' para crear la carpeta 'dist' en la raíz de 'web'
    outDir: '../dist',

    // Esto le dice a Vite que el punto de entrada de tu aplicación es el index.html
    // Es perfecto para sitios estáticos multipágina si los tuvieras.
    rollupOptions: {
      input: {
        // La ruta ahora es relativa a la nueva 'root' ('src')
        main: 'src/index.html',
        // Si tuvieras una página de contacto, la añadirías aquí:
        contacto: 'src/contacto.html'
      }
    }
  }
})
