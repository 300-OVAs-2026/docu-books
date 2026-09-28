---
title: Loader
description: Componente visual para indicar estados de carga o procesamiento.
---

El componente `Loader` es una utilidad visual minimalista diseñada para informar al usuario que una acción está en progreso o que el contenido se está cargando.

## Cómo implementar

El componente es extremadamente sencillo de usar y se adapta al contenedor donde se coloque. Generalmente se usa dentro de botones, modales o contenedores de contenido dinámico.

### Ejemplo básico

```tsx
import { Loader } from '@shared/components/ui';

const MyComponent = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="u-flex u-justify-center u-p-8">
        <Loader />
      </div>
    );
  }

  return <div>Contenido cargado</div>;
};
```

---

## Parámetros

| Prop | Tipo | Descripción |
|---|---|---|
| `addClass` | `string` | Clase CSS adicional para personalizar el tamaño, color o márgenes del cargador. |

---

## Estilos y Visualización

El cargador está definido como un `span` con una animación CSS circular. Por defecto, hereda el color de texto del elemento padre (`currentColor`), lo que permite que cambie de color automáticamente si se coloca dentro de un botón con texto blanco, por ejemplo.

### Personalización rápida

Puedes usar clases de utilidad para modificar su apariencia:

```tsx
/* Loader grande y azul */
<Loader addClass="u-w-10 u-h-10 u-border-primary" />
```

## Accesibilidad

:::note[Buenas prácticas]
Cuando utilices un `Loader`, asegúrate de que el contenedor padre tenga un atributo `aria-busy="true"` o un `role="status"` para que los usuarios de lectores de pantalla sepan que el contenido está cambiando.
:::
