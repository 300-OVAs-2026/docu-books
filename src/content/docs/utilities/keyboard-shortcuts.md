---
title: Atajos de teclado
description: Utilidad para gestionar accesos rápidos mediante combinaciones de teclas en el OVA.
---

`keyboardShortcuts` es una utilidad diseñada para mejorar la eficiencia y accesibilidad del OVA, permitiendo al usuario interactuar con elementos clave de la interfaz mediante combinaciones de teclas.

## Cómo funciona

La función escucha eventos de teclado y verifica si se están presionando las teclas modificadoras **Ctrl + Alt**. Si la combinación coincide con una de las teclas programadas, la utilidad busca un elemento específico en el DOM mediante una clase CSS pre definida (ej. `.js-menu-navigation`) y simula un clic en él.

## Atajos Disponibles

Actualmente, el sistema admite los siguientes comandos (siempre presionando al mismo tiempo `Ctrl + Alt`):

| Tecla | Acción | Selector CSS objetivo |
|---|---|---|
| **D** | Abre/Cierra el menú de navegación. | `.js-menu-navigation` |
| **C** | Regresa al Inicio (Home). | `.js-link-home` |
| **A** | Abre el panel de Accesibilidad. | `.js-button-a11y` |
| **H** | Abre la sección de Ayuda. | `.js-button-help` |

---

## Implementación y Uso

### 1. Importación

Importa la utilidad en tu componente raíz o en el layout principal donde se gestionen los eventos globales:

```tsx
import { keyboardShortcuts } from '@shared/utils/keyboard-shortcuts';
```

---

### 2. Uso en el componente principal

Para que los atajos funcionen en todo el OVA, se debe registrar un "escuchador" de eventos en el `window` o en el contenedor principal:

```tsx
import { useEffect } from 'react';
import { keyboardShortcuts } from '@shared/utils/keyboard-shortcuts';

export const MainLayout = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => keyboardShortcuts(e);
    
    // Escuchar el evento de tecla presionada
    window.addEventListener('keydown', handleKeyDown);

    // Limpiar el evento al desmontar
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div>
       {/* El contenido del OVA */}
    </div>
  );
};
```

---

## Parámetros

| Parámetro | Tipo | Descripción |
|---|---|---|
| `event` | `KeyboardEvent` | El evento de teclado estándar de JavaScript/React que contiene la información de las teclas presionadas. |

## Notas de Integración

:::caution[Clases obligatorias]
Para que los atajos funcionen, los componentes de la interfaz (Botones de menú, ayuda, etc.) deben tener asignadas las clases `js-` correspondientes mencionadas en la tabla de atajos. Sin estas clases, la utilidad no podrá encontrar el elemento para hacer clic.
:::

:::tip[Accesibilidad]
Estos atajos son extremadamente útiles para usuarios expertos o con movilidad reducida que prefieren no usar el ratón para navegar por las herramientas principales del OVA.
:::

