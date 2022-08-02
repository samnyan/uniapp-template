module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-plusplus': 'off',
    'max-len': 'off',
    semi: ['warn', 'never'],
    // 解决vite+airbnb导致eslint报错import/extensions
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'vue/multi-word-component-names': ['off', {
      ignores: ['template', 'view', 'image', 'text'],
    }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  globals: {
    /** 避免uni报错 */
    uni: true,
    UniApp: true,
  },
};
