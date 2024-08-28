const RESTRICTED_MODULES = {
  paths: [
    { name: 'dayjs', message: 'Please use lib/date/dayjs.ts instead of directly importing dayjs' },
    { name: '@chakra-ui/icons', message: 'Using @chakra-ui/icons is prohibited. Please use regular svg-icon instead (see examples in "icons/" folder)' },
    { name: '@metamask/providers', message: 'Please lazy-load @metamask/providers or use useProvider hook instead' },
    { name: '@metamask/post-message-stream', message: 'Please lazy-load @metamask/post-message-stream or use useProvider hook instead' },
    { name: 'playwright/TestApp', message: 'Please use render() fixture from test() function of playwright/lib module' },
    {
      name: '@chakra-ui/react',
      importNames: ['Popover', 'Menu'],
      message: 'Please use corresponding component or hook from ui/shared/chakra component instead',
    },
    {
      name: 'lodash',
      message: 'Please use `import [package] from \'lodash/[package]\'` instead.',
    },
  ],
  patterns: [
    'icons/*',
    '!lodash/*',
  ],
};

module.exports = {
  ignorePatterns: ['deploy/**'],
  root: true,
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:jest/recommended',
    'plugin:playwright/playwright-test',
    'next/core-web-vitals',
  ],
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'eslint-plugin-import-helpers',
    'jest',
    'eslint-plugin-no-cyrillic-string',
    '@tanstack/query',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-restricted-imports': ['error', RESTRICTED_MODULES],
    'no-empty': 'off',
    'jsx-a11y/no-autofocus': 'off',
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        "@typescript-eslint/no-empty-function": "off",
        // ... (các quy tắc TypeScript khác)
      },
    },
    {
      files: ['*.js', '*.jsx', '.eslintrc.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      files: [
        '*.config.ts',
        '*.config.js',
        'playwright/**',
        'deploy/tools/**',
        'middleware.ts',
        'nextjs/**',
        'instrumentation*.ts',
      ],
      rules: {
        'no-restricted-properties': 'off',
      },
    },
    {
      files: ['deploy/**/*.ts', 'deploy/**/*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './deploy/tsconfig.json',
      },
      rules: {
        "@typescript-eslint/no-empty-function": "off",
        // Thêm các quy tắc cụ thể cho deploy nếu cần
      },
    },
  ],
};