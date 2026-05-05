---
title: Selección por grupos
description: Componente SelectGroup para crear actividades interactivas de múltiple selección agrupada mediante listas desplegables.
---

`SelectGroup` es el componente diseñado para manejar grupos anidados de listas desplegables u opciones conjuntas. Permite estructurar la información en modo agrupación (por filas, cards, contextos varios), evaluando su estado de manera combinada bajo un mismo bloque e integrándose naturalmente con las políticas de validación interactiva de todo el OVA. Se basa en proporcionar un contexto global centralizado para orquestar la sincronización entre subcomponentes hijos (`SelectGroup.Select` y `SelectGroup.Button`).

## Vista previa

![Ejemplo de actividad de selección por grupos](../../../assets/Books.webp)

## Cómo implementar en un OVA

### 1. Importa los componentes

Importa localmente tu funcionalidad de interfaz general y el control de evaluación agrupada:

```tsx
import { useState } from 'react';
import { SelectGroup } from '@activities/select-group-activity';
import { useGamification } from '@features/gamification';
import { ToastFeedback } from '@features/toast-feedback';
import { Row } from 'books-ui';
import { Button } from '@ui';
```

---

### 2. Define constantes y diccionarios

Construye tu lista general de opciones o conjuntos de opciones por tipo de grupo:

```tsx
const MODALS = {
  SUCCESS: 'modal-correct-activity',
  WRONG: 'modal-wrong-activity'
};

const TOTAL_QUESTIONS = 4; // Suma general de selects en todos los grupos requeridos.

const FRUIT_OPTIONS = [
  { id: 'f-1', option: 'Manzana' },
  { id: 'f-2', option: 'Naranja' },
  { id: 'f-3', option: 'Carne' } // Trampa
];
const VEGETABLE_OPTIONS = [
  { id: 'v-1', option: 'Zanahoria' },
  { id: 'v-2', option: 'Queso' }, // Trampa
  { id: 'v-3', option: 'Brócoli' } 
];
```

---

### 3. Configura los hooks

```tsx
const [isOpen, setIsOpen] = useState<string | null>(null);

const { Modal, notifyReset, reportResult } = useGamification({
  id: 'ova-01-selectgroup-1',
  total: TOTAL_QUESTIONS
});
```

:::tip[El `id` de gamificación debe ser único por actividad]
Cada actividad del proyecto debe tener un `id` diferente. Usa el patrón `ova-[número]-activity-[número]` para mantener consistencia.
:::

---

### 4. Crea el handler de validación

```tsx
const handleValidate = ({ result }: { result: boolean }) => {
  const activityResult = result ? 'SUCCESS' : 'WRONG';
  setIsOpen(MODALS[activityResult as keyof typeof MODALS]);

  reportResult({
    success: result,
    correct: result ? TOTAL_QUESTIONS : 0, 
    total: TOTAL_QUESTIONS
  });
};

const closeModal = () => setIsOpen(null);
```

---

### 5. Construye la actividad

Puesto que es una actividad basada en agrupación de listas (o select lists integrales), puedes distribuir los `SelectGroup.Select` dentro de tarjetas o columnas distintas y todo el contenedor principal controlará de forma abstracta las colisiones de respuestas:

```tsx
<SelectGroup onResult={handleValidate}>

  <div className="u-grid u-grid-cols-2 u-gap-4 u-mb-8">
    
    <div className="card">
      <h3 className="u-mb-3">Grupo 1: Frutas</h3>
      <div className="u-flow u-gap-2">
        <SelectGroup.Select 
            id="sg-1"
            name="fruta1"
            options={FRUIT_OPTIONS}
            correctAnswer="f-1"
            placeholder="Elegir opción"
        />
        <SelectGroup.Select 
            id="sg-2"
            name="fruta2"
            options={FRUIT_OPTIONS}
            correctAnswer="f-2"
            placeholder="Elegir opción"
        />
      </div>
    </div>

    <div className="card">
      <h3 className="u-mb-3">Grupo 2: Vegetales</h3>
      <div className="u-flow u-gap-2">
        <SelectGroup.Select 
            id="sg-3"
            name="veg1"
            options={VEGETABLE_OPTIONS}
            correctAnswer="v-1"
            placeholder="Elegir opción"
        />
        <SelectGroup.Select 
            id="sg-4"
            name="veg2"
            options={VEGETABLE_OPTIONS}
            correctAnswer="v-3"
            placeholder="Elegir opción"
        />
      </div>
    </div>

  </div>

  <Row justifyContent="center" alignItems="center" addClass="u-gap-4 u-mt-8">
    <SelectGroup.Button>
      <Button label="COMPROBAR" variant="check" />
    </SelectGroup.Button>
    <SelectGroup.Button type="reset">
      <Button label="REINICIAR" onClick={notifyReset} variant="reset" />
    </SelectGroup.Button>
  </Row>

</SelectGroup>
```

> **NOTA:** Al igual que en su componente primo `Selects`, las opciones seleccionadas en un subcomponente restringen la misma opción (`disabledKeys`) para el transcurso de los demás selects agrupados si manejan su mismo conjunto de opciones.

---

### 6. Agrega los modales de feedback

```tsx
<Modal audio="assets/audios/content/aud_bien.mp3" />

<ToastFeedback
  type="wrong"
  isOpen={isOpen === MODALS.WRONG}
  onClose={closeModal}
  audio="assets/audios/content/aud_incorrecto.mp3">
  <p>Vuelve a intentar. ¡Algunos elementos no corresponden a su grupo correcto!</p>
</ToastFeedback>

<ToastFeedback
  type="success"
  isOpen={isOpen === MODALS.SUCCESS}
  onClose={closeModal}
  audio="assets/audios/content/aud_correcto.mp3">
  <p>¡Buen trabajo! Has agrupado todos los elementos exitosamente.</p>
</ToastFeedback>
```

---

## Props de SelectGroup

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `onResult` | `({ result: boolean, options: Option[] }) => void` | | Función callback disparada bajo mandato del botón de comprobación. |

## Props de SelectGroup.Select

Elemento subyacente para mostrar menús desplegables pero sumado de forma compartida al estado general principal (`SelectGroup`).

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `id` | `string` | | Identificador único de este menú (opcional). |
| `name` | `string` | ✓ | Identificación clave HTML del input dentro del control para agruparse. |
| `options` | `Array<{ id: string, option: string }>` | ✓ | Arreglo de opciones a renderizar en este grupo o menú concreto (soporta strings `html` por dentro). |
| `correctAnswer` | `string \| string[]` | ✓ | La cadena que indica qué `id` entre todas las opciones equivale a la repuesta lógica positiva del bloque. |
| `placeholder` | `string` | | Etiqueta previa en estado vacío. |
| `addClass` | `string` | | Clases css utilitarias o personalizadas adicionales. |

## Props de SelectGroup.Button

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `type` | `"reset"` | | Dejar sin valor evalúa la respuesta general dada por el estudiante y bloquea las entradas tras pulsarlo ("Comprobar"). Si posee `"reset"`, despoblará todas las entradas restaurándolas e inicializando de cero el estado de comprobación interno. |
