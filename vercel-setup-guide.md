# Guía de Configuración para Vercel con Monorepo

Si tienes un monorepo con la siguiente estructura:

```
./web/ - Tu frontend con Vite
./server/ - Tu backend con Node.js
```

Esta es una estructura ideal para usar **Services** en Vercel. Sigue los pasos a continuación para configurar correctamente tu proyecto:

## Paso 1: Crear el archivo `vercel.json`

Crea un archivo `vercel.json` en la raíz de tu repositorio (al mismo nivel que las carpetas `web` y `server`):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "web/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "web/dist"
      }
    },
    {
      "src": "server/package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/$1"
    },
    {
      "src": "(.*)",
      "dest": "web/$1"
    }
  ],
  "experimentalServices": {
    "web": {
      "entrypoint": "web",
      "routePrefix": "/"
    },
    "api": {
      "entrypoint": "server",
      "routePrefix": "/api"
    }
  }
}
```

## Paso 2: Configurar el Dashboard de Vercel

1. Ve a tu proyecto del portafolio en el [dashboard de Vercel](https://vercel.com/dashboard).
2. En **Settings → General**, cambia el Framework a **Services**.
3. Guarda los cambios.

## Paso 3: Hacer Merge y Desplegar

Cuando hagas merge de tu rama `api-mailer` a `main`, Vercel automáticamente:

1. Detectará los cambios en ambas carpetas (`web` y `server`).
2. Construirá cada una:
   - **Vite** para `web`.
   - **Node.js** para `server`.
3. Desplegará ambas bajo la misma URL:
   - Tu frontend estará disponible en `/`.
   - Tu API estará disponible en `/api`.

Esto significa que tu frontend podrá hacer requests a `/api/enviar-email` (o cualquier ruta que definas) sin problemas de CORS, ya que estarán en el mismo dominio.

---

## Problema Común: Error "No services configured"

### Descripción del Error
Al intentar desplegar un proyecto con un monorepo en Vercel, puede aparecer el siguiente error:

```
Running "vercel build"
Vercel CLI 50.37.3
Error: No services configured. Add `experimentalServices` to vercel.json.
```

Este error ocurre cuando el archivo `vercel.json` no incluye la configuración necesaria para `experimentalServices`, lo que impide que Vercel detecte y configure correctamente los servicios del monorepo.

### Solución
1. **Asegúrate de que el archivo `vercel.json` incluya la configuración de `experimentalServices`**:

   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "web/package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "web/dist"
         }
       },
       {
         "src": "server/package.json",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "server/$1"
       },
       {
         "src": "(.*)",
         "dest": "web/$1"
       }
     ],
     "experimentalServices": {
       "web": {
         "entrypoint": "web",
         "routePrefix": "/"
       },
       "api": {
         "entrypoint": "server",
         "routePrefix": "/api"
       }
     }
   }
   ```

2. **Verifica la estructura del proyecto**:
   - La carpeta `web` debe contener un `package.json` con un script `build` que genere la carpeta `dist`.
   - La carpeta `server` debe contener un `package.json` con las dependencias necesarias para el backend.

3. **Actualiza Vercel CLI**:
   Asegúrate de estar utilizando la última versión de Vercel CLI:
   ```bash
   npm install -g vercel
   ```

4. **Despliega nuevamente**:
   Ejecuta el siguiente comando para desplegar el proyecto:
   ```bash
   vercel --prod
   ```

Con estos pasos, el error debería resolverse y el despliegue debería completarse correctamente.

---

### Problema Común: Falta de Variables de Entorno en Producción

### Descripción del Error
Un error común al desplegar un backend en Vercel es olvidar configurar las variables de entorno necesarias para el funcionamiento del servicio. Esto puede causar fallos en funcionalidades críticas, como el envío de correos electrónicos.

Por ejemplo, si el backend utiliza las siguientes variables de entorno:

```dotenv
EMAIL_USER="sullcafernando18@gmail.com"
EMAIL_PASS="boqd sjeb wrhd doai"
EMAIL_TO="sullca-93@hotmail.com"
```

Y estas no están configuradas en el entorno de producción, el servicio de correo fallará con errores como `TypeError: Failed to fetch` o `ERR_CONNECTION_REFUSED`.

### Solución
1. **Configurar las Variables en el Dashboard de Vercel**:
   - Ve al [dashboard de Vercel](https://vercel.com/dashboard).
   - Selecciona tu proyecto.
   - Ve a **Settings → Environment Variables**.
   - Agrega las siguientes variables con sus valores correspondientes:
     - `EMAIL_USER`: `sullcafernando18@gmail.com`
     - `EMAIL_PASS`: `boqd sjeb wrhd doai`
     - `EMAIL_TO`: `sullca-93@hotmail.com`

2. **Verificar el Uso de las Variables en el Código**:
   - Asegúrate de que el backend esté utilizando `process.env` para acceder a estas variables. Por ejemplo:
     ```javascript
     const emailUser = process.env.EMAIL_USER;
     const emailPass = process.env.EMAIL_PASS;
     const emailTo = process.env.EMAIL_TO;
     ```

3. **Desplegar Nuevamente**:
   - Una vez configuradas las variables, vuelve a desplegar el proyecto:
     ```bash
     vercel --prod
     ```

Con estos pasos, el servicio debería funcionar correctamente en producción.

---

### Nota Adicional: Configuración Completa de `vercel.json`

Aunque la documentación de Vercel menciona que solo es necesario agregar `experimentalServices`, en la práctica, el archivo `vercel.json` debe incluir las siguientes secciones para evitar errores:

1. **`version`**: Especifica la versión del esquema de configuración (debe ser `2`).
2. **`builds`**: Define cómo construir cada servicio (frontend y backend).
3. **`routes`**: Configura las rutas para redirigir correctamente las solicitudes.

Un archivo `vercel.json` incompleto, que solo incluya `experimentalServices`, puede causar errores como:

```
Running "vercel build"
Vercel CLI 50.37.3
Error: No services configured. Add `experimentalServices` to vercel.json.
```

Para evitar este problema, asegúrate de que tu archivo `vercel.json` tenga la siguiente estructura completa:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "web/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "web/dist"
      }
    },
    {
      "src": "server/package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/$1"
    },
    {
      "src": "(.*)",
      "dest": "web/$1"
    }
  ],
  "experimentalServices": {
    "web": {
      "entrypoint": "web",
      "routePrefix": "/"
    },
    "api": {
      "entrypoint": "server",
      "routePrefix": "/api"
    }
  }
}
```

Con esta configuración completa, Vercel podrá detectar correctamente los servicios y desplegarlos sin errores.

---

Con esta configuración, tendrás un despliegue optimizado y funcional para tu portafolio con frontend y backend integrados.