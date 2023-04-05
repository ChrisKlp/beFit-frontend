module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': ['off'],
    'react/require-default-props': ['off'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react/button-has-type': ['warn'],
    '@typescript-eslint/ban-types': ['warn'],
    'import/extensions': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'no-underscore-dangle': ['off'],
  },
  ignorePatterns: ['vite.config.ts', '*.cjs'],
};
