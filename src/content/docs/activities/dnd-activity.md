---
title: Actividades de arrastrar y soltar
description: Componente DndActivity para crear ejercicios interactivos de arrastrar palabras a zonas de texto.
---

import { DndActivity, DragAndDrop } from '@components/activities';
import { Button, Row } from '@components/ui';

`DndActivity` es el componente raíz que orquesta la actividad completa. Gestiona el estado global de arrastre, validación y resultados. Se compone de tres subcomponentes: `DragAndDrop.Container`, `DragAndDrop.Drag` y `DragAndDrop.Drop`.

## Vista previa

![Ejemplo de actividad DndActivity mostrando el banco de palabras con seis ítems arrastrables en una cuadrícula, el párrafo con seis zonas de destino vacías, y los botones Comprobar y Reintentar al final.](../../../assets//dndActivity.webp)

## Props de DndActivity

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `id` | `string` | ✓ | Identificador único de la actividad (ej: `"ova-08-dnd-1"`) |
| `minCorrectDrags` | `number` | | Mínimo de arrastres correctos para superar la actividad |
| `announcements` | `() => void` | | Función para anuncios de accesibilidad (lectores de pantalla) |
| `onResult` | `(result) => void` | | Callback al comprobar. Recibe el resultado de la validación |

## Props de DragAndDrop.Container

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `id` | `string` | ✓ | Identificador único del contenedor |
| `label` | `string` | | Etiqueta accesible del grupo |
| `addClass` | `string` | | Clases utilitarias (ej: `"u-grid u-grid-cols-3"`) |

## Props de DragAndDrop.Drag

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `id` | `string` | ✓ | Identificador único del elemento arrastrable |
| `label` | `string` | | Texto accesible del ítem |

## Props de DragAndDrop.Drop

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `id` | `string` | ✓ | Identificador único de la zona de destino |
| `validate` | `string[]` | ✓ | IDs de `Drag` aceptados como respuesta correcta |
| `label` | `string` | | Etiqueta accesible del espacio vacío |
| `addClass` | `string` | | Clases utilitarias (ej: `"u-mx-1"`) |

## Props de DndActivity.Button

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `type` | `"reset"` | | Sin valor actúa como "Comprobar". Con `"reset"` reinicia el estado completo |

## Ejemplo de uso

```tsx
<DndActivity
  id="ova-08-dnd-1"
  minCorrectDrags={6}
  announcements={() =>
    currentParagraph({ id: 'paragraph-activity', container: refTextWrapperUno?.current })
  }
  onResult={handleValidate}>

  {/* Banco de palabras */}
  <DragAndDrop.Container id="general-1" label="Conjunto de palabras" addClass="u-grid u-grid-cols-3">
    <DragAndDrop.Drag id="01" label="producción alimentaria">
      <span>producción alimentaria</span>
    </DragAndDrop.Drag>
    <DragAndDrop.Drag id="02" label="degradación del suelo">
      <span>degradación del suelo</span>
    </DragAndDrop.Drag>
    <DragAndDrop.Drag id="05" label="urbanización acelerada">
      <span>urbanización acelerada</span>
    </DragAndDrop.Drag>
    <DragAndDrop.Drag id="06" label="las tierras agrícolas">
      <span>las tierras agrícolas</span>
    </DragAndDrop.Drag>
  </DragAndDrop.Container>

  {/* Párrafo con zonas de destino */}
  <span ref={refTextWrapperUno} className="u-text-justify u-leading-loose u-block u-m-3">
    Los retos y desafíos de la producción sostenible de alimentos incluyen la
    <DragAndDrop.Drop id="drop1-1" validate={['05']} label="primer espacio" addClass="u-mx-1" />
    que reduce
    <DragAndDrop.Drop id="drop1-2" validate={['06']} label="segundo espacio" addClass="u-mx-1" />
    y aumenta la demanda de alimentos...
  </span>

  {/* Botones de acción */}
  <Row justifyContent="center" alignItems="center" addClass="u-gap-x-6">
    <DndActivity.Button>
      <Button label="Comprobar" variant="check" />
    </DndActivity.Button>
    <DndActivity.Button type="reset">
      <Button label="Reintentar" variant="reset" onClick={notifyReset} />
    </DndActivity.Button>
  </Row>

</DndActivity>
```

## Flujo de validación

1. El usuario arrastra ítems de `DragAndDrop.Container` hacia los `DragAndDrop.Drop` del texto.
2. Al pulsar **Comprobar**, `DndActivity` evalúa cada zona contra su prop `validate`.
3. Si el número de zonas correctas alcanza `minCorrectDrags`, se llama `onResult` con resultado positivo.
4. **Reintentar** limpia todas las zonas y devuelve los ítems al banco.

## Accesibilidad

Usa `announcements` para conectar un lector de párrafo que informe a tecnologías asistivas el contexto del texto cuando el foco cambia entre zonas de arrastre.

```tsx
announcements={() =>
  currentParagraph({ id: 'paragraph-activity', container: refTextWrapperUno?.current })
}
```