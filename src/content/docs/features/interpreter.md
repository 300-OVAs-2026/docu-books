---
title: Interpreter
description: Ventana flotante interactiva para video-interpretación en lengua de señas.
---

El componente `Interpreter` es una herramienta de accesibilidad que despliega una ventana flotante con videos de interpretación en Lengua de Señas. Permite al usuario ver el contenido descriptivo o de apoyo visual de manera sincronizada y controlada.

## Características Principales
- **Ventana Flotante y Arrastrable:** El usuario puede mover el reproductor a cualquier parte de la pantalla mediante *drag and drop* para evitar que obstruya el contenido.
- **Doble Fuente de Video:** Soporta intercambio entre videos de "Contenido" (general) y videos de "Accesibilidad" (específicos).
- **Zoom Dinámico:** Los botones laterales permiten ampliar el tamaño de la ventana del intérprete para una mejor visibilidad.
- **Persistencia A11y:** El estado de visibilidad del intérprete se sincroniza con el menú de accesibilidad global y se persiste en `localStorage`.
- **Sincronización por Eventos:** Escucha eventos de sistema (`EVENT.SOURCES`) para actualizar los videos automáticamente según la navegación del OVA.

## Cómo implementar

El componente se ubica usualmente de forma global en el layout principal del OVA, ya que su contenido se actualiza dinámicamente mediante eventos.

### Ejemplo básico

```tsx
import { Interpreter } from '@features';

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      {children}
      {/* El intérprete se posicionará de forma fija (fixed) en la pantalla */}
      <Interpreter />
    </div>
  );
};
```

### Actualización de Contenido
Para cambiar el video que está reproduciendo el intérprete desde cualquier componente, se debe disparar el evento correspondiente:

```tsx
const updateInterpreter = (videoUrl: string) => {
  const event = new CustomEvent('interpreter-update-sources', {
    detail: { contentURL: videoUrl }
  });
  document.dispatchEvent(event);
};
```

---

## Parámetros

### `Interpreter`

| Prop | Tipo | Descripción | Default |
|---|---|---|---|
| `className` | `string` | Clase CSS adicional para el contenedor principal. | `undefined` |

---

## Estructura de Clases CSS

El componente utiliza módulos CSS con un sistema de capas y transformaciones:

- `.c-interpreter__container`: Contenedor raíz con posicionamiento `fixed` y `z-index` elevado.
- `.c-interpreter__list`: Barra lateral de herramientas (Zoom, Mover, Cerrar, Cambiar fuente).
- `.c-interpreter__button--drag`: Botón especial que actúa como ancla para arrastrar la ventana.
- `.c-video`: Contenedor del reproductor de video que incluye la barra de progreso y botones de play/pausa.
- `.c-video__video--hidden`: Clase utilitaria para alternar la visibilidad entre el canal de accesibilidad y el de contenido sin perder la carga del video.

## Accesibilidad

- **Navegación por teclado:** El reproductor incluye controles nativos accesibles.
- **Persistencia:** Almacena la preferencia del usuario en `localStorage` bajo la ruta de configuración de accesibilidad.
- **Aria Labels:** Los botones de control y el reproductor de video están etiquetados para lectores de pantalla.
