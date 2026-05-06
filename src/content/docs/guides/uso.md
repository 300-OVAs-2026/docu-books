---
title: Guía de Uso y Buenas Prácticas
description: Estándares de desarrollo, nomenclatura y convenciones para el equipo frontend de Books&Books.
---

Esta guía establece los estándares técnicos para el desarrollo de OVAs en 2026. Seguir estas convenciones garantiza que el código sea mantenible, escalable y consistente entre diferentes proyectos.

## Estructura y Nomenclatura

### Archivos de Página
Para mantener la trazabilidad entre el diseño y el desarrollo, cada página de un OVA debe seguir estrictamente esta nomenclatura en minúsculas y usando guiones:

`ova-(número)-p(página).tsx`

**Ejemplos:**
- ✅ `ova-01-p01.tsx`
- ✅ `ova-15-p12.tsx`
- ❌ `OVA01P01.tsx` (No usar CamelCase)
- ❌ `ova_01_p01.tsx` (No usar underscores)

### Convención de Escritura

Estamos migrando de `CamelCase` a `kebab-case` para nombres de archivos, carpetas y clases CSS. 

- **Archivos/Carpetas:** `mi-componente-nuevo.tsx`
- **Clases CSS:** `.u-button-primary`
- **Variables CSS:** `--color-brand-primary`

---

## Importaciones (Barrel Method)

Para mantener los archivos limpios y facilitar las rutas, utilizamos **Barrel Exports** (archivos `index.ts` que centralizan las exportaciones). **Nunca** importes directamente desde la ruta profunda del archivo.

### Uso correcto con Aliases

Utilizamos alias configurados en el proyecto para evitar rutas relativas complejas como `../../../`.

```tsx
// ✅ BIEN: Importaciones limpias vía Barrel y Alias
import { CheckboxActivity, DndActivity } from '@activities';
import { GameBallons, GameBottles } from '@games';
import { Button, Modal, Toast } from '@ui';
import { useFullScreen, useTitle } from '@shared/hooks';

// ❌ MAL: Importaciones directas y rutas relativas largas
import { CheckboxActivity } from '../../components/activities/checkbox/checkbox-activity.tsx';
```
