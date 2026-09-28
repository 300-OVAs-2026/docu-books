---
title: Foco en el elemento principal
description: Función utilitaria para mover el foco del teclado al contenedor principal del OVA.
---

`focusMainElement` es una utilidad diseñada para gestionar la accesibilidad del teclado dentro del OVA. Su función exclusiva es buscar el elemento `<main>` con el ID `main` y otorgarle el foco de manera programática.

## Por qué es importante

En aplicaciones de una sola página (SPA) o sistemas de lecciones dinámicas, cuando el usuario cambia de una pantalla a otra, el foco del teclado suele quedarse en el último botón presionado. Esto es un error de accesibilidad para usuarios que usan lectores de pantalla o navegación por teclado. 

Usar `focusMainElement` asegura que el usuario sea "teletransportado" al principio del contenido nuevo, permitiéndole empezar a leer la lección desde arriba sin tener que navegar manualmente por todo el menú de nuevo.

## Implementación y Uso

### 1. Importación

Importa la utilidad en tu archivo `.tsx`:

```tsx
import { focusMainElement } from '@shared/utils/focus-main';
```

---

### 2. Uso básico

Llama a la función después de una navegación o un cambio de vista:

```tsx
const handleNextPage = () => {
  // ... lógica para cambiar la página
  focusMainElement();
};
```

---

### 3. Ejemplo común (Uso en navegación)

Se suele usar dentro de un `useEffect` cuando una sección se monta para asegurar que el foco se reinicie:

```tsx
import { useEffect } from 'react';
import { focusMainElement } from '@shared/utils/focus-main';

export const NuevaSeccion = () => {
  useEffect(() => {
    // Al cargar esta sección, ponemos el foco en el contenido principal
    focusMainElement();
  }, []);

  return (
    <main id="main" tabIndex={-1}>
      <h1>Título de la Lección</h1>
      <p>Contenido educativo...</p>
    </main>
  );
};
```

---

## Parámetros

Esta función no recibe parámetros.

## Detalles Técnicos

La utilidad realiza las siguientes acciones:

1.  Busca en el DOM el elemento `main#main`.
2.  Si el elemento existe, llama al método `.focus()`.

:::tip[Requisito Técnico]
Para que esta función tenga éxito, el elemento receptor (normalmente tu contenedor `<main>`) debe tener el atributo `id="main"` y, preferiblemente, `tabIndex={-1}` para que sea enfocable por código pero no estorbe en la navegación normal con la tecla Tab.
:::

