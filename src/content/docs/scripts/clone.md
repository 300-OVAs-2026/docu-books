---
title: Script clone
description: Script interactivo que clona repositorios de juegos de Phaser Labs directamente en el proyecto local.
---

`clone` es un script interactivo que clona repositorios de juegos desde la organización de GitHub `phaser-labs` directamente en la carpeta que elijas del proyecto. Úsalo para agregar un juego nuevo al OVA sin buscarlo manualmente en GitHub.

## Cuándo usarlo

Úsalo cuando necesitas incorporar un juego de Phaser Labs al proyecto. El script lista todos los repositorios disponibles y los clona en la ruta que especifiques.

## Cómo ejecutarlo

Desde la raíz del proyecto:

```bash
npm run clone
```

> El script vive en `src/scripts/clone/` pero siempre se ejecuta desde la raíz del proyecto. El script es completamente interactivo — no recibe argumentos.

:::caution[Requiere Git instalado]
El script verifica que Git esté disponible antes de ejecutarse. Si no lo tienes instalado, descárgalo desde [git-scm.com](https://git-scm.com/).
:::

## Flujo interactivo

**1. Seleccionar repositorio**

La CLI muestra la lista completa de juegos disponibles navegable con `↑ ↓`:

```
Selecciona un repositorio para clonar:
❯ arcanum-archer
  city-learning-game
  classic-memory-game
  frog-quiz-adventure
  maze-knowledge
  mistery-mode
  nira-wisdom-quest
  quiz-board-journey
  quiz-flight
  tap-reveal
  temple-of-knowledge
  trivia-driver
  tricky-rush
```

**2. Directorio destino**

Ingresa la ruta local donde quieres guardar el juego. Por defecto sugiere `src/components/games`:

```
Ingresa el directorio destino: src/components/games
```

**3. Nombre de carpeta personalizado**

Puedes mantener el nombre del repositorio o asignarle uno distinto:

```
¿Usar nombre de carpeta personalizado? (por defecto: arcanum-archer) (y/N)
```

**4. Confirmación final**

```
¿Clonar "arcanum-archer" en "/ruta/absoluta/src/components/games/arcanum-archer"? (Y/n)
```

> Si la carpeta ya existe, el script pregunta si deseas sobrescribirla antes de continuar.

## Resultado esperado en consola

```
🔄 Clonar Repositorios de GitHub CLI

✓ 13 repositorios disponibles

📦 Clonando repositorio...

Repositorio: https://github.com/phaser-labs/arcanum-archer
Destino: /ruta/absoluta/src/components/games/arcanum-archer

✓ arcanum-archer clonado exitosamente
Ubicación: /ruta/absoluta/src/components/games/arcanum-archer

✓ ¡Listo!
```

## Repositorios disponibles

| Repositorio | URL |
|---|---|
| `arcanum-archer` | github.com/phaser-labs/arcanum-archer |
| `city-learning-game` | github.com/phaser-labs/city-learning-game |
| `classic-memory-game` | github.com/phaser-labs/classic-memory-game |
| `frog-quiz-adventure` | github.com/phaser-labs/frog-quiz-adventure |
| `maze-knowledge` | github.com/phaser-labs/maze-knowledge |
| `mistery-mode` | github.com/phaser-labs/mistery-mode |
| `nira-wisdom-quest` | github.com/phaser-labs/nira-wisdom-quest |
| `quiz-board-journey` | github.com/phaser-labs/quiz-board-journey |
| `quiz-flight` | github.com/phaser-labs/quiz-flight |
| `tap-reveal` | github.com/phaser-labs/tap-reveal |
| `temple-of-knowledge` | github.com/phaser-labs/temple-of-knowledge |
| `trivia-driver` | github.com/phaser-labs/trivia-driver |
| `tricky-rush` | github.com/phaser-labs/tricky-rush |

:::tip[Clona siempre en `src/components/games`]
La ruta por defecto `src/components/games` es la convención del proyecto para los juegos de Phaser. Usar esta ruta garantiza que los alias de importación como `@games/arcanum-archer` funcionen sin configuración adicional.
:::

:::caution[Si la carpeta ya existe te pregunta si sobrescribir]
Si corres el script y ya existe una carpeta con el mismo nombre en el destino, el script te avisa y pregunta si deseas sobrescribirla. Esto **elimina todo el contenido** de la carpeta existente antes de clonar. Confirma solo si estás seguro.
:::