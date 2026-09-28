# Documentación Books&Books (docu-books)

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Este proyecto es el repositorio central de documentación para los diversos componentes integrados, hooks, utilidades, actividades y juegos. Está construido utilizando [Astro](https://astro.build/) y el tema especializado en documentación [Starlight](https://starlight.astro.build/).

## ✅ Como empezar

1. npm install
2. npm run dev

## 🤝 Contribuir

- Revisa la guía en `CONTRIBUTING.md`.
- Usa la plantilla en `src/content/docs/guides/como-documentar.mdx` para crear nuevas páginas.

## 📚 Contenido de la Documentación

La documentación está organizada temáticamente dentro de `src/content/docs/`:

- **🧩 Actividades (`/activities/`):** Documentación sobre mecánicas interactivas y ejercicios (ej. drag and drop, inputs, checkbox, crucigramas).
- **🎮 Juegos (`/games/`):** Explicación y guías de uso de piezas gamificadas (juego de memoria, invasores espaciales, rompecabezas, etc.).
- **🏗️ Layouts (`/layouts/`):** Estructuras de página, contenedores principales y organización de vistas.
- **✨ Features (`/features/`):** Componentes de funcionalidad específica (accesibilidad, pantalla completa, atajos).
- **🎨 UI (`/ui/`):** Componentes de interfaz compartidos (modales, botones, acordeones, etc.).
- **📂 Scripts (`/scripts/`):** Lógica de validación, manejo de eventos y scripts utilitarios.
- **🪝 Hooks (`/hooks/`):** Referencia de Custom Hooks (accesibilidad, teclado, sesión, etc.).
- **🛠 Utilidades (`/utilities/` y `/const/`):** Manejo del DOM, constantes globales y gestión de títulos/foco.
- **📖 Guías (`/guides/`):** Pautas, directrices de uso general y manual de contribución.

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
