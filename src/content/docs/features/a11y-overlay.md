---
title: A11y Overlay
description: Componente para añadir un menú lateral de opciones de accesibilidad.
---

El componente `A11yOverlay` proporciona un panel completo de opciones de accesibilidad (a11y) interactivas, permitiendo al usuario configurar contrastes, tamaños de fuente, modo oscuro, fuentes para dislexia, lectura en voz alta, entre otros.


## Cómo implementar

El menú de accesibilidad suele instanciarse a nivel global mediante un botón desencadenador que maneje los estados `isOpen` y `onClose`.

### Ejemplo básico

```tsx
import { useState } from 'react';
import { A11yOverlay } from '@features';
import { Button } from '@ui';

const Layout = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOverlayOpen(true)}>
        Abrir opciones de Accesibilidad
      </Button>
      
      <A11yOverlay 
        isOpen={isOverlayOpen} 
        onClose={() => setIsOverlayOpen(false)} 
      />
    </>
  );
};
```

---

## Parámetros

### `A11yOverlay`

| Prop | Tipo | Descripción |
|---|---|---|
| `isOpen` | `boolean` | Indica si el panel de accesibilidad está visible. |
| `onClose` | `() => void` | Función de callback que se ejecuta para cerrar el panel. |

---

## Estructura de Clases CSS

El componente utiliza módulos CSS para asegurar el encapsulamiento de estilos. Las principales clases que lo componen son:

- `.modal`: Contenedor principal que se despliega desde el lateral izquierdo.
- `.modal__header`: Encabezado que contiene el título y el botón de cerrar.
- `.modal__title`: Título del menú de opciones y atajo de teclado.
- `.modal__button`: Botón de cierre `(x)` del encabezado.
- `.modal__main`: Contenedor del listado de botones de accesibilidad (`A11yButtton` y `A11yCard`).

## Accesibilidad

Este componente cumple con múltiples estándares de accesibilidad, dado que es la funcionalidad principal del componente:
- Atajos de teclado incorporados globales (Ej: `Ctrl + Alt + A`).
- Relación de estructura semántica Aria mediante `aria-labelledby`, `aria-hidden` y `role="dialog"`.
- Modal interactivo con contención y foco de teclado controlado (`tabIndex={-1}`, `aria-modal="true"`).
- Opciones que alteran propiedades a nivel DOM como esquemas de colores, dislexia o animaciones reducidas.
