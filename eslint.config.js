import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ['node_modules/', 'examples/simple-example/public/*.js'],
    rules: {
      'no-unused-vars': 'warn'
    }
  }
];
