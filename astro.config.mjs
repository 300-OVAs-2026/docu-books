// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import UnoCSS from "@unocss/astro";
import path from "path";
import { fileURLToPath } from "url";
import TurboConsole from "unplugin-turbo-console/vite";
import VitePluginSvgSpritemap from "@spiriit/vite-plugin-svg-spritemap";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: "https://demos.booksandbooksdigital.com.co",
  base: "/docu-books/",
  integrations: [
    starlight({
      title: "OVAS 2026",
      defaultLocale: "root",
      locales: {
        root: {
          label: "Español",
          lang: "es",
        },
      },
      customCss: ["./src/styles/starlight-theme.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/300-OVAs-2026/core",
        },
      ],
      sidebar: [
        {
          label: "Guías",
          autogenerate: { directory: "guides" },
          badge: { text: "¡Nuevo!", variant: "tip" },
        },
        {
          label: "Actividades",
          autogenerate: { directory: "activities" },
          collapsed: true,
        },
        {
          label: "Juegos",
          autogenerate: { directory: "games" },
          collapsed: true,
        },
        {
          label: "Layouts",
          autogenerate: { directory: "layouts" },
          collapsed: true,
        },
        {
          label: "Features",
          autogenerate: { directory: "features" },
          collapsed: true,
        },
        {
          label: "Componentes UI",
          autogenerate: { directory: "ui" },
          collapsed: true,
        },
        {
          label: "Scripts",
          autogenerate: { directory: "scripts" },
          collapsed: true,
        },
        {
          label: "Hooks",
          autogenerate: { directory: "hooks" },
          collapsed: true,
        },
        {
          label: "Utilidades",
          autogenerate: { directory: "utilities" },
          collapsed: true,
        },
        {
          label: "Constantes",
          autogenerate: { directory: "const" },
          collapsed: true,
        },
      ],
    }),
    react(),
    UnoCSS({ injectReset: false }),
  ],

  vite: {
    plugins: [
      tailwindcss(),
      TurboConsole({
        // @ts-ignore
        disableLaunchEditor: true,
      }),
      VitePluginSvgSpritemap("**/icons/*.svg", {
        prefix: "icon-",
      }),
    ],
    server: {
      host: true,
    },
    build: {
      target: "ES2022",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/@react-pdf")) return "vendor-pdf";
            if (
              id.includes("node_modules/motion") ||
              id.includes("node_modules/framer-motion")
            )
              return "vendor-motion";
            if (
              id.includes("node_modules/@tiptap") ||
              id.includes("node_modules/prosemirror")
            )
              return "vendor-tiptap";
            if (
              id.includes("node_modules/@react-aria") ||
              id.includes("node_modules/@react-stately") ||
              id.includes("node_modules/react-stately")
            )
              return "vendor-react-aria";
            if (id.includes("node_modules/@atlaskit")) return "vendor-atlaskit";
            if (
              id.includes("node_modules/react-popper") ||
              id.includes("node_modules/react-draggable") ||
              id.includes("node_modules/@popperjs")
            )
              return "vendor-popper";
            if (id.includes("node_modules/lucide-react")) return "vendor-icons";
            if (id.includes("node_modules/gsap")) return "vendor-gsap";
            if (id.includes("node_modules/books-ui")) return "vendor-books-ui";
            if (id.includes("node_modules/wouter")) return "vendor-router";
            if (id.includes("node_modules/zustand")) return "vendor-state";
            if (id.includes("node_modules")) return "vendor";
          },
        },
      },
    },
    resolve: {
      alias: {
        "@/": `${path.resolve(__dirname, "src")}/`,
        "@/shared": `${path.resolve(__dirname, "src/components/shared")}/`,
        "@shared": `${path.resolve(__dirname, "src/components/shared")}/`,
        "@activities": `${path.resolve(__dirname, "src/components/shared/components/activities")}/`,
        "@features": `${path.resolve(__dirname, "src/components/shared/components/features")}/`,
        "@games": `${path.resolve(__dirname, "src/components/shared/components/games")}/`,
        "@layouts": `${path.resolve(__dirname, "src/components/shared/components/layouts")}`,
        "@ui": `${path.resolve(__dirname, "src/components/shared/components/ui")}`,
        "@pages": `${path.resolve(__dirname, "src/pages")}/`,
        "@router": `${path.resolve(__dirname, "src/router")}/`,
        "@styles": `${path.resolve(__dirname, "src/components/shared/styles")}/`,
      },
    },
  },
});
