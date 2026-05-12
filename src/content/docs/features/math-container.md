---
title: Math Container
description: Componente para renderizar fórmulas matemáticas complejas utilizando LaTeX y MathJax.
---

El componente `MathContainer` permite la visualización de notación matemática científica dentro del OVA. Utiliza la librería `MathJax` para renderizar código LaTeX de forma elegante y accesible, incluyendo soporte para colores y escalado automático según el dispositivo.

## Características Principales
- **Soporte LaTeX:** Renderiza fórmulas envueltas automáticamente en delimitadores `\\( ... \\)` si se pasa un string.
- **Paquete de Colores:** Configurado para soportar el paquete `color` de TeX, permitiendo resaltar partes específicas de una ecuación.
- **Responsividad:** Ajusta automáticamente el tamaño de fuente en dispositivos móviles mediante Media Queries para asegurar la legibilidad de las fórmulas.

## Cómo implementar

Puedes pasar la fórmula directamente como un string de LaTeX o como nodos secundarios.

### Ejemplo básico

```tsx
import { MathContainer } from '@features';

const MyMathSection = () => {
  return (
    <div>
      <p>La fórmula cuadrática es:</p>
      <MathContainer>
        x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
      </MathContainer>
    </div>
  );
};
```

---

## Parámetros

### `MathContainer`

| Prop | Tipo | Descripción | Default |
|---|---|---|---|
| `children` | `React.ReactNode` | **(Requerido)** El contenido a renderizar. Si es un `string`, se tratará como LaTeX puro. | `-` |
| `className` | `string` | Clase CSS adicional para el contenedor de la fórmula. | `undefined` |

---

## Estructura de Clases CSS

- `.mathContainer`: Clase principal aplicada al contenedor de MathJax.
- **Responsive:**
    - En pantallas `< 768px`, reduce el tamaño de fuente a `--fs-300`.
    - En pantallas `< 568px`, reduce el tamaño de fuente a `--fs-200`.

## Configuración Técnica

Internamente, el componente utiliza `MathJaxContext` con la siguiente configuración:
- `loader`: Carga el paquete `[tex]/color`.
- `tex`: Habilita el paquete `color` para permitir comandos como `\color{red}{x}`.
- Inline: Por defecto, fuerza el estilo `display: initial` para integrarse mejor con el flujo de texto si es necesario.
