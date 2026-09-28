---
title: Actualización de títulos
description: Función utilitaria para despachar eventos que actualizan el título del OVA dinámicamente.
---

`eventUpdateTitle` es una utilidad diseñada para despachar un evento personalizado (`OVATITLEUPDATE`) a nivel de `document`. Su función principal es permitir la actualización dinámica del título de la lección o sección actual dentro del encabezado (Header) o la barra de títulos del OVA.

## Cómo funciona

Al igual que otras utilidades de eventos del ecosistema, `eventUpdateTitle` actúa como un mensajero. Envía el nuevo texto del título a través de un evento global que es capturado por el componente de la interfaz (normalmente el `Header` o un componente de accesibilidad) encargado de mostrar el nombre del tema actual al estudiante.

## Implementación y Uso

### 1. Importación

Importa la utilidad en cualquier archivo `.tsx` de tu OVA:

```tsx
import { eventUpdateTitle } from '@shared/utils/event-update-title';
```

---

### 2. Uso básico

Llama a la función pasando el nuevo string que deseas mostrar como título:

```tsx
const changeSection = () => {
    // ... lógica de navegación
    eventUpdateTitle('Introducción a la Biotecnología');
};
```

---

### 3. Ejemplo común (Uso en navegación)

Se implementa frecuentemente dentro de un `useEffect` para asegurar que el título cambie automáticamente cuando el usuario llega a una pantalla específica:

```tsx
import { useEffect } from 'react';
import { eventUpdateTitle } from '@shared/utils/event-update-title';

export const SeccionDos = () => {
  useEffect(() => {
    // Actualiza el título del OVA al entrar en esta sección
    eventUpdateTitle('Unidad 1: Conceptos Básicos');
  }, []);

  return (
    <section>
      {/* Contenido de la unidad */}
    </section>
  );
};
```

---

## Parámetros de la Función

| Parámetro | Tipo | Descripción |
|---|---|---|
| `title` | `string` | El nuevo texto del título que se notificará al sistema. |

## Detalles Técnicos

La utilidad emite un `CustomEvent` con los siguientes parámetros:

- **Nombre del Evento:** `OVATITLEUPDATE` (gestionado desde las constantes de eventos).
- **Detalle (`detail`):** 
  ```ts
  {
    title: string // El nuevo título recibido como argumento
  }
  ```

:::tip[Accesibilidad]
El uso de esta utilidad es fundamental para la accesibilidad, ya que permite que los lectores de pantalla o los elementos de navegación informen correctamente al usuario sobre su ubicación actual dentro de la estructura del OVA.
:::
