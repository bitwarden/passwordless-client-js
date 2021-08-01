import {terser} from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const createPlugins = (compact) => compact
  ? [terser()]
  : [];

const iife = (compact) => ({
  file: `dist/passwordless.iife${compact ? '.min' : ''}.js`,
  format: 'iife',
  name: 'passwordless',
  sourcemap: true,
  plugins: createPlugins(compact),
});

const es6 = (compact) => ({
  file: `dist/passwordless${compact ? '.min' : ''}.mjs`,
  format: 'es',
  sourcemap: true,
  plugins: createPlugins(compact),
});

const umd = (compact) => ({
  file: `dist/passwordless.umd${compact ? '.min' : ''}.js`,
  format: 'umd',
  name: 'Passwordless',
  plugins: createPlugins(compact),
});

const cjs = (compact) => ({
  file: `dist/passwordless${compact ? '.min' : ''}.js`,
  format: 'cjs',
  name: 'Passwordless',
  plugins: createPlugins(compact),
});

export default {
  input: 'src/passwordless.ts',
  plugins: [typescript()],
  output: [
    iife(false),
    iife(true),
    es6(false),
    es6(true),
    umd(false),
    umd(true),
    cjs(false),
    cjs(true),
  ],
};
