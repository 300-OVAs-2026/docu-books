---
title: Actualizar Título
description: Hook de ciclo de vida para sincronizar el título del OVA al montar un componente o sección.
---

`useTitle` es un hook decorador que envuelve la funcionalidad de la utilidad `eventUpdateTitle`. Su propósito es facilitar la actualización del título del OVA aprovechando el ciclo de vida de los componentes de React.

## Cómo funciona

En lugar de llamar manualmente a la utilidad de evento, este hook se encarga de disparar la actualización automáticamente cuando el componente se renderiza por primera vez o cuando el valor del título cambia. Esto asegura que el encabezado del OVA siempre esté sincronizado con la sección visible.

## Implementación y Uso

### 1. Importación

```tsx
import { useTitle } from '@shared/hooks/use-title';
```

---

### 2. Uso básico

Simplemente llama al hook dentro de tu componente de sección pasando el texto deseado:

```tsx
export const SeccionIntroduccion = () => {
  // El título se actualizará automáticamente al cargar esta sección
  useTitle('Bienvenida al curso');

  return (
    <section>
      <h1>Introducción</h1>
      {/* Contenido */}
    </section>
  );
};
```

---

## Parámetros

| Parámetro | Tipo | Descripción |
|---|---|---|
| `title` | `string` (opcional) | El texto que se enviará al sistema de títulos. Si no se proporciona, no se emitirá ninguna actualización. |

## Detalles Técnicos

- **Dependencia de Utilidad:** Este hook utiliza internamente `eventUpdateTitle`.
- **Reactivity:** El hook incluye `title` en su arreglo de dependencias de `useEffect`, lo que significa que si el título cambia dinámicamente (por ejemplo, basado en un estado), el sistema lo reflejará de inmediato.

:::tip[Buenas Prácticas]
Es recomendable usar este hook en el componente de "nivel superior" de cada pantalla o página del OVA. Esto garantiza que el estudiante siempre tenga claro en qué tema se encuentra al navegar.
:::

