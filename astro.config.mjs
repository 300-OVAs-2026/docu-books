// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Books&Books 2026',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        {
          label: 'Guías',
          autogenerate: { directory: 'guides' }
        },
        {
          label: 'Actividades',
          autogenerate: { directory: 'activities' }
        },
        {
          label: 'Juegos',
          autogenerate: { directory: 'games' }
        },
        {
          label: 'Componentes UI',
          autogenerate: { directory: 'ui' }
        },
        {
          label: 'Hooks',
          autogenerate: { directory: 'hooks' }
        },
        {
          label: 'Utilidades',
          autogenerate: { directory: 'utilities' }
        },
        {
          label: 'Constantes',
          autogenerate: { directory: 'const' }
        }
      ],
    }),
    react()
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
