---
title: Relacionar conceptos
description: Componente RelationConcept para crear actividades interactivas de emparejamiento de conceptos, textos e imágenes.
---

`RelationConcept` es un componente interactivo diseñado para actividades donde el estudiante debe vincular o emparejar dos elementos (por ejemplo, concepto y definición, imagen y texto, etc.). Soporta visualización en pantalla completa de forma nativa y maneja automáticamente las reglas del emparejamiento usando grupos numéricos de validación.

## Vista previa

![Ejemplo de actividad de relacionar conceptos](../../../assets/Books.webp)

## Cómo implementar en un OVA

### 1. Importa los componentes

Importa los componentes principales y los hooks necesarios de gamificación:

```tsx
import { useState } from 'react';
import { Row } from 'books-ui';
import { RelationConcept } from '@activities/relation-concept-activity';
import { useGamification } from '@features/gamification';
import { ToastFeedback } from '@features/toast-feedback';
import { Button } from '@ui';
```

---

### 2. Define las constantes y los arreglos de pares

Capa tu información en arreglos de pares y las constantes de validación modales. **Importante:** La propiedad `pair` dicta qué tarjetas coinciden entre sí (ambas deben tener el mismo número de `pair`).

```tsx
const MODALS = {
  SUCCESS: 'modal-correct-activity',
  WRONG: 'modal-wrong-activity'
};

const totalPairs = 4; // Cantidad de parejas únicas

const CONCEPTS = [
  { id: 'c1', label: 'HTML', pair: 1 },
  { id: 'c2', label: 'CSS', pair: 2 },
  { id: 'c3', label: 'JavaScript', pair: 3 },
  { id: 'c4', label: 'assets/img/react-logo.png', pair: 4 } // Soporta imágenes
];

const DEFINITIONS = [
  { id: 'd2', label: 'Lenguaje de hojas de estilo.', pair: 2 },
  { id: 'd4', label: 'Librería de frontend por Meta.', pair: 4 },
  { id: 'd1', label: 'Lenguaje de marcado.', pair: 1 },
  { id: 'd3', label: 'Lenguaje de programación web.', pair: 3 }
];

// Arreglo total consolidado para entregarle al contenedor principal:
const ALL_PAIRS = [...CONCEPTS, ...DEFINITIONS];
```

---

### 3. Configura los hooks

```tsx
const [isOpen, setIsOpen] = useState<string | null>(null);

const { Modal, notifyReset, reportResult } = useGamification({
  id: 'ova-01-relation-1',
  total: 1
});
```

---

### 4. Crea el handler de validación

```tsx
const handleValidate = ({ result }: { result: boolean }) => {
  const activityResult = result ? 'SUCCESS' : 'WRONG';
  setIsOpen(MODALS[activityResult as keyof typeof MODALS]);

  reportResult({
    success: result,
    correct: result ? 1 : 0,
    total: 1
  });
};

const closeModal = () => setIsOpen(null);
```

---

### 5. Construye la actividad

La estructura organiza dos (o más) `<RelationConcept.Card>` que contendrán las tarjetas clicables. 
En el componente principal pasamos `ALL_PAIRS` como el universo general. 

```tsx
<RelationConcept pairs={ALL_PAIRS} onResult={handleValidate}>
  
  <div className="u-grid u-grid-cols-2 u-gap-6">
    {/* Primera columna: Conceptos */}
    <RelationConcept.Card 
      title="Conceptos" 
      pairs={CONCEPTS} 
      addClass="u-h-full" 
    />
    
    {/* Segunda columna: Definiciones */}
    <RelationConcept.Card 
      title="Definiciones" 
      pairs={DEFINITIONS} 
      addClass="u-h-full" 
    />
  </div>

  <Row justifyContent="center" alignItems="center" addClass="u-gap-4 u-mt-8">
    <RelationConcept.Button>
      <Button label="COMPROBAR" variant="check" />
    </RelationConcept.Button>
    <RelationConcept.Button type="reset">
      <Button label="REINICIAR" onClick={notifyReset} variant="reset" />
    </RelationConcept.Button>
  </Row>

</RelationConcept>
```

> **Consejo:** En el arreglo de objetos para los diccionarios, **si el `label` termina en una extensión de imagen** (como `.png`, `.webp`, `.jpg`), el componente `Card` de forma automática dibujará una etiqueta `<img>` en la tarjeta en lugar de renderizar el string como texto plano.

---

### 6. Agrega los modales de feedback

```tsx
<Modal audio="assets/audios/content/aud_bien.mp3" />

<ToastFeedback
  type="wrong"
  isOpen={isOpen === MODALS.WRONG}
  onClose={closeModal}
  audio="assets/audios/content/aud_incorrecto.mp3">
  <p>Sus parejas no son correctas. Por favor, reinténtalo.</p>
</ToastFeedback>

<ToastFeedback
  type="success"
  isOpen={isOpen === MODALS.SUCCESS}
  onClose={closeModal}
  audio="assets/audios/content/aud_correcto.mp3">
  <p>¡Buen trabajo! Has unido correctamente los conceptos con sus definiciones.</p>
</ToastFeedback>
```

---

## Props de RelationConcept

Componente contenedor principal genérico supervisor interactivo.

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `pairs` | `Option[]` | ✓ | Arreglo global de todas las opciones en la actividad para el seguimiento. `{id, label, pair}`. |
| `onResult` | `({ result: boolean, options: Option[] }) => void` | | Función callback llamada al realizar la validación tras pulsar el usuario "Comprobar". |

## Props de RelationConcept.Card

Despliega visualmente en grilla los interactivos o tarjetas a emparejar. Es capaz de mostrar botones nativos de expansión general o FullScreen.

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `title` | `string` | ✓ | Título mostrable en la parte superior este grupo de cartas (e.g. `"Conceptos"`). |
| `pairs` | `Option[]` | ✓ | Sub-arreglo de opciones solo para este subgrupo de tarjetas. Si `label` es un URL de imagen, dibuja la misma. |
| `addClass` | `string` | | Clases aplicadas directamente al `grid-wrapper`. |

## Props de RelationConcept.Button

Controlador estricto de interacciones de finalización.

| Prop | Tipo | Req. | Descripción |
|---|---|---|---|
| `type` | `"reset"` | | Dejar sin valor evalúa a modo de comprobación de respuestas ingresadas. De poseer el flag `"reset"`, borrará tanto las pulsaciones previas como los identificadores evaluados. |
