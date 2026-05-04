---
title: Crucigramas interactivos
description: Componentes CrosswordActivity y CrosswordInput para crear crucigramas interactivos.
---

`CrosswordActivity` y `CrosswordInput` son los componentes encargados de construir crucigramas interactivos. Se complementan con el hook `useCrossWordState` para gestionar de forma centralizada la validez, respuestas y visibilidad de las pistas.

## Vista previa

![Ejemplo de actividad de crucigrama interactivo](../../../assets/Books.webp) *(Asegúrate de agregar la imagen en esta ruta si es correspondiente)*

## Cómo implementar en un OVA

### 1. Importa los componentes y hooks

Importa los componentes principales y los hooks necesarios, incluyendo gamificación:

```tsx
import { useState } from 'react';
import { CrosswordActivity, CrosswordInput, useCrossWordState } from '@activities/crossword-input';
import { useGamification } from '@features/gamification';
import { ToastFeedback } from '@features/toast-feedback';
import { Button } from '@ui';
```

---

### 2. Define las constantes

Declara las constantes para manejar el total de preguntas y los modales de feedback:

```tsx
const MODALS = {
  SUCCESS: 'modal-correct-activity',
  WRONG: 'modal-wrong-activity'
};

const LENGTH_QUESTION = 5; // total de palabras del crucigrama
```

---

### 3. Configura los estados y hooks

Utiliza el hook personalizado `useCrossWordState` pasándole la cantidad de palabras del crucigrama, y configura `useGamification`:

```tsx
const [isOpen, setIsOpen] = useState<string | null>(null);

const { 
  answers, 
  currentQuestionId, 
  validation, 
  disabledButton, 
  setAnswers, 
  handleValidation, 
  handleReset, 
  handleWordClick 
} = useCrossWordState(LENGTH_QUESTION);

const { Modal, notifyReset, reportResult } = useGamification({
  id: 'ova-01-crossword-1', 
  total: LENGTH_QUESTION
});
```

---

### 4. Crea los handlers de validación

Conecta la validación del crucigrama con la gamificación. El hook `useCrossWordState` usará `handleValidation` para chequear la respuesta de la pregunta específica y actualizará el estado de la validación.

```tsx
const validateAnswer = () => {
  const resultValue = handleValidation(currentQuestionId - 1);
  const result = resultValue === 'right';
  
  const activityResult = result ? 'SUCCESS' : 'WRONG';
  setIsOpen(MODALS[activityResult as keyof typeof MODALS]);

  reportResult({
    success: result,
    correct: result ? 1 : 0,
    total: LENGTH_QUESTION
  });
};

const resetActivity = () => {
  handleReset();
  notifyReset();
};

const closeModal = () => setIsOpen(null);
```

---

### 5. Construye la actividad

La estructura del crucigrama se divide en dos partes: el layout general proporcionado por `CrosswordActivity` y el formulario donde el estudiante introduce sus respuestas, administrado por el respectivo `CrosswordInput`.

```tsx
<CrosswordActivity 
  background="assets/img/crossword-bg.webp" 
  title={<>Crucigrama de Conceptos</>}
>
  {/* Ejemplo de la parte interactiva del form según la pregunta activa (currentQuestionId) */}
  {currentQuestionId === 1 && (
    <CrosswordInput
      number="1"
      label="1. Instrumento óptico para observar objetos lejanos."
      rightAnswer="TELESCOPIO"
      length={10}
      currentQuestionId={currentQuestionId}
      arrayQuantity={LENGTH_QUESTION}
      handleWordClick={handleWordClick}
      validation={validation}
      onAnswer={(data) => {
        setAnswers(prev => ({
          ...prev,
          question1: { ...data, isReady: true }
        }));
      }}
    />
  )}

  {/* Representación visual opcional de la palábra en la matrix usando answers.question1.array ... */}

  <CrosswordActivity.Button>
    <Button 
      label="Comprobar" 
      variant="check" 
      disabled={disabledButton.button} 
      onClick={validateAnswer} 
    />
    <Button 
      label="Reintentar" 
      variant="reset" 
      disabled={disabledButton.reset} 
      onClick={resetActivity} 
    />
  </CrosswordActivity.Button>

</CrosswordActivity>
```

> **Consideración:** El mapeo gráfico de las letras y casillas del crucigrama (tablero cruzado) recae sobre la lógica visual de CSS que decidas implementar y de iterar sobre `answers.question[x].array` para mostrar en pantalla las letras confirmadas.

---

### 6. Agrega los modales de feedback

Fuera de la estructura y de tu layout, integra tus modales usando los identificadores definidos:

```tsx
<Modal audio="assets/audios/content/aud_bien.mp3" />

<ToastFeedback
  type="wrong"
  isOpen={isOpen === MODALS.WRONG}
  onClose={closeModal}>
  <p>La palabra ingresada no es correcta. Verifica tu ortografía e inténtalo de nuevo.</p>
</ToastFeedback>

<ToastFeedback
  type="success"
  isOpen={isOpen === MODALS.SUCCESS}
  onClose={closeModal}>
  <p>¡Correcto! Continúa con la siguiente pista.</p>
</ToastFeedback>
```

---

## Props de CrosswordActivity

Contenedor principal interactivo.

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `background` | `string` | ✓ | Ruta de la imagen de fondo general para el contenedor interactivo. |
| `title` | `JSX.Element` | ✓ | Título de la actividad cruzada mostrado inferiormente en itálica. |
| `addClass` | `string` | | Clases CSS adicionales. |

## Props de CrosswordInput

Componente dinámico que maneja el formulario individual asociado a cada pista e input de teclado.

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `onAnswer` | `(data) => void` | ✓ | Función a gatillar tras responder. Retorna `{word, answer, array}` para actualizar el store de respuestas localmente. |
| `number` | `string` | ✓ | Indicador visible actual dentro del control de pistas (e.g. `"1"`). |
| `label` | `string` | ✓ | Texto o pista accesible para encontrar la palabra. |
| `length` | `number` | ✓ | Exacta cantidad de caracteres que requiere la respuesta (usado para validación de longitud). |
| `rightAnswer` | `string` | ✓ | La respuesta correcta que validará internamente el hook al verificar. |
| `currentQuestionId` | `number` | ✓ | El ID de la pregunta actual (basado en un rango indexado de 1 a N). |
| `arrayQuantity` | `number` | ✓ | Total de preguntas del crucigrama (para controles y paginación "Siguiente" o "Atrás"). |
| `handleWordClick` | `(e, id) => void` | ✓ | Función pasada que provee `useCrossWordState` para navegar visualmente a la vista de otra palabra. |
| `validation` | `string[]` | ✓ | Array principal general devuelto por el hook con los estatus de todos los inputs (`"right" \| "wrong" \| ""`). |
| `hasSpace` | `boolean` | | Indica si la respuesta esperada contiene espacios. Por defecto: `false`. |
| `audio` | `string` | | Ruta de una pista narrada en audio, de estar disponible. |

## Returns del hook `useCrossWordState`

| Propiedad / Fn | Descripción |
|---|---|
| `answers` | Objeto estructurado (`AnswersState`) con la información tecleada para cada llave `question1`, `question2`, etc. Sus partes: `word`, `array`, `isReady`. |
| `validation` | Arreglo de estados de la validación de cada pregunta. |
| `disabledButton` | Objeto mapeando si es adecuado bloquear los componentes del boton: `{ button: boolean, reset: boolean }`. |
| `currentQuestionId` | Referencia en estado sobre qué identificador de input está actualmente activo frente al usuario. |
| `handleValidation(pos)`| Método a llamar al intentar "Comprobar". Calcula la validez de la repuesta y la bloquea si es exitosa. |
| `handleWordClick(e,id)`| Acción disparada con botones de navegación ("Siguiente", "Atrás"). |
