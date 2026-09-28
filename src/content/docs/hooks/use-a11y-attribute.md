---
title: Observador de Accesibilidad
description: Hook personalizado para detectar y reaccionar a cambios en las preferencias de accesibilidad del usuario.
---

`useA11yAttribute` es un hook diseñado para sincronizar el estado de los componentes con las preferencias de accesibilidad configuradas en el OVA. Utiliza un `MutationObserver` para escuchar cambios en los atributos del elemento `<html>` y devolver un objeto de configuración actualizado en tiempo real.

## Cómo funciona

El sistema de accesibilidad del OVA (A11y Overlay) guarda las preferencias del usuario (como modo oscuro, contraste alto o tamaño de fuente) aplicando atributos `data-*` directamente en la etiqueta `<html>`. 

Este hook "vigila" esos atributos. Cuando el usuario cambia una opción en el panel de accesibilidad, el hook detecta el cambio, convierte el valor (ej. de cadena "true" a booleano `true`) y actualiza el estado local del componente que lo esté usando.

## Atributos Observados

El hook monitorea los siguientes parámetros:

- `data-dark-mode`: Estado del modo oscuro.
- `data-stop-animations`: Preferencia para reducir movimiento.
- `data-keyboard-shortcuts`: Activación de atajos de teclado.
- `data-contrast`: Nivel de contraste aplicado.
- `data-font-size`: Ajuste del tamaño de texto.
- `data-line-height`: Ajuste del interlineado.
- `data-letter-spacing`: Ajuste del espaciado entre letras.
- `data-audio`: Estado de las asistencias de audio.

---

## Implementación y Uso

### 1. Importación

```tsx
import { useA11yAttribute } from '@shared/hooks/use-a11y-attribute';
```

---

### 2. Uso básico

Al llamar al hook, obtienes un objeto con todas las preferencias actuales:

```tsx
const a11yConfig = useA11yAttribute();

// Ejemplo de uso:
return (
  <div style={{ fontSize: a11yConfig.fontSize }}>
    {a11yConfig.darkMode ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
    {a11yConfig.stopAnimations && <p>Las animaciones están pausadas</p>}
  </div>
);
```

---

## Retorno

El hook devuelve un objeto de tipo `ConfigA11y` que incluye:

| Propiedad | Tipo | Descripción |
|---|---|---|
| `darkMode` | `boolean` | Indica si el modo oscuro está activo. |
| `stopAnimations` | `boolean` | Indica si se deben detener las animaciones. |
| `fontSize` | `string` | El tamaño de fuente seleccionado (ej. "large"). |
| `contrast` | `string` | El tipo de contraste aplicado. |
| `...` | `...` | El resto de propiedades de accesibilidad convertidas a camelCase. |

## Detalles Técnicos

- **MutationObserver:** El hook crea una instancia de observador que apunta al `document.querySelector('html')`. Esto garantiza que el componente reaccione incluso si el cambio de configuración ocurre fuera de la jerarquía de React.
- **CamelCase:** Los atributos de HTML (kebab-case como `data-dark-mode`) se transforman automáticamente a propiedades de objeto (camelCase como `darkMode`).
- **Saneamiento:** Los valores de texto `"true"` y `"false"` se convierten a valores booleanos nativos de JavaScript.

:::tip[Uso Recomendado]
Utiliza este hook en componentes que necesiten renderizar contenido diferente o aplicar estilos específicos basados estrictamente en las opciones de accesibilidad del estudiante.
:::

