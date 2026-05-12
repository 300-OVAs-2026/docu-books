---
title: Panel
description: Layout de varias secciones con navegación por pestañas y barra de progreso. Ideal para OVAs con múltiples temas en una misma página.
---

`Panel` es un layout de múltiples secciones con navegación por pestañas y barra de progreso. Permite dividir el contenido de una página en secciones independientes que el estudiante navega con botones anterior/siguiente o haciendo clic directamente en el indicador de progreso. Gestiona automáticamente el intérprete de lengua de señas y el título de cada sección. Se compone de dos subcomponentes: `Panel.Section` y `Panel.Button`.

## Cómo implementarlo

### Uso básico

```tsx
import { Panel } from '@layouts';
import { useGamification } from '@features/gamification';
import { Audio } from 'books-ui';

const OvaTemplatep01 = () => {
  const { Stars } = useGamification({ id: 'ova-01-activity-1', total: 1 });

  return (
    <Panel stars={Stars}>

      <Panel.Section>
        <p>Contenido de la sección 1.</p>
      </Panel.Section>

      <Panel.Section>
        <p>Contenido de la sección 2.</p>
      </Panel.Section>

    </Panel>
  );
};
```

### Con título e intérprete por sección

Cuando cada sección tiene su propio título visible en el `PageTitle` y sus propios videos del intérprete:

```tsx
<Panel stars={Stars}>

  <Panel.Section
    title="Introducción al tema"
    interpreter={{
      a11yURL: 'descriptives/vid_int_des_ova-01_sld-4_1.mp4',
      contentURL: 'content/vid_int_ova-01_sld-4_1.mp4'
    }}>
    <Audio a11y src="assets/audios/description/aud_des_sld-4_1.mp3" />
    <Audio src="assets/audios/content/aud_sld-4_1.mp3" />
    <p>Contenido de la primera sección.</p>
  </Panel.Section>

  <Panel.Section
    title="Desarrollo del tema"
    interpreter={{
      a11yURL: 'descriptives/vid_int_des_ova-01_sld-4_2.mp4',
      contentURL: 'content/vid_int_ova-01_sld-4_2.mp4'
    }}>
    <Audio a11y src="assets/audios/description/aud_des_sld-4_2.mp3" />
    <Audio src="assets/audios/content/aud_sld-4_2.mp3" />
    <p>Contenido de la segunda sección.</p>
  </Panel.Section>

</Panel>
```

> Cuando el estudiante navega a una sección, el `PageTitle` actualiza su texto automáticamente con el `title` de esa sección y el intérprete cambia al video correspondiente.

---

### Con `Panel.Button` para botones dentro de una sección

`Panel.Button` permite agregar un botón dentro de una sección que navegue a otra sección específica y actualice el intérprete al mismo tiempo:

```tsx
<Panel stars={Stars}>

  <Panel.Section title="Sección 1" interpreter={{ ... }}>
    <p>Lee el contenido y avanza a la siguiente sección.</p>
    <Panel.Button section={1}>
      <Button label="Siguiente" variant="next" />
    </Panel.Button>
  </Panel.Section>

  <Panel.Section title="Sección 2" interpreter={{ ... }}>
    <p>Contenido de la sección 2.</p>
  </Panel.Section>

</Panel>
```

> El `section` de `Panel.Button` es el **índice** de la sección destino (basado en 0). `section={1}` navega a la segunda sección.

---

## Props

### `Panel`

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `stars` | `React.ReactNode` | | Estrellas de gamificación del hook `useGamification`. Se muestran en el `PageTitle` |
| `addClass` | `string` | | Clases utilitarias adicionales para el contenedor |

---

### `Panel.Section`

Cada sección de contenido dentro del `Panel`. Se registra automáticamente en el contexto al montarse.

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `title` | `string` | | Título de la sección. Al navegar a esta sección, el `PageTitle` se actualiza con este texto |
| `interpreter` | `{ a11yURL?: string; contentURL?: string }` | | Videos del intérprete para esta sección. Al navegar aquí, el intérprete cambia automáticamente a estos videos |
| `addClass` | `string` | | Clases utilitarias adicionales para la sección |

:::tip[`title` e `interpreter` son opcionales pero recomendados]
Si todas las secciones del panel representan temas distintos, define `title` e `interpreter` en cada `Panel.Section`. Así el `PageTitle` y el intérprete se mantienen siempre en contexto con lo que el estudiante está viendo.
:::

---

### `Panel.Button`

Botón dentro de una sección que navega a otra sección específica y sincroniza el intérprete.

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `section` | `number` | ✓ | Índice de la sección destino (basado en 0). `section={0}` va a la primera, `section={1}` a la segunda, etc. |
| `children` | `JSX.Element` | ✓ | Botón a renderizar. `Panel.Button` clona el elemento hijo e inyecta el `onClick` de navegación sin romper el `onClick` original |

---

## Navegación entre secciones

El `Panel` incluye automáticamente una barra de progreso (`PanelProgress`) con tres formas de navegar:

| Método | Descripción |
|---|---|
| Botón **Anterior** | Navega a la sección previa. Se deshabilita en la primera sección |
| Botón **Siguiente** | Navega a la siguiente sección. Se deshabilita en la última |
| Indicadores numéricos | Botones con el número de cada sección. El tooltip muestra el título al hacer hover |

La navegación con teclado también está soportada: `←` y `→` mueven el foco entre los indicadores numéricos.

:::caution[Al cambiar de sección se pausan los videos automáticamente]
Cuando el estudiante navega entre secciones, `PanelProgress` pausa todos los videos de la página (excepto los que funcionan como GIFs con `autoplay loop playsinline`). Esto evita que queden videos reproduciéndose en segundo plano.
:::

## Qué hace internamente

- **`PanelCoreProvider`** — contexto interno que acumula los `title` e `interpreter` de cada `Panel.Section` al montarse. Así `PanelProgress` sabe qué título mostrar y qué video del intérprete cargar al navegar
- **`PanelProgress`** — barra de navegación con botones anterior/siguiente e indicadores numéricos. Se renderiza automáticamente — no necesitas agregarlo
- **`PageTitle`** — se renderiza dentro del `Panel` con `stars`. Al cambiar de sección, dispara `OVATITLEUPDATE` para actualizar el título visible
- **Intérprete sincronizado** — cada `Panel.Section` registra su `uid` y sus videos en el contexto. Al navegar, `PanelProgress` llama a `updateVideoSources` con los videos de la sección activa