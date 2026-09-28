---
title: Gestión del Intérprete (LSC)
description: Hook para sincronizar y persistir el contenido del intéprete de lengua de señas.
---

`useInterpreter` es un hook especializado para gestionar los videos del intérprete de lengua de señas en el OVA. Permite actualizar los videos de contenido y accesibilidad, persistir fuentes de video específicas y sincronizar estos cambios con el componente global del intérprete.

## Cómo funciona

Este hook centraliza la lógica de comunicación con el sistema del intérprete. Utiliza internamente `useSessionStorage` para recordar qué videos deben mostrarse (en modo fijo) y dispara eventos globales para que el componente visual del intérprete actualice sus fuentes de manera instantánea.

## Implementación y Uso

### 1. Importación

```tsx
import { useInterpreter } from '@shared/hooks/use-interpreter';
```

---

### 2. Actualización de videos

Puedes actualizar los videos al entrar a una sección o al activar una interacción específica:

```tsx
const [updateVideo] = useInterpreter();

const handleSectionStart = () => {
  updateVideo({
    contentURL: 'seccion-1/contenido.mp4',
    a11yURL: 'seccion-1/accesibilidad.mp4',
    mode: 'dynamic' // 'fixed' para que persista al recargar, 'dynamic' para cambios temporales
  });
};
```

---

## Modos de Almacenamiento

El objeto que recibe la función de actualización puede incluir un `mode`:

- `fixed`: Las URLs se guardan en el `sessionStorage`. Si el usuario recarga la página, el intérprete volverá a cargar estos videos automáticamente.
- `dynamic`: Las URLs se envían al intérprete pero NO se guardan permanentemente. Es útil para videos cortos o feedbacks temporales.

---

## Retorno

El hook devuelve un arreglo con tres elementos:

| Índice | Nombre sugerido | Tipo | Descripción |
|---|---|---|---|
| `0` | `updateVideoSources` | `Function` | Función para establecer nuevos videos. |
| `1` | `restoreLastSources` | `Function` | Función para recargar los últimos videos guardados en `fixed`. |
| `2` | `sources` | `VideoURLs` | El objeto actual con las URLs de los videos. |

## Detalles Técnicos

- **Base URL:** El hook utiliza una variable de entorno (`VITE_INTERPRETER_URL`) o una ruta por defecto (`assets/videos/interprete/`) para construir la ruta final de los archivos.
- **Sincronización:** Emite el evento personalizado `eventChangeInterpreterVideo` para notificar al componente UI del intérprete.

:::tip[Ruta de Archivos]
Al pasar las URLs a `updateVideo`, solo necesitas pasar el nombre del archivo o la subcarpeta a partir de la ruta base del intérprete (ej: `tema-1/video.mp4`).
:::

