---
title: Dev Toolbar
description: Herramienta flotante para desarrolladores u administradores del OVA.
---

El componente `DevToolbar` ("OVA - Dev Tools") es una barra lateral colapsable (con estilo de burbuja flotante inferior izquierda) exclusiva de desarrollo. Facilita una manera rápida de reiniciar el estado global o borrar persistencias sin tener que abrir la consola del navegador.

## Cómo implementar

El componente es autónomo y no requiere `props`. Suele importarse silenciosamente en un punto principal de la APP y, a menudo, condicionando su renderizado sólo al entorno de `development`. Conecta el reseteo llamando a `useGamificationStore` y `useOvaStore`.

### Ejemplo básico

```tsx
import { DevToolbar } from '@features';

const AppLayout = ({ children }) => {
  return (
    <>
      {children}
      {/* Solo se mostrará si no hay variables que asuman que es producción, o la inyectas siempre en QA. */}
      {import.meta.env.DEV && <DevToolbar />}
    </>
  );
};
```

---

## Funcionalidades Dev incluidas

Las siguientes acciones reinician la memoria del usuario invocando métodos desde Zustand para poder volver a probar el material desde 0 en modo Desarrollador:

1. **Reset Gamification:** Limpia el puntaje, estrellas guardadas, e intentos fallidos persistentes en local-storage manejados en `useGamificationStore`.
2. **Reset OVA:** Resetea las hojas visitadas y limpia el estado global en `useOvaStore` incluyendo datos sobre el avance de lectura.

---

## Parámetros

### `DevToolbar`

Al ser autónomo y actuar como un _Floating Widget_, no recibe `Props`.

| Prop | Tipo | Descripción |
|---|---|---|
| `-` | `-` | No aplica. |

---

## Estructura de Clases CSS

El componente utiliza módulos CSS con tipografía **monospace** estilo terminal:

- `.wrapper`: Contenedor principal anclado _fixed_ (bottom-left) y declara variables CSS (`--dev-bg`, `--dev-accent`, etc.).
- `.toggle`: El botón principal que muestra el texto `DEV`. Intercala clase modificadora `.toggle--open`.
- `.panel`: Menú o panel flotante que se despliega con efecto (keyframe animado `.slideUp`).
- `.panel-label`: Título del panel.
- `.panel-button`: Los botones dentro del menú para resetear datos.
- `.panel-divider`: Línea separadora.
