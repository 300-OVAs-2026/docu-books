import { defineConfig } from 'unocss';
import { presetOVA } from './src/components/shared/theme/preset-ova';

export default defineConfig({
  presets: [
    presetOVA()
  ]
});
