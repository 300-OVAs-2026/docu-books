---
title: Scripts del proyecto
description: Referencia de todos los scripts disponibles en el package.json del proyecto.
---

Referencia completa de los scripts disponibles en el `package.json`. Se dividen en cuatro grupos según su propósito.

## Desarrollo

| Script | Comando | Descripción |
|---|---|---|
| `lint` | `eslint .` | Analiza el código en busca de errores y problemas de estilo |
| `preview` | `vite preview` | Levanta un servidor local con la build de producción para revisarla antes de desplegar |
| `cz` | `cz` | Abre el asistente interactivo para escribir commits con el formato convencional |

---

## Utilidades de OVAs

Estos scripts automatizan tareas repetitivas sobre los archivos de los OVAs. Todos viven en `src/scripts/` — cada uno en su propia subcarpeta — pero siempre se ejecutan desde la raíz del proyecto:

```
src/
  scripts/
    clone/      ← npm run clone
    flatten/    ← npm run flatten
    normalize/  ← npm run normalize
    pages/      ← npm run pages
```

| Script | Descripción |
|---|---|
| `clone` | Clona la estructura de un OVA existente para usarlo como base de uno nuevo |
| `flatten` | Aplana la estructura de carpetas de un OVA para prepararlo para entrega |
| `normalize` | Normaliza los nombres de archivos y carpetas según las convenciones del proyecto |
| `pages` | Genera o actualiza el archivo de rutas/páginas del OVA |

Para correr cualquiera de estos scripts:

```bash
npm run clone
npm run flatten
npm run normalize
npm run pages
```

---

## Configuración inicial del entorno

Estos tres scripts deben ejecutarse **en orden** cuando se clona el repositorio por primera vez o cuando se une un nuevo integrante al equipo.

### `setup:branch`

Configura la rama `develop` localmente. Si no existe, la crea desde `origin/develop`:

```bash
npm run setup:branch
```

### `setup:submodules`

Actualiza los tres submódulos del proyecto a su última versión en `develop` (o `main` para `.vscode`):

- `src/shared` → rama `develop`
- `src/scripts` → rama `develop`
- `.vscode` → rama `main`

```bash
npm run setup:submodules
```

### `setup:develop`

Ejecuta los tres pasos de configuración en secuencia: configura la rama, actualiza los submódulos e instala las dependencias:

```bash
npm run setup:develop
```

:::tip[Usa `setup:develop` para configurar el entorno de una sola vez]
`setup:develop` encadena `setup:branch` + `setup:submodules` + `npm install` + `npm run dev`. Es el único comando que necesitas correr cuando clonas el repositorio por primera vez.

```bash
# Clonar y configurar todo de una vez
git clone <url-del-repo>
cd <nombre-del-proyecto>
npm run setup:develop
```
:::

:::caution[Los submódulos deben estar inicializados]
Si es la primera vez que clonas el repositorio, asegúrate de inicializar los submódulos antes de correr `setup:develop`:

```bash
git submodule update --init --recursive
npm run setup:develop
```
:::