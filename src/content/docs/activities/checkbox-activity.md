---
sidebar:
  order: 1
title: Actividades con selección múltiple
description: Componente Checkboxs para crear actividades con casillas de selección múltiple.
---

`Checkboxs` es el componente raíz para crear preguntas o actividades de selección múltiple utilizando casillas de verificación (checkboxes). Gestiona de forma automática el estado de selección, la validación y los resultados de las respuestas marcadas. Se compone de dos subcomponentes: `Checkboxs.Checkbox` y `Checkboxs.Button`.

## Vista previa

![Ejemplo de actividad de selección múltiple mostrando varias opciones de Checkbox y los botones Comprobar y Reiniciar.](../../../assets/Books.webp)

## Cómo implementar en un OVA

### 1. Importa los componentes

Importa el componente `Checkboxs` junto con las utilidades de gamificación y feedback:

```tsx
import { useState } from 'react';
import { Checkboxs } from '@activities/checkbox-activity';
import { useGamification } from '@features/gamification';
import { ToastFeedback } from '@features/toast-feedback';
import { Row } from 'books-ui';
import { Button } from '@ui';
```

---

### 2. Define las constantes

Declara los ids que usarán los modales para mostrar los resultados:

```tsx
const MODALS = {
  SUCCESS: 'modal-correct-activity',
  WRONG: 'modal-wrong-activity'
};

const LENGTH_QUESTION = 1; // total de preguntas o actividades de este tipo
```

---

### 3. Configura los hooks

Prepara el estado local para manejar qué modal de feedback abrir, junto con el hook de `useGamification`:

```tsx
const [isOpen, setIsOpen] = useState<string | null>(null);

const { Modal, notifyReset, reportResult } = useGamification({
  id: 'ova-01-checkbox-1',
  total: LENGTH_QUESTION
});
```

:::tip[El `id` de gamificación debe ser único por actividad]
Recuerda que cada actividad del proyecto debe tener un `id` único. Usa una nomenclatura consistente como `ova-[número]-[tipo]-[número]`.
:::

---

### 4. Crea el handler de validación

Esta función se ejecuta al oprimir el botón "Comprobar". Determina qué toast levantar y reporta el puntaje:

```tsx
const handleValidate = ({ result }: { result: boolean }) => {
  const activityResult = result ? 'SUCCESS' : 'WRONG';
  setIsOpen(MODALS[activityResult as keyof typeof MODALS]);

  reportResult({
    success: result,
    correct: result ? LENGTH_QUESTION : 0,
    total: LENGTH_QUESTION
  });
};

const closeModal = () => setIsOpen(null);
```

---

### 5. Construye la actividad

Utiliza el componente `<Checkboxs>` envolviendo las opciones correspondientes y los botones. Para habilitar el botón principal, puedes especificar `minSelected` si requieres que el usuario seleccione una cantidad mínima de respuestas específica:

```tsx
<Checkboxs onResult={handleValidate} minSelected={2}>
  <div className="u-grid u-gap-4">
    <Checkboxs.Checkbox id="chk-1" state="success" label="a. Opción correcta 1." name="q1" />
    <Checkboxs.Checkbox id="chk-2" state="wrong"   label="b. Opción incorrecta 1." name="q1" />
    <Checkboxs.Checkbox id="chk-3" state="success" label="c. Opción correcta 2." name="q1" />
    <Checkboxs.Checkbox id="chk-4" state="wrong"   label="d. Opción incorrecta 2." name="q1" />
  </div>

  <Row justifyContent="center" alignItems="center" addClass="u-gap-4 u-mt-5">
    <Checkboxs.Button>
      <Button label="COMPROBAR" variant="check" />
    </Checkboxs.Button>
    <Checkboxs.Button type="reset">
      <Button label="REINICIAR" onClick={notifyReset} variant="reset" />
    </Checkboxs.Button>
  </Row>
</Checkboxs>
```

> `state="success"` declara qué opciones **deben** ser marcadas para que la respuesta sea validada como correcta. `state="wrong"` marca las opciones que no deberían elegirse. 

---

### 6. Agrega los modales de feedback

Finalmente, fuera de tu layout principal coloca el Modal de gamificación y los Toast de retroalimentación:

```tsx
<Modal
  audio="assets/audios/content/aud_bien.mp3"
/>

<ToastFeedback
  type="wrong"
  isOpen={isOpen === MODALS.WRONG}
  onClose={closeModal}
  audio="assets/audios/content/aud_incorrecto.mp3">
  <p>Verifique el material de estudio e intente nuevamente seleccionar todas las opciones correctas.</p>
</ToastFeedback>

<ToastFeedback
  type="success"
  isOpen={isOpen === MODALS.SUCCESS}
  onClose={closeModal}
  audio="assets/audios/content/aud_correcto.mp3">
  <p>¡Excelente trabajo! Ha identificado correctamente los conceptos.</p>
</ToastFeedback>
```

---

## Props de Checkboxs

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `onResult` | `({ result: boolean, options: Option[] }) => void` | | Callback disparado al comprobar. |
| `minSelected` | `number` | | Establece la cantidad mínima de opciones que deben seleccionarse para habilitar el botón "Comprobar". Si no se especifica, calculará temporalmente el total de casillas dividido sobre 2. |

## Props de Checkboxs.Checkbox

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `id` | `string` | | Identificador único de la opción. Se genera automáticamente si se omite. |
| `name` | `string` | ✓ | Agrupa las opciones a nivel interno. |
| `label` | `string` | ✓ | Texto visible para la casilla. |
| `state` | `"success" \| "wrong"` | ✓ | Define si la opción seleccionada cuenta como correcta o incorrecta. Para ganar, el estudiante debe seleccionar únicamente las opciones indicadas como `"success"`. |
| `addClass` | `string` | | Clases CSS adicionales para la casilla. |

## Props de Checkboxs.Button

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `type` | `"reset"` | | Sin valor actúa como "Comprobar". Con `"reset"`, desmarca todas las casillas y reinicia el estado. |
