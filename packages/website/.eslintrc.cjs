// env:
//   es2021: true
//   node: true
// extends:
//   - airbnb-base
//   - plugin:@typescript-eslint/recommended
//   - plugin:prettier/recommended
//   - plugin:import/recommended
//   - plugin:import/typescript
// parser: '@typescript-eslint/parser'
// parserOptions:
//   ecmaVersion: 12
//   sourceType: module
//   project: ./tsconfig.json
// plugins:
//   - '@typescript-eslint'
// rules:
//   no-console: off
//   import/prefer-default-export: off
//   import/extensions: off
//   no-use-before-define: off
//   quotes:
//     - error
//     - single
//   '@typescript-eslint/quotes':
//     - error
//     - single

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: [
    'svelte3',
    '@typescript-eslint',
  ],
  overrides: [
    // this stays the same
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    quotes: ['error', 'single'],
  },
  settings: {
    'svelte3/typescript': true,
  },
};
