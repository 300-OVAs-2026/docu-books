---
title: Image
description: Componente para mostrar imágenes con soporte para leyendas (figcaption) y limpieza de HTML para accesibilidad.
---

El componente `Image` es una extensión del elemento nativo de imagen que añade soporte para leyendas estructuradas, manejo de tamaños y limpieza automática de etiquetas HTML en atributos de accesibilidad.

## Vista previa

![Ejemplo de imagen con leyenda](../../../assets/imageUI.webp)

## Cómo implementar

El componente puede utilizarse con o sin leyenda (`figcaption`). Por defecto, genera una estructura `<figure>` con un `<figcaption>` que incluye un título y una descripción.

### Ejemplo básico (con leyenda)

```tsx
import { Image } from '@shared/components/ui';

const MyComponent = () => {
  return (
    <Image 
      src="assets/example.png" 
      title="Figura 1." 
      alt="Descripción detallada de la <b>imagen</b>" 
      size="50%"
      hasHtml
    />
  );
};
```

### Ejemplo sin leyenda

```tsx
<Image 
  src="assets/simple-img.png" 
  alt="Imagen decorativa" 
  size="100px" 
  noCaption 
/>
```

---

## Parámetros

| Prop | Tipo | Descripción |
|---|---|---|
| `src` | `string` | **Requerido.** Ruta de la imagen. |
| `alt` | `string` | **Requerido.** Texto alternativo o descripción detallada. |
| `size` | `string` | **Requerido.** Ancho de la imagen (ej: "100%", "200px"). |
| `title` | `string` | Título que aparece en negrita en la leyenda. |
| `hasHtml` | `boolean` | Indica si el contenido de `alt` tiene HTML (se limpia para el atributo `alt` nativo pero se renderiza en la leyenda). |
| `noCaption` | `boolean` | Si es `true`, no renderiza el `<figcaption>` ni el contenedor `<figure>`. |
| `addClass` | `string` | Clase CSS adicional para personalizar estilos. |

---

## Características Especiales

### Limpieza de HTML
Cuando se activa `hasHtml`, el componente utiliza una expresión regular para eliminar etiquetas del atributo `alt` nativo de la imagen, asegurando que los lectores de pantalla no lean etiquetas como `<b>` o `<i>`, mientras que en la leyenda visual se mantienen los estilos.

### Estructura Semántica
- **Con leyenda:** Renderiza `<figure>` > `<img>` + `<figcaption>`.
- **Sin leyenda:** Renderiza `<div>` > `<img>`.

:::note[Accesibilidad]
El atributo `alt` final de la imagen es una combinación de `{title} {alt}` (limpio de HTML), proporcionando una descripción completa al usuario de tecnologías asistivas.
:::
