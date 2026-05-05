---
title: Script normalize
description: Script que normaliza los nombres de archivos de una carpeta convirtiendo a minúsculas, reemplazando espacios por guiones bajos y opcionalmente renombrando con un nombre base.
---

`normalize` es un script que estandariza los nombres de archivos de una carpeta. Convierte todo a minúsculas, reemplaza espacios por guiones bajos y elimina guiones bajos duplicados. Opcionalmente renombra todos los archivos con un nombre base común más un contador (`nombre-01`, `nombre-02`...).

## Cuándo usarlo

Úsalo cuando recibes assets con nombres inconsistentes — mayúsculas, espacios, caracteres especiales — y necesitas normalizarlos antes de subirlos al proyecto.

## Cómo ejecutarlo

Desde la raíz del proyecto:

```bash
npm run normalize -- -d <ruta-carpeta>
```

Con nombre base personalizado:

```bash
npm run normalize -- -d <ruta-carpeta> -n <nombre-base>
```

> El script vive en `src/scripts/normalize/` pero siempre se ejecuta desde la raíz del proyecto.

## Opciones disponibles

| Opción | Alias | Descripción | Req. |
|---|---|---|---|
| `--directory` | `-d` | Ruta de la carpeta con los archivos a normalizar | ✓ |
| `--name` | `-n` | Nombre base para renombrar todos los archivos. Si se omite, solo normaliza los nombres existentes | |

## Comportamiento según las opciones

**Sin `--name`** — normaliza el nombre existente de cada archivo: minúsculas y espacios por guiones bajos:

```
Mi Imagen Bonita.PNG  →  mi_imagen_bonita.png
Foto 01.JPG           →  foto_01.jpg
BANNER final.webp     →  banner_final.webp
```

**Con `--name`** — renombra todos los archivos con el nombre base más un contador con padding de dos dígitos:

```
# npm run normalize -- -d ./assets -n ova_08_sld_4
cualquier-nombre.png   →  ova_08_sld_4-01.png
otra-imagen.jpg        →  ova_08_sld_4-02.jpg
foto final.webp        →  ova_08_sld_4-03.webp
```

## Ejemplos

### Normalizar nombres existentes

```bash
npm run normalize -- -d ../../../public/assets/images
```

### Renombrar con nombre base

```bash
npm run normalize -- -d ../../../public/assets/images -n ova_08_sld_4
```

### Normalizar una carpeta de audios

```bash
npm run normalize -- -d ../../../public/assets/audios
```

### Renombrar assets de un OVA completo

```bash
npm run normalize -- -d ../../../public/ova-08/images -n ova_08_img
```

## Resultado esperado en consola

```
Mi Imagen.PNG -> mi_imagen.png
Foto Final.JPG -> foto_final.jpg
✓ Filename normalization complete.
```

Con `--name`:

```
cualquier-nombre.png -> ova_08_sld_4-01.png
otra-imagen.jpg -> ova_08_sld_4-02.jpg
✓ Filename normalization complete.
```

:::tip[Combínalo con `flatten` para preparar assets de entrega]
Un flujo común es aplanar primero la carpeta y luego normalizar los nombres:

```bash
# 1. Aplanar subcarpetas
npm run flatten -- ../../../public/assets/images

# 2. Normalizar nombres
npm run normalize -- -d ../../../public/assets/images -n ova_08_img
```
:::

:::caution[Esta operación renombra los archivos en sitio]
El script renombra los archivos directamente — no los copia. Si usas `--name`, el orden del renombrado depende del orden en que el sistema operativo devuelve los archivos, que puede variar. Verifica que el resultado tiene el orden esperado.
:::