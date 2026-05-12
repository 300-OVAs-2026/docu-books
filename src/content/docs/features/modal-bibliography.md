---
title: Modal Bibliography
description: Componente para mostrar listados de referencias bibliográficas en una ventana modal.
---

El componente `ModalBibliography` facilita la presentación de fuentes, referencias y enlaces externos utilizados en el OVA. Utiliza un patrón de **Componentes Compuestos**, permitiendo definir el contenedor del modal y sus enlaces individuales de forma estructurada.

## Cómo implementar

El componente cuenta con un subcomponente `Link` para facilitar la creación de entradas bibliográficas estandarizadas.

### Ejemplo básico

```tsx
import { ModalBibliography } from '@features';

const MyComponent = ({ isOpen, onClose }) => {
  return (
    <ModalBibliography 
      isOpen={isOpen} 
      onClose={onClose} 
      audio="assets/audios/bibliografia.mp3"
    >
      <ModalBibliography.Link 
        authors="Real Academia Española."
        name="Diccionario de la lengua española (23.ª ed.)."
        link="https://dle.rae.es"
      />
      <ModalBibliography.Link 
        authors="Ministerio de Educación."
        name="Guía de recursos educativos digitales."
      />
    </ModalBibliography>
  );
};
```

---

## Parámetros

### `ModalBibliography` (Contenedor)

Extiende las propiedades base de `Modal`.

| Prop | Tipo | Descripción | Default |
|---|---|---|---|
| `isOpen` | `boolean` | **(Requerido)** Define si el modal es visible. | `-` |
| `onClose` | `() => void` | **(Requerido)** Función para cerrar el modal. | `-` |
| `label` | `string` | Título personalizado para el modal bibliográfico. | Título `i18n` autogestionado. |
| `audio` | `string` | Ruta de un archivo de audio que se reproducirá al abrir el modal. | `undefined` |
| `multipleChildren` | `boolean` | Si es `true`, no envuelve los hijos en una etiqueta `<ul>`. | `false` |

### `ModalBibliography.Link` (Entrada)

| Prop | Tipo | Descripción |
|---|---|---|
| `name` | `string` | **(Requerido)** Nombre de la obra o recurso. Soporta HTML. |
| `authors` | `string` | Nombre de los autores o entidad responsable. |
| `link` | `string` | URL externa para consultar el recurso. |
| `addClass` | `string` | Clase CSS adicional para la entrada. |

---

## Estructura de Clases CSS

- `.modal`: Ajusta el ancho máximo del contenedor bibliográfico y el tamaño de fuente base.
- `.bibliography-link`: Estilos para cada entrada de la lista.
- `.bibliography-link a`: Maneja el comportamiento de los enlaces, incluyendo `word-break: break-all` para URLs largas y efectos de hover.

## Accesibilidad

- El título del modal utiliza una etiqueta `<h2>` centrada.
- Los enlaces externos emplean `aria-labelledby` para asociar la URL con el nombre de la obra para usuarios de lectores de pantalla.
- Se utiliza `rel="noreferrer"` y `target="_blank"` para aperturas seguras de enlaces externos.
