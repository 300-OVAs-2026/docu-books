---
title: Comic Viewer
description: Componente visor de imágenes múltiples o cómics interactivo.
---

El componente `ComicViewer` proporciona una vista interactiva de lectura de cómics o secuencias de imágenes. Permite navegar entre una lista de páginas, acercar y alejar la imagen (zoom) de forma controlada, y arrastrar la imagen (`drag and drop`) usando eventos táctiles o del mouse cuando ésta se encuentra ampliada.

## Características Principales
- **Navegación secuencial:** Avanza o retrocede entre páginas.
- **Herramientas de Zoom:** Permite ampliación interactivata (`+` y `-`) hasta un nivel máximo del 300%.
- **Soporte Panning/Drag:** Al estar la imagen con zoom, se puede arrastrar para ver detalles, simulando un visor nativo, tanto en escritorio (Eventos Mouse) como en móvil (Eventos Touch).
- **Indicador de Progreso:** Muestra de forma constante por cuál de las partes va el usuario progresando (Ej. "Página 1 de 5").
- **Botón de Restauración:** Opción rápida para volver al centro y al zoom original del 100%.

## Cómo implementar

El componente recibe una lista de urls/rutas de forma estática que cargará en su visor.

### Ejemplo básico

```tsx
import { ComicViewer } from '@features';

const MyComponent = () => {
  const images = [
    'assets/comic/page-1.webp',
    'assets/comic/page-2.webp',
    'assets/comic/page-3.webp'
  ];

  return (
    <ComicViewer pages={images} />
  );
};
```

---

## Parámetros

### `ComicViewer`

| Prop | Tipo | Descripción | Default |
|---|---|---|---|
| `pages` | `string[]` | **(Requerido)** Un array con las rutas de las imágenes que compondrán las páginas del cómic secuencialmente. | `-` |

---

## Estructura de Clases CSS

El componente utiliza clases estandarizadas para el estilo del visor:

- `.comic-viewer`: Contenedor principal que envuelve todo el módulo.
- `.comic-viewer-empty`: Vista mostrada cuando el arreglo de páginas está vacío (o hay error).
- `.comic-top-bar`: Contiene el control numérico de páginas superior y las opciones de zoom.
- `.comic-pagination`: Contenedor del contador.
- `.comic-zoom-controls`: Panel de los botones (`+`, `-`, y `Restaurar`) junto con el porcentaje de escala actual.
- `.comic-page-display`: Lienzo de renderizado de la imagen. Recorta el contenido fuera de eje para permitir el arrastre (Drag).
- `.zoomable-image`: Clase de la imagen de contenido que sufre la transformación `scale` y `translate`. Recibe estados `.is-zoomed` e `.is-dragging`.
- `.comic-navigation-controls`: Panel inferior responsable de los botones de Paginación (`Siguiente` o `Anterior`).
