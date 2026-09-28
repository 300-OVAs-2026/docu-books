---
title: Registro de Atajos
description: Hook de ciclo de vida para activar o desactivar los atajos de teclado globales del OVA.
---

`useKeyboardShortcuts` es un hook de conveniencia que facilita la activación de los atajos de teclado definidos en la utilidad `keyboardShortcuts`. Se encarga de gestionar el ciclo de vida de los eventos de teclado para evitar fugas de memoria.

## Cómo funciona

El hook registra un "escuchador" de eventos `keydown` en el `body` del documento. Cuando el usuario presiona una tecla, se ejecuta la lógica central de atajos. Si el hook recibe el parámetro `isDisabled` como `true`, el escuchador se elimina automáticamente, permitiendo desactivar los atajos en pantallas o momentos específicos del OVA (por ejemplo, durante un examen o una actividad de escritura).

## Implementación y Uso

### 1. Importación

```tsx
import { useKeyboardShortcuts } from '@shared/hooks/use-keyboard-shortcuts';
```

---

### 2. Uso básico (Activación global)

Se recomienda usarlo en el componente principal de la aplicación o en el layout:

```tsx
export const AppProvider = ({ children }) => {
  // Activa los atajos automáticamente al cargar la aplicación
  useKeyboardShortcuts();

  return <>{children}</>;
};
```

---

### 3. Desactivación condicional

```tsx
export const SeccionEscritura = () => {
  // Desactivamos los atajos globales para que no interfieran con un input
  useKeyboardShortcuts(true);

  return (
    <textarea placeholder="Escribe tu respuesta aquí..." />
  );
};
```

---

## Parámetros

| Parámetro | Tipo | Descripción |
|---|---|---|
| `isDisabled` | `boolean` | (Opcional) Si es `true`, los atajos se desactivarán. Por defecto es `false`. |

## Detalles Técnicos

- **Gestión de Eventos:** Utiliza `useEffect` para añadir el evento `keydown` al montar el componente y, lo más importante, utiliza la función de limpieza (`clean-up`) para removerlo al desmontar.
- **Relación con Utils:** Este hook es el ejecutor de la lógica definida en [Atajos de teclado](/utilities/keyboard-shortcuts).

:::caution[Interferencia con inputs]
Si tienes formularios o campos de texto donde el usuario use mucho las teclas rápidas, considera desactivar los atajos globales usando `isDisabled={true}` para evitar que se disparen acciones accidentales.
:::

