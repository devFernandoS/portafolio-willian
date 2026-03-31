# Historial Técnico: Despliegue Monorepo en Vercel (Frontend + Backend)

## Contexto

Este documento registra el proceso real de migración de un proyecto que originalmente solo tenía frontend estático en Vercel, hacia un monorepo unificado con frontend (Vite) y backend (Node.js/Express) bajo el mismo dominio.

## Estructura Final del Proyecto

```
PORTFOLIO/
├── public_html/        ← generado por Vite (ignorado en git)
├── server/
│   └── src/
│       └── index.js    ← entry point del backend
├── web/
│   ├── public/         ← archivos estáticos (favicon, PDFs, etc.)
│   ├── src/
│   │   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   ├── index.html
│   │   ├── contacto.html
│   │   ├── proyectos.html
│   │   ├── desarrollo.html
│   │   └── 404.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── vercel.json
```

---

## Configuración Final

### `vercel.json` (raíz del repo)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "web/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "../public_html"
      }
    },
    {
      "src": "server/src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/src/index.js"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/web/$1"
    }
  ]
}
```

### `web/vite.config.js`

```js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: resolve(__dirname, '../public_html'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:       resolve(__dirname, 'src/index.html'),
        contacto:   resolve(__dirname, 'src/contacto.html'),
        '404':      resolve(__dirname, 'src/404.html'),
        proyectos:  resolve(__dirname, 'src/proyectos.html'),
        desarrollo: resolve(__dirname, 'src/desarrollo.html')
      }
    }
  }
})
```

### `.gitignore` (raíz)

```
public_html/
.vercel/
```

---

## Variables de Entorno

Configurar en Vercel Dashboard → Settings → Environment Variables:

```
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password
EMAIL_TO=destino@email.com
```

---

## Historial de Problemas y Decisiones

### Fase 1: Solo frontend con `experimentalServices`

La configuración original usaba `experimentalServices` de Vercel, que detecta automáticamente Vite dentro de `web/` y sirve el `dist/` correctamente:

```json
{
  "experimentalServices": {
    "web": {
      "entrypoint": "web",
      "routePrefix": "/"
    },
    "api": {
      "entrypoint": "server/src/index.js",
      "routePrefix": "/api"
    }
  }
}
```

**Resultado:** El front funcionaba perfecto (`/contacto.html` limpio), pero el back no levantaba. `experimentalServices` y `builds` son mutuamente excluyentes, lo que impedía configurar el backend correctamente.

---

### Las tres etapas de rutas rotas en producción

Durante el proceso se pasó por tres estados distintos de rutas en producción, cada uno con su propio conjunto de errores:

#### Etapa 1: `app/web/src/contacto.html` ❌
Ocurre cuando Vite genera el output en `dist/src/` en vez de `dist/`. Causado por usar `resolve(__dirname, 'src/index.html')` sin definir `root: 'src'` — Rollup replica la estructura de carpetas del path absoluto.

**Síntoma visible:** Los HTMLs cargan pero sin estilos ni JS — las rutas relativas de los assets quedan mal resueltas. Por ejemplo, `contacto.html` referencia `/assets/theme.css` pero el navegador lo busca en `/web/src/assets/theme.css` que no existe.

```
/web/src/contacto.html    ← URL en producción
/web/src/assets/...       ← assets no encontrados, página rota visualmente
```

#### Etapa 2: `app/web/contacto.html` ❌
Ocurre cuando el `distDir` apunta correctamente al `dist/` pero Vercel igual sirve toda la carpeta `web/` como raíz estática por el comportamiento de `@vercel/static-build` en monorepos.

**Síntoma visible:** Los HTMLs cargan y los estilos funcionan (porque los assets también están bajo `/web/assets/`), pero las URLs son incorrectas para el usuario y el SEO.

```
/web/contacto.html    ← URL en producción
/web/assets/...       ← assets SÍ cargan (mismo prefijo)
```

#### Etapa 3: `app/contacto.html` ✅
Solución final con `public_html/` en la raíz + route `/web/$1`. Las URLs son limpias y los assets resuelven correctamente.

```
/contacto.html    ← URL en producción
/assets/...       ← assets cargan correctamente
```

**Por qué los assets funcionan en la etapa 3:** Vite genera referencias de assets con paths absolutos (`/assets/theme.css`). La route `/(.*) → /web/$1` de Vercel reescribe internamente tanto `/contacto.html` → `/web/contacto.html` como `/assets/theme.css` → `/web/assets/theme.css`, manteniendo la coherencia.

---

### Fase 2: Migración a `builds` — problema con `distDir`

Al cambiar a `builds` para poder agregar el backend:

```json
{
  "builds": [
    {
      "src": "web/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "server/src/index.js",
      "use": "@vercel/node"
    }
  ]
}
```

**Problema:** `@vercel/static-build` en monorepo siempre prefija los assets con el nombre de la carpeta del `src`. Como el src era `web/package.json`, todos los archivos quedaban bajo `/web/` en el deployment:

```
/web/contacto.html   ← mal
/web/assets/...      ← mal
```

El `distDir` se comporta diferente según desde dónde se evalúa:
- `"dist"` → Vercel lo busca relativo a la raíz del repo, no a `web/`
- `"web/dist"` → falla el build local con `vercel build`
- `"../public_html"` → **solución final** (ver Fase 4)

---

### Fase 3: Problema con `vite.config.js` y el `outDir`

Con `root: 'src'` en Vite, el directorio de trabajo es `web/src/`. Esto afecta cómo se resuelven los paths:

| Config | Desde dónde corre | `../dist` resuelve a |
|---|---|---|
| `npm run build` desde `web/` | `web/src/` | `web/dist/` ✅ |
| `vercel build` desde raíz | `raíz/src/` (no existe) | comportamiento impredecible ❌ |

**Solución:** Usar `resolve(__dirname, '../public_html')` como `outDir` — path absoluto que siempre resuelve correctamente sin importar desde dónde se ejecute el build.

```js
build: {
  outDir: resolve(__dirname, '../public_html'), // siempre web/../public_html = raíz/public_html
}
```

Esto genera la carpeta `public_html/` en la **raíz del repo**, fuera de `web/`.

---

### Fase 4: Solución final — `distDir: "../public_html"` + route `/web/$1`

Con el output en `public_html/` (raíz del repo), el `distDir` en `vercel.json` debe apuntar relativamente desde `web/`:

```json
"config": {
  "distDir": "../public_html"
}
```

Pero Vercel igual sirve los archivos bajo `/web/` en el deployment summary. La solución fue agregar una route que reescribe transparentemente:

```json
{
  "src": "/(.*)",
  "dest": "/web/$1"
}
```

Esto hace que `/contacto.html` sirva el archivo que está en `/web/contacto.html` internamente, sin que el usuario vea el prefijo.

---

### Por qué `root: 'src'` con inputs `'src/index.html'` funciona

Aparente contradicción: con `root: 'src'`, los inputs `'src/index.html'` deberían buscar `web/src/src/index.html` que no existe.

Lo que realmente ocurre: Rollup no encuentra los archivos por esos paths, por lo que Vite hace fallback y **escanea automáticamente el directorio root** (`web/src/`), encontrando todos los HTMLs directamente.

Los `rollupOptions.input` con paths incorrectos son efectivamente ignorados. Vite procesa los HTMLs por su comportamiento de escaneo automático del root.

La config equivalente y más honesta sería simplemente no declarar `rollupOptions`:

```js
export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: resolve(__dirname, '../public_html'),
    emptyOutDir: true
    // Vite escanea src/ automáticamente
  }
})
```

Se mantienen los `rollupOptions.input` explícitos con `resolve(__dirname, 'src/...')` por claridad y para evitar que futuras versiones de Vite cambien el comportamiento de escaneo automático.

---

## Comandos útiles

```bash
# Build local desde web/
cd web && npm run build

# Preview local del front
cd web && npm run preview
# → http://localhost:4173

# Simular build de Vercel localmente (desde raíz)
vercel build
# Output en .vercel/output/

# Vincular proyecto con Vercel CLI
vercel pull
```

---

## Notas sobre `vercel build` local vs producción

`vercel build` local con config `builds` legacy tiene comportamiento diferente al build en producción:
- Ignora o resuelve mal el `distDir` en algunos casos
- No soporta `vercel dev` con `builds` (solo con framework detection automática)
- El output en `.vercel/output/static/web/` siempre tendrá el prefijo `/web/` — esto es esperado y se maneja con la route `/(.*) → /web/$1`

Para verificar el front, usar `cd web && npm run preview` es más confiable que `vercel dev`.