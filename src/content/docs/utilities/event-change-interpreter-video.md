---
title: Cambio de video del intérprete
description: Función utilitaria para despachar eventos que cambian dinámicamente el video del intérprete de señas.
---

`eventChangeInterpreterVideo` es una utilidad diseñada para despachar un evento personalizado (`CHANGEINTERPRETEVIDEOSOURCES`) a nivel global (`document`). Su propósito es permitir que cualquier componente del OVA solicite un cambio en las fuentes de video del componente Intérprete (Lengua de Señas) de manera reactiva.

## Cómo funciona

Esta utilidad no renderiza nada; simplemente notifica al ecosistema del OVA que el intérprete debe cargar un nuevo video de contenido o de accesibilidad. El componente del intérprete, que escucha este evento, actualizará su fuente de video automáticamente.

## Implementación y Uso

### 1. Importación

Importa la utilidad en el componente donde necesites disparar el cambio de video (por ejemplo, al entrar a una sección nueva o al completar una interacción):

```tsx
import { eventChangeInterpreterVideo } from '@shared/utils/event-change-interpreter-video';
```

---

### 2. Uso básico

Simplemente llama a la función pasando un objeto con las nuevas URLs. Puedes pasar ambas o solo una de ellas:

```tsx
const handleUpdateVideo = () => {
  eventChangeInterpreterVideo({
    contentURL: 'assets/videos/interpreter/video-explicativo-2.mp4',
    a11yURL: 'assets/videos/interpreter/a11y-explicativo-2.mp4'
  });
};
```

---

### 3. Ejemplo en un contexto real (Efecto de carga)

Es común usar esta utilidad dentro de un `useEffect` para asegurar que, al cargar una página o pantalla específica, el intérprete se sincronice con el contenido visual:

```tsx
import { useEffect } from 'react';
import { eventChangeInterpreterVideo } from '@shared/utils/event-change-interpreter-video';

export const MiSeccionOVA = () => {
  useEffect(() => {
    // Al montar la sección, cambiamos el video del intérprete
    eventChangeInterpreterVideo({
      contentURL: 'assets/videos/content/intro-seccion-4.mp4'
    });
  }, []);

  return (
    <div>
      {/* Contenido de la sección */}
    </div>
  );
};
```

---

## Parámetros de la Función

La función acepta un objeto basado en el tipo `VideoURLs`:

| Parámetro | Tipo | Descripción |
|---|---|---|
| `contentURL` | `string` (opcional) | La URL del video que contiene la interpretación del tema principal o narración activa. |
| `a11yURL` | `string` (opcional) | La URL del video enfocado específicamente a accesibilidad o descripciones adicionales. |

## Evento Interno

La utilidad emite un `CustomEvent` con la siguiente configuración:

- **Nombre del Evento:** `CHANGEINTERPRETEVIDEOSOURCES` (definido en las constantes del proyecto).
- **Detalle (`detail`):** 
  ```ts
  {
    accesibilityURL: a11yURL,
    contentURL: contentURL
  }
  ```

:::caution[Escucha del evento]
Para que esta utilidad surta efecto, el componente **Interpreter** debe estar montado en el layout del OVA, ya que es él quien posee el listener para este evento.
:::
