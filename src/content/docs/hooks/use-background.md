---
title: Fondo Dinámico
description: Hook para gestionar y aplicar imágenes de fondo dinámicamente mediante variables CSS.
---

`useBackground` es una utilidad que permite cambiar la imagen de fondo de un elemento (por defecto el `<body>`) de manera programática, utilizando variables CSS para una integración fluida con los estilos globales.

## Cómo funciona

El hook gestiona un estado de imagen y, mediante un efecto de React, inyecta una variable CSS llamada `--bg-image` en el elemento objetivo. Al desmontarse el componente o cambiar la imagen, el hook se encarga de limpiar la propiedad para evitar efectos secundarios en otras secciones del OVA.

## Implementación y Uso

### 1. Importación

```tsx
import { useBackground } from '@shared/hooks/use-background';
```

---

### 2. Uso básico

```tsx
const [bg, setBg] = useBackground();

const changeBg = () => {
  setBg('assets/images/backgrounds/seccion-1.jpg');
};
```

---

### 3. Uso en un elemento específico

Si no quieres aplicar el fondo al `body`, puedes pasar una referencia de otro elemento:

```tsx
const containerRef = useRef<HTMLDivElement>(null);
const [bg, setBg] = useBackground(containerRef.current);
```

---

## Parámetros

| Parámetro | Tipo | Descripción |
|---|---|---|
| `parentElement` | `HTMLElement \| null` | El elemento al que se le aplicará el estilo. Por defecto es `document.body`. |

## Retorno

Devuelve un arreglo con dos elementos similares a `useState`:

| Índice | Nombre sugerido | Tipo | Descripción |
|---|---|---|---|
| `0` | `background` | `string \| null` | La URL de la imagen de fondo actual. |
| `1` | `setBackground` | `Function` | Función para establecer la nueva URL de la imagen. |

## Detalles Técnicos

- **Variable CSS:** El hook inyecta la propiedad `--bg-image` con el formato `url(ruta)`. Asegúrate de que tus archivos CSS utilicen esta variable, por ejemplo:
  ```css
  body {
    background-image: var(--bg-image);
    background-size: cover;
  }
  ```
- **Limpieza:** Al desmontar el componente, la variable `--bg-image` se elimina automáticamente.

:::tip[Imágenes]
Se recomienda usar rutas relativas a la carpeta `public` o `assets` definida en tu proyecto para asegurar que las imágenes carguen correctamente en producción.
:::

