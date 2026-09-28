---
title: Pantalla Completa (Fullscreen)
description: Hook para controlar el estado de pantalla completa de elementos específicos.
---

`useFullScreen` es una utilidad que envuelve la [API de Fullscreen](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) de manera reactiva. Permite expandir elementos (como juegos, videos o toda la lección) a pantalla completa y sincronizar ese estado con la interfaz de React.

## Cómo funciona

El hook busca un elemento por su ID y gestiona tanto la solicitud para entrar en pantalla completa (`requestFullscreen`) como la salida (`exitFullscreen`). Además, escucha el evento global de cambio de pantalla de modo que, si el usuario presiona la tecla `F11` o `Esc`, el estado `isFullScreen` del hook se actualice automáticamente.

## Implementación y Uso

### 1. Importación

```tsx
import { useFullScreen } from '@shared/hooks/use-full-screen';
```

---

### 2. Uso básico

```tsx
const [isFullScreen, toggleFullScreen] = useFullScreen('container-id');

return (
  <div id="container-id">
    <button onClick={toggleFullScreen}>
      {isFullScreen ? 'Salir de pantalla completa' : 'Ver en pantalla completa'}
    </button>
  </div>
);
```

---

## Parámetros

| Parámetro | Tipo | Descripción |
|---|---|---|
| `uid` | `string` | El ID ("id") del elemento HTML que se desea expandir. |

## Retorno

Devuelve un arreglo con dos elementos:

| Índice | Nombre sugerido | Tipo | Descripción |
|---|---|---|---|
| `0` | `isFullScreen` | `boolean` | Indica si el elemento está actualmente en pantalla completa. |
| `1` | `toggleFullScreen` | `Function` | Función para alternar (abrir/cerrar) el modo de pantalla completa. |

## Detalles Técnicos

- **Detección Automática:** Utiliza un listener en `fullscreenchange` para asegurar que el estado sea verídico incluso si la acción no fue disparada por la función `toggleFullScreen`.
- **Manejo de Errores:** Incluye verificaciones para confirmar que el elemento con el ID proporcionado realmente existe en el DOM antes de intentar la operación.

:::caution[Interacción del Usuario]
Por seguridad del navegador, la función `toggleFullScreen` solo puede dispararse como resultado de una acción directa del usuario (como un clic). No se puede activar automáticamente mediante un efecto de carga (`useEffect`).
:::

