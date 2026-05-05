---
title: Actividad Verdadero o Falso
description: Actividad clásica para validar conocimientos mediante afirmaciones que el usuario clasifica como verdaderas o falsas.
---

`TrueFalseActivity` permite a los estudiantes evaluar una serie de afirmaciones de manera individual. Gestiona el estado de selección, validación y resultado de todas las preguntas de la pantalla.

## Vista previa

![Ejemplo de actividad de verdadero o falso](../../../assets/Books.webp)

## Cómo implementar en un OVA

### 1. Importa los componentes

```tsx
import { useState } from 'react';
import { TrueFalseActivity } from '@shared/components/activities';
import { useGamification } from '@shared/store/gamification-store';
import { ToastFeedback } from '@ui';
import { Button } from '@ui';
```

---

### 2. Define las constantes y estados

```tsx
const MODALS = {
  TRUE: 'modal-correct',
  FALSE: 'modal-wrong'
};

const [isOpen, setIsOpen] = useState<string | null>(null);

const { reportResult, notifyReset } = useGamification({
  id: 'ova-01-activity-1',
  total: 1
});
```

:::tip[El `id` de gamificación debe ser único por actividad]
Cada actividad del proyecto debe tener un `id` diferente. Usa el patrón `ova-[número]-activity-[número]` para mantener consistencia.
:::

---

### 3. Crea el handler de validación

```tsx
const handleValidate = ({ result, options }: { result: boolean, options: any[] }) => {
  setIsOpen(result ? MODALS.TRUE : MODALS.FALSE);

  reportResult({
    success: result,
    correct: options.filter(opt => opt.state === 'success').length,
    total: options.length
  });
};

const closeModal = () => setIsOpen(null);
```

---

### 4. Construye la actividad

```tsx
<TrueFalseActivity onResult={handleValidate}>
  <div className="u-space-y-4">
    <TrueFalseActivity.Option 
      id="tf-1" 
      name="pregunta_1" 
      label="La capital de Francia es París." 
      correct={true} 
    />
    
    <TrueFalseActivity.Option 
      id="tf-2" 
      name="pregunta_2" 
      label="El sol gira alrededor de la tierra." 
      correct={false} 
    />
  </div>

  <div className="u-flex u-justify-center u-gap-4 u-mt-8">
    <TrueFalseActivity.Button>
      <Button label="COMPROBAR" variant="check" />
    </TrueFalseActivity.Button>
    
    <TrueFalseActivity.Button type="reset">
      <Button label="REINICIAR" onClick={notifyReset} variant="reset" />
    </TrueFalseActivity.Button>
  </div>
</TrueFalseActivity>
```

---

### 5. Agrega los modales de feedback

```tsx
<ToastFeedback
  type="success"
  isOpen={isOpen === MODALS.TRUE}
  onClose={closeModal}
  title="¡Excelente!"
>
  <p>Has identificado correctamente las afirmaciones.</p>
</ToastFeedback>

<ToastFeedback
  type="wrong"
  isOpen={isOpen === MODALS.FALSE}
  onClose={closeModal}
  title="Sigue intentando"
>
  <p>Algunas de tus respuestas no son correctas. Revisa los conceptos.</p>
</ToastFeedback>
```

---

## Parámetros

### `TrueFalseActivity`

| Prop | Tipo | Descripción |
|---|---|---|
| `onResult` | `Function` | Callback que recibe `{ result, options }` al validar. |
| `minSelected` | `number` | Mínimo de respuestas para habilitar el botón (Default: 1). |

### `TrueFalseActivity.Option`

| Prop | Tipo | Descripción |
|---|---|---|
| `id` | `string` | ID único de la opción. |
| `name` | `string` | Nombre del grupo (pregunta). |
| `label` | `string` | La afirmación a evaluar. |
| `correct` | `boolean` | Valor correcto de la afirmación. |
