---
title: Atrapa Foco (Focus Trap)
description: Hook para restringir la navegación por teclado dentro de un contenedor específico.
---

`useFocusTrap` es un hook de accesibilidad esencial para componentes modales, diálogos o menús desplegables. Su función es "encerrar" el foco del teclado (tecla Tab) dentro de un contenedor, evitando que el usuario navegue accidentalmente por el contenido que está detrás del componente activo.

## Cómo funciona

Cuando el hook se activa:
1.  **Guarda el foco actual:** Registra qué elemento tenía el foco antes de abrir el contenedor.
2.  **Enfoca el inicio:** Pone el foco automáticamente en el primer elemento interactivo dentro del contenedor.
3.  **Cicla la navegación:** Si el usuario llega al último elemento y presiona `Tab`, el foco regresa al primero. Si presiona `Shift + Tab` en el primero, salta al último.
4.  **Restauración:** Al desactivarse, devuelve el foco al elemento que lo tenía originalmente.
5.  **Escape:** Permite cerrar el contenedor presionando la tecla `Esc` (si se provee el callback necesario).

## Implementación y Uso

### 1. Importación

```tsx
import { useFocusTrap } from '@shared/hooks/use-focus-trap';
```

---

### 2. Uso básico en un Modal

```tsx
export const MiModal = ({ isOpen, onClose }) => {
  // Pasamos el estado de activación y la función de cierre
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={containerRef}>
        <h2>Atención</h2>
        <p>¿Estás seguro de realizar esta acción?</p>
        <button onClick={onClose}>Cancelar</button>
        <button onClick={handleConfirm}>Confirmar</button>
      </div>
    </div>
  );
};
```

---

## Parámetros

| Parámetro | Tipo | Descripción |
|---|---|---|
| `isActive` | `boolean` | Determina si el atrapamiento de foco está habilitado. |
| `onClose` | `Function` (opcional) | Función que se ejecutará cuando el usuario presione la tecla `Escape`. |

## Retorno

Devuelve una `MutableRefObject` (referencia de React) que debe ser asignada al elemento contenedor que servirá como "celda" para el foco.

## Detalles Técnicos

- **Selectores de Foco:** El hook detecta automáticamente enlaces (`a`), botones, inputs, selects, textareas y cualquier elemento con un `tabindex` mayor o igual a 0.
- **Limpieza de Eventos:** El hook gestiona internamente la creación y eliminación de los escuchadores de eventos (`keydown`) para evitar fugas de memoria.

:::warning[Uso de Referencia]
Es obligatorio asignar el `ref` retornado por el hook al contenedor principal de tu componente. Sin esta referencia, el hook no podrá encontrar los elementos internos para gestionar el ciclo de navegación.
:::

:::tip[Accesibilidad]
El uso de un Focus Trap es un criterio de éxito en las pautas WCAG para cualquier contenido modal, ya que evita que usuarios de teclado o lectores de pantalla se pierdan en el contenido de fondo.
:::
