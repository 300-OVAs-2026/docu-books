# Documentación Books&Books (docu-books)

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Este proyecto es el repositorio central de documentación para los diversos componentes integrados, hooks, utilidades, actividades y juegos. Está construido utilizando [Astro](https://astro.build/) y el tema especializado en documentación [Starlight](https://starlight.astro.build/).

## 📚 Contenido de la Documentación

La documentación está organizada temáticamente dentro de `src/content/docs/`:

- **🧩 Actividades (`/activities/`):** Documentación sobre mecánicas interactivas y ejercicios (ej. drag and drop, inputs, checkbox, crucigramas).
- **🎮 Juegos (`/games/`):** Explicación y guías de uso de piezas gamificadas (juego de memoria, invasores espaciales, rompecabezas, etc.).
- **🪝 Hooks (`/hooks/`):** Referencia de Custom Hooks generales (ej. accesibilidad, atajos de teclado, pantalla completa).
- **🎨 UI (`/ui/`):** Componentes de interfaz compartidos (modales de bibliografía, botones, contenedores de matemáticas, etc.).
- **🛠 Utilidades (`/utilities/` y `/const/`):** Scripts base, manejo del DOM, constantes globales y gestión de CSS.
- **📖 Guías (`/guides/`):** Pautas y directrices de uso general.

## 🚀 Estructura del Proyecto

```text
.
├── public/             # Recursos estáticos globales
├── src/
│   ├── assets/         # Recursos locales referenciados en MD/MDX
│   ├── components/     # Componentes compartidos (Astro/React/etc.)
│   ├── content/
│   │   └── docs/       # Archivos de contenido (.md o .mdx)
│   └── styles/         # Hojas de estilo globales (global.css)
├── astro.config.mjs    # Configuración de integraciones de Astro y Starlight
├── package.json        # Configuración del proyecto y scripts
└── tsconfig.json       # Configuración de TypeScript
