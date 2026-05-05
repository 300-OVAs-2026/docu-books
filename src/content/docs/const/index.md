---
title: Constantes Globales
description: Diccionarios y valores constantes utilizados en todo el ecosistema del OVA.
---

Este documento centraliza las constantes y configuraciones estáticas utilizadas por los componentes, hooks y utilidades del proyecto. Al usar estas constantes, aseguramos que el código sea fácil de mantener y libre de errores de escritura (typos).

---

## Eventos Personalizados (`EVENTS`)

Define los nombres de los eventos globales que se despachan a través de `document` para la comunicación entre componentes.

| Constante | Valor | Uso |
|---|---|---|
| `OVATITLEUPDATE` | `'OvaTitleUpdate'` | Actualiza el título del Header. |
| `CHANGEINTERPRETEVIDEOSOURCES` | `'changeInterpreteVideoSources'` | Cambia el video del intérprete de señas. |

**Archivo:** `src/components/shared/constants/events.ts`

---

## Accesibilidad (`KEY_LOCAL_STORAGE_A11Y`)

Define la clave única bajo la cual se guarda la configuración de accesibilidad del usuario en el almacenamiento local del navegador.

- **Valor:** `'ova-a11y-config'`
- **Uso:** Sincronizar las preferencias del panel de accesibilidad (modo oscuro, contraste, etc.) para que persistan aunque el usuario cierre el navegador.

**Archivo:** `src/components/shared/constants/key-a11y.ts`

---

## Expresiones Regulares (`REMOVE_HTML_TAGS_REGEX`)

Contiene expresiones regulares comunes para el tratamiento de cadenas de texto.

- **Regex:** `/<\/?[^>]+>/gi`
- **Propósito:** Eliminar cualquier etiqueta HTML de un string para obtener solo el texto plano.
- **Uso Común:** Limpiar campos de texto enriquecido antes de enviarlos a un lector de pantalla o a un sistema de búsqueda.

**Archivo:** `src/components/shared/constants/remove-html-tags-regex.ts`

---

## Cómo usarlas

Para utilizar cualquiera de estas constantes, impórtalas directamente desde el punto de entrada de constantes:

```tsx
import { EVENTS, REMOVE_HTML_TAGS_REGEX } from '@shared/constants';

// Ejemplo de uso
const cleanText = "<strong>Hola</strong>".replace(REMOVE_HTML_TAGS_REGEX, '');
```
