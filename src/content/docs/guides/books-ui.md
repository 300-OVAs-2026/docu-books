---
order: 2
title: Librería Books-UI Base
description: Guía de uso de los componentes base de la librería books-ui más utilizados en el proyecto.
---

En el ecosistema de OVAS utilizamos nuestra propia librería base de componentes llamada **`books-ui`**. Aunque la librería contiene múltiples elementos, en nuestros recursos (OVAs) solemos interactuar directamente y de manera frecuente con tres componentes esenciales: el sistema de grillas (`Row`, `Col`) y el reproductor de sonido (`Audio`).

Para ver la documentación completa y detallada de toda la librería, puedes visitar la **[Documentación oficial de books-ui](https://books-ui-docs.netlify.app/?path=/docs/books-ui-introducci%C3%B3n--docs)**.

---

## Sistema de Grillas (Row y Col)

Utilizamos `Row` y `Col` para estructurar el layout y las columnas de manera responsiva, evitando escribir extenso código CSS manual para estructuras flexibles comunes.

### Cómo implementar

```tsx
import { Row, Col } from 'books-ui';

const MiLayout = () => {
  return (
    <Row addClass="u-mb-4">
      {/* Columna que ocupa la mitad del ancho en pantallas medianas o superiores */}
      <Col sm="10" md="6">
        <div className="u-bg-gray-100 u-p-4">Columna 1</div>
      </Col>
      <Col md="6" lg="4">
        <div className="u-bg-gray-200 u-p-4">Columna 2</div>
      </Col>
    </Row>
  );
};
```

### Parámetros Row (Fila)

| Prop | Tipo | Descripción |
|---|---|---|
| `addClass` | `string` | Clase CSS adicional para el contenedor de la fila. |
| `align` | `string` | Alineación vertical de los elementos dentro de la fila (ej. `center`, `top`). |
| `justify` | `string` | Distribución horizontal de los elementos (ej. `center`, `space-between`). |

### Parámetros Col (Columna)

El componente `Col` acepta breakpoints clásicos (xs, sm, md, lg, xl) asignándole un valor del 1 al 12, que representa qué fracción de la fila ocupa dicha columna.

| Prop | Tipo | Descripción |
|---|---|---|
| `span` | `number` | Ancho base de la columna (1-12) en todas las resoluciones si no se definen breakpoints. |
| `xs`, `sm`, `md`, `lg`, `xl` | `number` | Ancho de la columna a partir de un breakpoint específico (1-12). |
| `addClass` | `string` | Clase CSS adicional para el contenedor de la columna. |

---

## Componente Audio

El componente `Audio` de `books-ui` es un reproductor optimizado y uniforme para inyectar recursos de voz o efectos de sonido en las actividades.

### Cómo implementar

```tsx
import { Audio } from 'books-ui';

const InstruccionAudio = () => {
  return (
    <Audio 
      src="assets/audio/instruccion.mp3" 
      size="small"
      addClass="u-my-2" 
    />
  );
};
```

### Parámetros Audio

| Prop | Tipo | Descripción |
|---|---|---|
| `src` | `string` | **Requerido.** Ruta apuntando al archivo de audio (usualmente dentro de `assets/`). |
| `size` | `'small' \| 'normal' \| 'large'` | Define el aspecto visual y tamaño del reproductor (muy útil para integrar dentro de Modals o Toasts). |
| `addClass` | `string` | Clase CSS adicional para márgenes u otros estilos. |

> **Nota:** Puedes ver un ejemplo de su utilización avanzada (mediante prop passing) en el componente `ToastFeedback`.
