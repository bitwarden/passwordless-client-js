import {terser} from 'rollup-plugin-terser';

const iife = (compact) => ({
  file: `dist/passwordlessclient${compact ? ".min" : ""}.js`,
  format: "iife",
  name: "Passwordless",
  sourcemap: true,
  plugins: compact ? [terser()] : []
});

const es6 = (compact) => ({
  file: `dist/passwordlessclient${compact ? ".min" : ""}.mjs`,
  format: "es",
  sourcemap: true,
  plugins: compact ? [terser()] : []
});

const umd = (compact) => ({
    file: `dist/passwordlessclient.umd${compact ? ".min" : ""}.js`,
    format: "umd",
    name: "Passwordless",
    plugins: compact ? [terser()] : []
  });

  console.log(iife(false));

export default {
  input: "src/main.js",
  output: [
    iife(false),
    iife(true),
    es6(false),
    es6(true),
    umd(false),
    umd(true),
  ],
};
