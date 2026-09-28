---
title: Script pages
description: Script interactivo que genera archivos de página vacíos con nombres estandarizados y contador automático.
---

`pages` es un script interactivo que crea múltiples archivos de página vacíos de una vez. Genera los archivos con un nombre base, un índice con padding automático y la extensión que elijas. Ideal para preparar la estructura de un OVA nuevo antes de empezar a desarrollar.

## Cuándo usarlo

Úsalo al inicio de un OVA nuevo cuando necesitas crear varios archivos de página de una vez — por ejemplo, `ova-08-p01.tsx`, `ova-08-p02.tsx`, ..., `ova-08-p15.tsx` — sin crearlos uno por uno a mano.

## Cómo ejecutarlo

Desde la raíz del proyecto:

```bash
npm run pages
```

> El script vive en `src/scripts/pages/` pero siempre se ejecuta desde la raíz del proyecto. El script es completamente interactivo — no recibe argumentos, solo te hace preguntas.

## Flujo interactivo

Al correrlo la CLI te guía con estas preguntas en orden:

**1. Ruta del directorio**

```
Enter the directory path: ./pages
```

> Si la carpeta no existe, el script la crea automáticamente.

**2. Nombre base de los archivos**

```
Enter the base name for page files: ova-08-p
```

**3. Índice de inicio**

```
Enter the starting index: 1
```

> El índice determina desde qué número empieza el contador. Si ya tienes 5 páginas y necesitas agregar más, pon `6` para continuar desde donde quedaste.

**4. Extensión del archivo**

```
Select file extension:
❯ TSX (.tsx)
  JSX (.jsx)
  HTML (.html)
  JavaScript (.js)
  CSS (.css)
  Custom
```

> Navega con `↑ ↓` y confirma con `Enter`. Si eliges `Custom`, te pedirá que escribas la extensión manualmente.

**5. Cantidad de archivos**

```
How many files do you want to create? 15
```

> Máximo 1000 archivos por ejecución.

**6. Confirmación**

```
Create 15 files (ova-08-p-1.tsx, ...) in "./pages"? (Y/n)
```

> Si cancelas con `N` o con `Ctrl+C`, no se crea ningún archivo.

## Resultado esperado en consola

```
📁 Create Page Files CLI

✓ Created: ova-08-p-01.tsx
✓ Created: ova-08-p-02.tsx
✓ Created: ova-08-p-03.tsx
...
✓ Created: ova-08-p-15.tsx

✓ Successfully created 15 files in /ruta/absoluta/pages
```

> El padding del índice se ajusta automáticamente según la cantidad de archivos. Si creas 10 o más, los índices quedan como `01`, `02`... Si creas 100 o más, como `001`, `002`...

## Ejemplos de nombres generados

Con `baseName: ova-08-p`, `startIndex: 1`, `count: 5`, extensión `.tsx`:

```
ova-08-p-01.tsx
ova-08-p-02.tsx
ova-08-p-03.tsx
ova-08-p-04.tsx
ova-08-p-05.tsx
```

Continuando desde el índice 6 con `startIndex: 6`, `count: 3`:

```
ova-08-p-06.tsx
ova-08-p-07.tsx
ova-08-p-08.tsx
```

:::tip[Usa el índice de inicio para agregar páginas a un OVA existente]
Si ya tienes páginas creadas y necesitas agregar más, ajusta el `startIndex` para que el contador continúe desde donde quedaste y no pise los archivos existentes.

```
# Ya existen ova-08-p-01.tsx ... ova-08-p-10.tsx
# Corre el script con startIndex: 11 para continuar
```
:::

:::note[Los archivos se crean vacíos]
`pages` solo crea la estructura de archivos — no escribe contenido dentro. Después de generarlos, agrega el código de cada página manualmente o usa el script `clone` para copiar la estructura de una página existente.
:::