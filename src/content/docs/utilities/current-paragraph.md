---
title: Párrafo actual (Lectura dinámica)
description: Utilidad para reconstruir y leer párrafos que contienen elementos interactivos (Drag and Drop).
---

`currentParagraph` es una utilidad avanzada diseñada para facilitar la accesibilidad en actividades de completar textos. Su función es reconstruir una cadena de texto completa a partir de un contenedor que mezcla párrafos estáticos con elementos interactivos de tipo "droppable".

## Cómo funciona

Esta utilidad recorre un contenedor específico buscando etiquetas `<p>` y `<div>` marcados como interactivos. Si encuentra un espacio donde el estudiante debe soltar una respuesta, la utilidad inserta dinámicamente el texto de la respuesta seleccionada o un aviso de "espacio en blanco". Esto permite que los lectores de pantalla puedan leer la oración completa con la opción que el usuario acaba de elegir.

## Implementación y Uso

### 1. Importación

```tsx
import { currentParagraph } from '@shared/utils/current-paragraph';
```

---

### 2. Uso básico

Se utiliza generalmente dentro de componentes de **Drag and Drop** para generar el texto que se enviará al lector de voz o al sistema de anuncios de accesibilidad:

```tsx
const textToRead = currentParagraph({
  id: 'droppable-1',
  label: 'Respuesta seleccionada',
  container: containerRef.current
});
```

---

## Parámetros

La función recibe un objeto con las siguientes propiedades:

| Propiedad | Tipo | Descripción |
|---|---|---|
| `id` | `string` | El identificador único del espacio "droppable" que se está procesando. |
| `label` | `string` (opcional) | El texto de la respuesta que el usuario ha colocado en el espacio. |
| `container` | `HTMLDivElement \| null` | La referencia al elemento del DOM que contiene todo el párrafo y los espacios. |

## Detalles Técnicos

La utilidad sigue esta lógica:
1.  **Selección:** Busca todos los elementos `p` y los `div` que tengan el atributo `data-type-component="droppable"`.
2.  **Concatenación:** 
    - Si es un párrafo normal, añade su texto.
    - Si es un espacio interactivo (`droppable`) y coincide con el `id` pasado, añade el `label` (la respuesta).
    - Si no coincide con el `id` o está vacío, añade "espacio en blanco".
3.  **Resultado:** Devuelve un `string` único con la frase armada.

:::tip[Uso con Lectores de Pantalla]
Esta utilidad es vital para que un usuario con discapacidad visual pueda escuchar cómo queda su frase armada después de mover una palabra, proporcionando feedback inmediato sobre si su elección tiene sentido gramatical.
:::

