---
title: Help
description: Página de ayuda del OVA. Muestra las especificaciones técnicas, un tip de navegación y un tour guiado por la interfaz.
---

`Help` es la página de ayuda que el estudiante puede abrir desde el menú del OVA. Muestra las especificaciones técnicas recomendadas (navegadores, hardware, requisitos), un consejo de navegación y un botón para iniciar el tour guiado por la interfaz. Todo el contenido se adapta automáticamente al idioma configurado en el store.

## Cómo implementarlo

`Help` no recibe props — se autogestiona desde el store. Ya está registrado como ruta `/help` en el router principal del proyecto dentro de `App.tsx`:

```tsx
<Route path="/help">
  <RouteGuard>
    <Layout>
      <Help />
    </Layout>
  </RouteGuard>
</Route>
```

:::note[Ya está configurado en el router del proyecto]
No necesitas agregar ni modificar nada para que `Help` funcione. El router ya lo incluye protegido con `RouteGuard` — solo es accesible si el estudiante ya eligió un avatar. Se abre automáticamente al navegar a `/help` desde el menú del OVA.
:::

## Rutas disponibles en el router

Para referencia, estas son todas las rutas del OVA y qué renderizan:

| Ruta | Componente | Protegida |
|---|---|---|
| `/` | `Cover` | No |
| `/avatar` | `ChoiceAvatar` | No |
| `/menu` | `LearningPath` | Sí |
| `/help` | `Help` | Sí |
| `/medals` | `Medals` | Sí |
| `/notes` | `AllNotes` | Sí |
| `/p01`, `/p02`... | Páginas del OVA | Sí |
| `*` | `Page404` | No |

## Qué incluye la página

### Especificaciones técnicas

La página muestra automáticamente tres tarjetas con los requisitos del sistema:

- **Requisitos técnicos** — teclado y periféricos necesarios
- **Hardware** — dispositivos compatibles incluyendo Android 10 e iOS 15
- **Navegadores** — lista de navegadores recomendados

Todo el contenido de estas tarjetas viene del objeto `i18nHelp` internacionalizado — no necesitas hardcodear nada.

### Tour guiado — `HelpTour`

`HelpTour` es un subcomponente interno de `Help` que inicia un tour interactivo por la interfaz del OVA. El estudiante lo activa pulsando el botón de tour en la sección de ayuda.

El tour recorre seis elementos de la interfaz en orden, mostrando una descripción de cada uno:

| Paso | Selector | Elemento |
|---|---|---|
| 1 | `.js-menu-button--hamburger` | Botón del menú hamburguesa |
| 2 | `.js-button-audio-a11y` | Botón de audio de accesibilidad |
| 3 | `.js-button-interpreter` | Botón del intérprete de lengua de señas |
| 4 | `.js-button-medals` | Botón de medallas/gamificación |
| 5 | `.js-button-notes` | Botón de notas |
| 6 | `.js-menu-navigation` | Botón de navegación al menú |

:::caution[Los selectores del tour son clases JS — no los cambies]
El tour usa clases con prefijo `js-` para ubicar cada elemento en el DOM. Si renombras o eliminas alguna de estas clases en los componentes de la interfaz, ese paso del tour quedará roto. Estas clases son contratos entre componentes — no son clases de estilo.

```tsx
// ✅ Mantén estas clases en sus componentes correspondientes
'js-menu-button--hamburger'
'js-button-audio-a11y'
'js-button-interpreter'
'js-button-medals'
'js-button-notes'
'js-menu-navigation'
```
:::

## Qué hace internamente

- **Idioma automático** — lee `lang` del `useOvaStore` y muestra todo el contenido en el idioma configurado usando `i18nHelp` e `i18nTour`
- **Avatar** — renderiza el avatar del OVA con la variación `GREETING` a la izquierda del contenido
- **Tour** — usa el componente `Tour` de `books-ui`. `HelpTour` controla el estado `openTour` con `useState` y lo pasa al `Tour` como `isOpen`
- **`Content withOutTitle`** — usa el layout `Content` con `withOutTitle` porque la página de ayuda tiene su propio encabezado personalizado y no necesita el título automático de la página