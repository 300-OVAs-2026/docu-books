---
title: Movimiento Reducido
description: Hook para detectar la preferencia del sistema operativo del usuario sobre animaciones y movimientos.
---

`useReduceMotion` es un hook de accesibilidad que detecta si el usuario ha activado la opción de **"Reducir movimiento"** en la configuración de su sistema operativo o navegador. Es fundamental para ofrecer una experiencia cómoda a usuarios con trastornos vestibulares o sensibilidad al movimiento.

## Cómo funciona

El hook utiliza la API nativa `window.matchMedia` con la consulta CSS `(prefers-reduced-motion: reduce)`. Además de detectar el estado inicial, se suscribe a los cambios en esta configuración, permitiendo que la interfaz del OVA reaccione instantáneamente si el usuario cambia su preferencia mientras navega.

---

## Implementación y Uso

### 1. Importación

```tsx
import { useReduceMotion } from '@shared/hooks/use-reduce-motion';
```

---

### 2. Uso básico

Se utiliza para condicionar la renderización de animaciones complejas o efectos visuales:

```tsx
const shouldReduceMotion = useReduceMotion();

return (
  <div className={shouldReduceMotion ? 'fade-in' : 'slide-and-bounce'}>
    {shouldReduceMotion ? (
      <p>Contenido estático (más accesible)</p>
    ) : (
      <Canvas3DAnimation />
    )}
  </div>
);
```

---

## Retorno

| Tipo | Descripción |
|---|---|
| `boolean` | Devuelve `true` si el usuario prefiere reducir el movimiento, de lo contrario devuelve `false`. |

## Detalles Técnicos

- **Media Query:** Se basa en el estándar `prefers-reduced-motion`.
- **Suscripción:** Implementa un `addEventListener` sobre la consulta de medios para actualizar el estado de React de forma eficiente.
- **SSR Safe:** Aunque utiliza `window`, el estado inicial se calcula de forma segura para evitar errores en entornos de servidor.

:::tip[Accesibilidad Primero]
Al usar bibliotecas de animación como Framer Motion o GSAP, puedes pasar el valor de este hook para desactivar automáticamente las transiciones en todo el componente. 
:::

:::note[Relación con A11y Overlay]
Este hook detecta la preferencia a nivel de **sistema operativo**. Para detectar la preferencia específica dentro del panel de accesibilidad del OVA, se recomienda usar el hook `useA11yAttribute`.
:::

