import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'default',
      sourcemap: true,
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
      exports: 'default',
      sourcemap: true,
    },
  ],
  plugins: [
    svelte(),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    typescript({
      sourceMap: true,
      inlineSources: true,
    }),
    terser(),
  ],
  external: ['svelte'],
};

