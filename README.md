# Portafolio Profesional

Este repositorio contiene el código fuente de mi portafolio profesional. El objetivo es crear un sitio web moderno, performante y escalable, comenzando con una implementación estática y sentando las bases para futuras expansiones con servicios de backend.

El proyecto se basa en una arquitectura desacoplada, utilizando un frontend estático para la velocidad y una infraestructura contenerizada opcional (basada en el proyecto `ia-mvp`) para facilitar el desarrollo, el despliegay la escalabilidad.


## Estructura del Proyecto

La estructura del monorepo está organizada de la siguiente manera:

### `/web` (Frontend)
Contiene el código fuente del frontend del portafolio. Inicialmente, se basa en los modelos estáticos de la carpeta `stitch`.
- **Tecnologías**: HTML, CSS, JavaScript.
- **Tooling**: Vite para un entorno de desarrollo rápido y optimización de builds.
- **Fuente**: Los diseños iniciales provienen de `stitch/stitch_portfolio_profesional_home` y `stitch/stitch_portfolio_profesional_icontacto`.

### `/server` (Backend - Opcional)
Un servicio de backend preparado para futuras funcionalidades, como un formulario de contacto dinámico, un blog o la gestión de proyectos.
- **Tecnologías**: Node.js, Express.
- **ORM**: Prisma para una interacción segura y eficiente con la base de datos.
tribus
### `/database`
Configuración y scripts de inicialización para la base de datos.
- **Tecnología**: PostgreSQL.


### Infraestructura y DevOps

- **`/.github/workflows`**: Pipelines de CI/CD con GitHub Actions para automatizar pruebas y despliegues.
- **`docker-compose.yml`**: Orquestación del entorno de desarrollo local con Docker, asegurando consistencia entre entornos.
- **`Dockerfile`**: Definiciones para construir las imágenes de los servicios (frontend, backend).

## Arquitectura Tecnológica

La pila tecnológica ha sido seleccionada para ofrecer una excelente experiencia de desarrollador, rendimiento y escalabilidad.


- **Frontend**: Vite + HTML/CSS/JS. Vite ofrece un servidor de desarrollo nativo (ESM) y un empaquetado optimizado para producción.
- **Backend**: Node.js + Prisma. Una combinación robusta y moderna para construir APIs eficientes.
- **Base de Datos**: PostgreSQL, una base de datos relacional potente y de código abierto.
- **Contenerización**: Docker y Docker Compose para crear entornos de desarrollo y producción aislados y reproducibles.
- **CI/CD**: GitHub Actions para la automatización de la integración y el despliegue continuo.
- **Cloud**: Preparado para desplegar en **Azure**, utilizando servicios como Azure App Service para el frontend/backend y Azure Database for PostgreSQL.


La estrategia actual es empezar de forma simple y escalar según sea necesario.

1.  **Fase 1: MVP Estático**
    -   [ ] Integrar los diseños de `stitch` en la aplicación Vite dentro de la carpeta `web`.
    -   [ ] Personalizar el contenido: textos, imágenes y proyectos.
    -   [ ] Configurar el pipeline de CI/CD en GitHub Actions para desplegar el sitio estático en Azure Static Web Apps o un servicio similar.

2.  **Fase 2: Funcionalidad Dinámica (Opcional)**
    -   [ ] Activar el backend (`server`) para gestionar un formulario de contacto.
    -   [ ] Utilizar Docker Compose para levantar el entorno completo (web, server, db) en local.
    -   [ ] Actualizar el pipeline de CI/CD para desplegar el backend en Azure App Service y la base de datos.

3.  **Fase 3: Escalado**
    -   [ ] Añadir un CMS headless o una sección de blog administrada por el backend.
    -   [ ] Implementar un sistema de caché y optimizaciones avanzadas.

---
Este portfolio está diseñado como una aplicación full-stack escalable.

- Frontend estático para máxima performance
- Backend desacoplado, activado solo cuando es necesario
- Base de datos preparada para contenido dinámico
- Infraestructura reproducible con Docker

Decisión clave:
No activar complejidad hasta que el producto lo requiera.

> Este `README.md` se basa en la estructura y configuraciones del proyecto `ia-mvp`, adaptado para los objetivos de un portafolio profesional.