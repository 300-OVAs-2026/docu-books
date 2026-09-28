---
title: Script flatten
description: Script que mueve todos los archivos de subcarpetas al directorio raíz y elimina las carpetas vacías resultantes.
---

`flatten` es un script de bash que aplana la estructura de carpetas de un OVA. Mueve todos los archivos de cualquier subcarpeta directamente al directorio raíz indicado y luego elimina las carpetas vacías que quedan.

## Cuándo usarlo

Úsalo cuando el OVA tiene archivos distribuidos en subcarpetas y necesitas entregarlos todos en una sola carpeta plana — por ejemplo, al preparar los assets para producción o para subirlos a una plataforma que no soporta subdirectorios.

## Cómo ejecutarlo

Desde la raíz del proyecto:

```bash
npm run flatten -- <ruta-de-la-carpeta>
```

> El `--` es necesario para que `npm` pase el argumento directamente al script bash y no lo interprete como un flag de npm. El script vive en `src/scripts/flatten/` pero siempre se ejecuta desde la raíz del proyecto.

## Argumentos

| Argumento | Tipo | Req. | Descripción |
|---|---|---|---|
| `TARGET_DIR` | `string` | | Ruta de la carpeta a aplanar. Si se omite, usa la carpeta actual (`.`) |

## Ejemplos

```bash
# Aplana una carpeta de assets relativa a la raíz del proyecto
npm run flatten -- ../../../public/assets/images

# Aplana los assets de un OVA específico
npm run flatten -- ../../../public/ova-08/assets

# Aplana la carpeta actual (sin argumento)
npm run flatten
```

## Qué hace paso a paso

1. Recibe la ruta de la carpeta como argumento. Si no se pasa ninguno, usa `.` (carpeta actual)
2. Verifica que la ruta existe y es una carpeta válida. Si no, termina con error
3. Busca todos los archivos en subcarpetas (profundidad mínima 2) y los mueve a la raíz de `TARGET_DIR`
4. Elimina todas las carpetas que quedaron vacías después del movimiento

## Resultado esperado en consola

```
[*] Reorganizando archivos en: dist/ova-08
[+] Archivos movidos a la carpeta raíz: dist/ova-08
[~] Carpetas vacías eliminadas.
[OK] Listo.
```

:::caution[Esta operación no se puede deshacer]
El script mueve los archivos directamente — no los copia. Si dos archivos en subcarpetas diferentes tienen el mismo nombre, el segundo **no sobreescribirá** al primero (usa `-n` en `mv`), pero el archivo duplicado quedará sin mover. Verifica que no haya nombres repetidos antes de ejecutarlo.
:::

:::tip[Úsalo sobre una copia si no estás seguro]
Si es la primera vez que lo corres sobre un OVA, trabaja sobre una copia de la carpeta para verificar el resultado antes de aplicarlo sobre los archivos originales.

```bash
cp -r ../../../public/assets/images ../../../public/assets/images-backup
npm run flatten -- ../../../public/assets/images
```
:::