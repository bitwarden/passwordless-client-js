import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ['node_modules/'],
    rules: {
      'no-unused-vars': 'warn'
    }
  }
];
