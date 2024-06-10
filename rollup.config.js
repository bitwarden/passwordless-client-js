import terser from "@rollup/plugin-terser";
import typescript from '@rollup/plugin-typescript';

const createPlugins = (compact) => compact
    ? [terser()]
    : [];

const iife = (compact) => ({
    file: `dist/iife/passwordless.iife${compact ? '.min' : ''}.js`,
    format: 'iife',
    name: 'Passwordless',
    sourcemap: true,
    exports: "named",
    plugins: createPlugins(compact),
});

const es6 = (compact) => ({
    file: `dist/esm/passwordless${compact ? '.min' : ''}.mjs`,
    format: 'esm',
    sourcemap: true,
    exports: "named",
    plugins: createPlugins(compact),
});

const umd = (compact) => ({
    file: `dist/umd/passwordless.umd${compact ? '.min' : ''}.js`,
    format: 'umd',
    name: 'Passwordless',
    esModule: false,
    exports: 'named',
    plugins: createPlugins(compact),
});

const cjs = (compact) => ({
    file: `dist/cjs/passwordless${compact ? '.min' : ''}.js`,
    format: 'cjs',
    name: 'Passwordless',
    exports: "named",
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
