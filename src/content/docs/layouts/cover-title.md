---
title: Cover Title
description: Componente de portada del OVA. Muestra el título, los audios de accesibilidad y el botón para entrar al contenido.
---

`CoverTitle` es el componente de portada de cada OVA. Muestra el título principal, conecta el intérprete de lengua de señas, aplica la imagen de fondo y renderiza un botón de navegación que lleva al estudiante al menú o a la selección de avatar según su estado.

## Cómo implementarlo

### Uso básico

```tsx
import { CoverTitle } from '@layouts';

const Cover = () => {
  return (
    <CoverTitle title="Nombre del OVA" />
  );
};
```

---

### Con audio e intérprete

El uso más común incluye los audios de accesibilidad y los videos del intérprete:

```tsx
import { CoverTitle } from '@layouts';

const Cover = () => {
  return (
    <CoverTitle
      title="Gestión de <strong>Relaciones Internacionales</strong>"
      audio={{
        a11y: 'assets/audios/aud_des_ova-01_portada.mp3',
        title: 'assets/audios/aud_ova-01_portada.mp3'
      }}
      interpreter={{
        a11yURL: 'vid_int_des_ova-01_portada.mp4',
        contentURL: 'vid_int_ova-01_portada.mp4'
      }}
    />
  );
};
```

---

### Con imagen de fondo personalizada

Por defecto usa `assets/base/background-cover.webp`. Puedes cambiarlo con `url`:

```tsx
<CoverTitle
  title="Nombre del OVA"
  url="assets/images/mi-fondo-portada.webp"
  audio={{ ... }}
  interpreter={{ ... }}
/>
```

---

## Props

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `title` | `string` | ✓ | Título principal del OVA. Acepta HTML (ej: `<strong>`, `<em>`, `<br/>`) |
| `audio` | `{ a11y: string; title: string }` | | Audios de la portada. `a11y` es el audio descriptivo para el intérprete y `title` el audio del título para el estudiante |
| `interpreter` | `{ a11yURL: string; contentURL: string }` | | Videos del intérprete de lengua de señas. `a11yURL` es la versión descriptiva y `contentURL` la versión de contenido |
| `url` | `string` | | Ruta de la imagen de fondo. Por defecto usa `assets/base/background-cover.webp` |
| `addClass` | `string` | | Clases utilitarias adicionales para el contenedor |

## Qué hace internamente

- **Fondo** — llama al hook `useBackground` con la `url` para aplicar la imagen de fondo global de la página al montar
- **Intérprete** — cuando recibe `interpreter`, llama a `useInterpreter` en modo `fixed` para conectar los videos del intérprete de la portada
- **Navegación automática** — el botón de entrada detecta si el estudiante ya eligió un avatar. Si lo tiene, navega a `/menu`; si no, navega a `/avatar` primero
- **Título con HTML** — el `title` se renderiza con `dangerouslySetInnerHTML` para soportar etiquetas como `<strong>` o `<br/>`
- **Animación de entrada** — usa `motion.section` con un fade in suave (`opacity: 0 → 1`) al montar

:::tip[El título acepta HTML para formatear]
Puedes usar etiquetas HTML dentro del `title` para resaltar palabras o hacer saltos de línea:

```tsx
// Resaltar una palabra
title="Gestión de <strong>Relaciones Internacionales</strong>"

// Salto de línea
title="Fundamentos de<br/>Contabilidad"
```
:::

:::note[La imagen de fondo se aplica globalmente]
`CoverTitle` no aplica el fondo solo al componente — usa `useBackground` para aplicarlo a toda la página. Cada vez que el componente se monta, el fondo cambia al `url` indicado.
:::