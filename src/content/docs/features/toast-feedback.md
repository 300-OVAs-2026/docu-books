---
title: Toast Feedback
description: Componente de retroalimentación visual y auditiva para actividades.
---

El `ToastFeedback` es una especialización del componente `Toast` diseñado para dar respuesta inmediata al usuario tras realizar una acción o actividad, indicando si el resultado fue exitoso o erróneo.

## Características Principales

- **Estados Predefinidos:** Soporta tipos `success` (verde/correcto) y `wrong` (rojo/incorrecto).
- **Internacionalización (i18n):** Traduce automáticamente los títulos ("¡Correcto!", "¡Incorrecto!", "Correct!", etc.) basándose en el idioma configurado en el `OvaStore`.
- **Soporte de Audio:** Permite integrar un archivo de audio que se muestra y reproduce junto con el mensaje.
- **Iconografía Dinámica:** Cambia el icono visual automáticamente según el tipo de feedback.
- **Basado en Toast Core:** Hereda todas las funcionalidades del componente base `Toast`, como el tiempo de auto-ocultado y animaciones.

## Cómo implementar

Se utiliza principalmente dentro de la lógica de evaluación de actividades (como un Radio o Checkbox activity).

### Ejemplo básico

```tsx
import { ToastFeedback } from '@features/toast-feedback';

const MyActivity = () => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <button onClick={() => setShowFeedback(true)}>Verificar</button>

      {showFeedback && (
        <ToastFeedback 
          type="success" 
          audio="/assets/audio/correct.mp3"
          onClose={() => setShowFeedback(false)}
        >
          <p>Has respondido correctamente todas las preguntas.</p>
        </ToastFeedback>
      )}
    </>
  );
};
```

---

## Parámetros

### `ToastFeedback`

Además de los parámetros heredados de `ToastCoreProps` (como `onClose` o `duration`), acepta:

| Prop | Tipo | Descripción | Default |
|---|---|---|---|
| `type` | `'success' \| 'wrong'` | Define el estilo visual y el título automático. | `'success'` |
| `label` | `string` | Título personalizado. Si no se provee, usa la traducción por defecto. | - |
| `audio` | `string` | Ruta al archivo de audio para feedback sonoro. | - |
| `addClass` | `string` | Clase CSS adicional para el contenedor. | `''` |

---

## Estructura de Clases CSS

- `.toast`: Clase raíz que limita el ancho máximo del mensaje (45rem).
- `.container`: Grid de dos columnas que separa el icono del contenido textual.
- `.icon`: Círculo estilizado que contiene el símbolo de verificación o error.
- `.title`: Título en mayúsculas y negrita para mayor impacto visual.
- `.success` / `.wrong`: Clases de estado que pueden usarse para cambiar esquemas de color (vía variables CSS).

## Accesibilidad

- **Anuncios en vivo:** Al ser un Toast, se recomienda que el contenedor base tenga `role="status"` o `aria-live="polite"` para que los lectores de pantalla anuncien el resultado.
- **Feedback visual + sonoro:** Al incluir audio opcional, se refuerza la comprensión para usuarios con diferentes capacidades.
- **Contraste de íconos:** Los íconos de check (✓) y cruz (✕) facilitan la identificación incluso para usuarios con daltonismo.
