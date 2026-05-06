---
title: Medals
description: Página de medallas y progreso del OVA. Muestra el historial de actividades completadas, estrellas obtenidas y medallas ganadas.
---

`Medals` es la página de progreso del estudiante. Muestra una tabla con todas las actividades del OVA, indicando cuáles fueron completadas, cuántas estrellas se obtuvieron y si se ganó la medalla. El contador de actividades completadas y las estrellas totales se calculan automáticamente desde el store de gamificación.

## Cómo implementarlo

`Medals` no recibe props — lee todo desde el store. Ya está registrado como ruta `/medals` en el router principal del proyecto:

```tsx
// App.tsx — ya configurado así en el proyecto
<Route path="/medals">
  <RouteGuard>
    <Layout>
      <Medals />
    </Layout>
  </RouteGuard>
</Route>
```

:::note[Ya está configurado en el router]
No necesitas agregar ni modificar nada para que `Medals` funcione. Se abre automáticamente al navegar a `/medals` desde el menú del OVA y solo es accesible si el estudiante ya eligió un avatar.
:::

## Qué muestra la página

### Encabezado

Muestra el título de la sección y un badge con el conteo de actividades completadas. El número se calcula en tiempo real desde el store:

```
Medallas y logros
Revisa tu progreso en el OVA.
🏅 2  actividades completadas
```

### Tabla de actividades

Una tabla responsiva con cuatro columnas por cada actividad registrada en el store de gamificación:

| Columna | Descripción |
|---|---|
| **Actividad** | Nombre de la actividad (`Actividad 1`, `Actividad 2`...) |
| **Medalla** | Muestra 🏅 en color si está completada, gris si no |
| **Estrellas** | Número de estrellas obtenidas (0 si no completada) |
| **Completada** | ✓ verde si completada, ✕ rojo si no |

Si no hay actividades registradas aún, la tabla muestra un mensaje de estado vacío.

### Pie de tabla

Resumen global con dos contadores:

```
Completadas: 2/5      ⭐ Estrellas totales: 6
```

## Qué hace internamente

- **Store de gamificación** — lee `activities` del `useGamificationStore`. Cada actividad tiene `completed` y `stars`. No necesitas pasarle datos — se sincroniza automáticamente con el progreso del estudiante
- **Conteo automático** — `completedCount` y las estrellas totales se calculan con `Object.entries(activities)` al renderizar
- **Idioma automático** — todo el texto de la página viene del objeto `i18nMedals` según el `lang` del `useOvaStore`. Tiene fallback a `es` si el idioma no está definido
- **`Content withOutTitle`** — usa el layout `Content` con `withOutTitle` porque la página tiene su propio encabezado con título personalizado
- **Avatar decorativo** — renderiza el avatar del OVA con la variación `GREETING` a la derecha de la tabla

:::tip[Las actividades se registran automáticamente]
No necesitas hacer nada especial para que una actividad aparezca en la página de medallas. Cada vez que el estudiante completa una actividad y se llama `reportResult` desde el hook `useGamification`, el store de gamificación se actualiza y la tabla refleja el progreso automáticamente.
:::