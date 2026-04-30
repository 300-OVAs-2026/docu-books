---
title: Usos
description: A guide in my new Starlight docs site.
---

## 💻 Uso

### Importar Componentes

```tsx
// Actividades
import { CheckboxActivity } from './core/components/activities/checkbox-activity'
import { DndActivity } from './core/components/activities/dnd-activity'

// Juegos
import { GameBallons } from './core/components/games/game-ballons'
import { GameBottles } from './core/components/games/game-bottles'

// Features
import { DownloadLink } from './components/features/download-link'
import { FullscreenButton } from './core/components/ui/fullscreen-button'
```

### Usar Hooks

```tsx
import { useFullScreen } from './core/hooks/use-full-screen'
import { useTitle } from './core/hooks/use-title'
import { useKeyboardShortcuts } from './core/hooks/use-keyboard-shortcuts'

function MyComponent() {
  const { isFullscreen, toggleFullscreen } = useFullScreen()
  useTitle('Mi Página')
  useKeyboardShortcuts({
    'Ctrl+F': toggleFullscreen
  })
  
  return (
    <div>
      {/* Tu contenido */}
    </div>
  )
}
```

### Usar Utilidades

```tsx
import { focusMain } from './core/utils/focus-main'
import { loadCSS } from './core/utils/load-css'

// Cargar CSS dinámicamente
loadCSS('https://example.com/styles.css')

// Enfocar elemento principal
focusMain()
```
