module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: [
    'airbnb',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@babel/eslint-parser',
  plugins: ['react-hooks', 'jsx-a11y', 'prettier'],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['node_modules/**/*', '.cache/**/*', 'public/**/*'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'consistent-return': 'off',
    'import/extensions': [
      2,
      'never',
      {
        css: 'always',
        json: 'never',
        'web.js': 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: true,
      },
    ],
    'import/no-unresolved': [
      2,
      {
        ignore: ['antd'],
      },
    ],
    'import/prefer-default-export': 'off',
    'no-console': 0,
    'no-shadow': 'warn',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
    'react/forbid-prop-types': 0,
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'scss/at-import-partial-extension': 'off',
    'react/prop-types': 0,
  },
};
