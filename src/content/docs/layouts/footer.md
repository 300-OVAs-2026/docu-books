---
title: Footer
description: Componente de pie de página del OVA. Muestra el botón de navegación al menú principal.
---

`Footer` es el componente de pie de página que aparece en todas las páginas del OVA. Renderiza un botón animado con ícono SVG que lleva al estudiante al menú principal del OVA. Se adapta automáticamente al idioma configurado en el store.

## Cómo implementarlo

`Footer` no recibe props — se configura solo a través del store del OVA:

```tsx
import { Footer } from '@layouts';

const OvaTemplatep01 = () => {
  return (
    <>
      <Content>
        {/* contenido de la página */}
      </Content>
      <Footer />
    </>
  );
};
```

## Qué hace internamente

- **Botón al menú** — renderiza un `Link` a `/menu` con un ícono SVG animado y el texto del botón en el idioma actual del OVA
- **Idioma automático** — lee el `lang` del `useOvaStore` y muestra el texto del botón en el idioma configurado, sin necesidad de pasarlo como prop
- **Forma decorativa** — incluye un SVG con una forma recortada (`clipPath`) que define la silueta visual característica del footer

:::note[No necesita props]
`Footer` lee todo lo que necesita directamente del store. Solo impórtalo y úsalo — no hay nada que configurar.
:::