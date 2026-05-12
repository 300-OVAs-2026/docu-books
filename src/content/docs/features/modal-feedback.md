---
title: Modal Feedback
description: Componente para mostrar retroalimentación visual y auditiva tras una acción (acierto o error).
---

El componente `ModalFeedback` se utiliza para proporcionar una respuesta inmediata al usuario después de interactuar con actividades o juegos. Soporta dos estados visuales principales: **éxito** (`success`) y **error** (`wrong`), integrando imágenes ilustrativas y soporte de audio.

## Cómo implementar

Este componente es ideal para cerrar ciclos de interactividad, informando al usuario si su respuesta fue correcta o si debe intentarlo de nuevo.

### Ejemplo básico

```tsx
import { ModalFeedback } from '@features';

const MyActivity = ({ isCorrect, isOpen, onClose }) => {
  return (
    <ModalFeedback 
      isOpen={isOpen} 
      onClose={onClose} 
      type={isCorrect ? 'success' : 'wrong'}
      audio={isCorrect ? 'assets/audios/success.mp3' : 'assets/audios/error.mp3'}
    >
      <p>
        {isCorrect 
          ? '¡Excelente trabajo! Has comprendido el concepto.' 
          : 'Casi lo logras. Revisa el material e inténtalo de nuevo.'}
      </p>
    </ModalFeedback>
  );
};
```

---

## Parámetros

### `ModalFeedback`

Este componente extiende las propiedades base de `Modal`.

| Prop | Tipo | Descripción | Default |
|---|---|---|---|
| `type` | `'success' \| 'wrong'` | Define el estilo visual y la imagen a mostrar. | `'success'` |
| `label` | `string` | Título del feedback. Si se omite, usa traducciones por defecto (Ej: "¡Muy bien!" o "¡Vuelve a intentarlo!"). | `i18n` autogestionado. |
| `audio` | `string` | Ruta al archivo de audio de retroalimentación. | `undefined` |
| `addClass` | `string` | Clase CSS adicional para el contenedor. | `undefined` |
| `children` | `React.ReactNode` | Contenido adicional (párrafos, botones de acción, etc.) que aparecerá debajo del título. | `undefined` |

---

## Estructura de Clases CSS

- `.modal`: Define el ancho máximo del diálogo (`45rem`).
- `.modal__wrapper`: Contenedor grid que centra los elementos vertical y horizontalmente.
- `.modal__image`: Estiliza la ilustración central (éxito o error).
- `.modal__title`: Título destacado que cambia de color según el modo del sistema.

## Funcionamiento Interno

- **Imágenes Dinámicas:** El componente busca automáticamente las imágenes en `assets/base/success.webp` o `assets/base/wrong.webp` según el `type`.
- **Accesibilidad:** La imagen se marca como decorativa (`alt=""`) ya que el título y el contenido (`children`) llevan la carga informativa.
- **Internacionalización:** Si no se provee un `label`, el componente consulta `useOvaStore` para mostrar el mensaje predeterminado en el idioma del usuario.
