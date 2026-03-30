# Configuración del Servidor

Este servidor utiliza variables de entorno para configurar el envío de correos electrónicos. A continuación, se describen los pasos para configurar y ejecutar correctamente el servidor.

## Variables de Entorno

El servidor requiere las siguientes variables de entorno, que deben definirse en un archivo `.env` en el directorio `server`:

```env
EMAIL_USER="user@mailer-Config"  # Correo electrónico usado como remitente
EMAIL_PASS="passmailer-Config"  # Contraseña o token del correo remitente
EMAIL_TO="remitente@mail"       # Correo electrónico destinatario o grupo
```

### Descripción de las Variables
- **EMAIL_USER**: Correo electrónico que se usará para enviar los mensajes. Se recomienda usar un correo secundario.
- **EMAIL_PASS**: Contraseña o token de aplicación asociado al correo definido en `EMAIL_USER`.
- **EMAIL_TO**: Correo electrónico que recibirá los mensajes enviados desde el formulario de contacto.

## Pasos para Configurar

1. **Crear el archivo `.env`**:
   - Copia el contenido del archivo `.env.template` y renómbralo como `.env`.
   - Asegúrate de completar los valores de las variables con tus credenciales.

2. **Instalar dependencias**:
   - Ejecuta el siguiente comando en el directorio `server`:
     ```bash
     npm install
     ```

3. **Ejecutar el servidor localmente**:
   - Usa el siguiente comando para iniciar el servidor:
     ```bash
     npm start
     ```
   - El servidor estará disponible en `http://localhost:3000` por defecto.

4. **Configurar en producción (Vercel)**:
   - Define las mismas variables de entorno en el panel de configuración de Vercel.
   - Ve a tu proyecto en Vercel y accede a la sección `Settings > Environment Variables`.
   - Agrega las variables `EMAIL_USER`, `EMAIL_PASS` y `EMAIL_TO` con los valores correspondientes.

## Verificación de Configuración

- Asegúrate de que el archivo `.env` esté en el directorio raíz del servidor.
- Verifica que las variables de entorno estén correctamente configuradas ejecutando:
  ```bash
  echo $EMAIL_USER
  ```
  (En Windows, usa `echo %EMAIL_USER%` en lugar de `$EMAIL_USER`.)

## Notas Adicionales

- **Seguridad**: Nunca compartas el archivo `.env` ni subas tus credenciales a un repositorio público.
- **Errores comunes**:
  - Si el servidor no puede enviar correos, verifica que las credenciales sean correctas y que el proveedor de correo permita el acceso desde aplicaciones externas.
  - Asegúrate de que las variables de entorno estén definidas tanto en desarrollo como en producción.

### Environment Configuration

This project uses environment variables to manage sensitive information like email credentials. To set up your environment variables:

1. Create a `.env.template` file with the following structure:

   ```env
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_password ó contraseñas_de_aplicación
   EMAIL_TO=recipient_email@example.com
   PORT=3000//default es puerto 3000
   ```

2. Create environment-specific files:
   - `.env.dev` for development
   - `.env.prod` for production

3. Copy the contents of `.env.template` into these files and update the values as needed.

4. Install the `dotenv-cli` package for managing multiple .env files:

   ```bash
   npm install dotenv-cli --save-dev
   ```

5. Update the `scripts` section in `package.json` to include:

   ```json
   "scripts": {
       "start:dev": "dotenv -e .env.dev -- node src/index.js",
       "start:prod": "dotenv -e .env.prod -- node src/index.js"
   }
   ```

6. Use the following commands to start the server:
   - Development: `npm run start:dev`
   - Production: `npm run start:prod`

---

¡Listo! Ahora el servidor está configurado para manejar el envío de correos electrónicos de manera segura y eficiente.