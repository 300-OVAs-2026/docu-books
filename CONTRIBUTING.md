# Guia de contribucion

Este documento explica como levantar el proyecto y como agregar o actualizar paginas de la documentacion.

## Levantar el proyecto en local

1. npm install
2. npm run dev

## Crear una nueva pagina

- Ubicacion: src/content/docs/
- Starlight usa rutas basadas en archivos. Ejemplo:
  - Archivo: src/content/docs/ui/accordion.mdx
  - Ruta: /ui/accordion/ (respeta el base path configurado en el sitio)
- Usa .md para contenido simple y .mdx si necesitas componentes.

## Convenciones de nombres

- kebab-case para archivos y carpetas: mi-nuevo-componente.mdx
- Un tema por pagina; evita mezclar componentes o conceptos no relacionados.

## Plantilla base

````mdx
---
title: Nombre del componente
description: Descripcion corta en una linea.
---

import { Tabs, TabItem, Aside } from "@astrojs/starlight/components";

## Que es
Breve definicion.

## Vista previa
Usado para dar un poco más de contexto, solo si es necesario.

## Cuando usarlo
Contexto y casos de uso.

## Uso
~~~tsx
// ejemplo
~~~

## API / Props
| Prop | Tipo | Descripcion | Default |
| --- | --- | --- | --- |
| ... | ... | ... | ... |

## Accesibilidad
- Recomendaciones clave.

## Notas
- Consideraciones y limitaciones.
````

## Guia extendida

Para mas detalles, revisa: src/content/docs/guides/como-documentar.mdx
