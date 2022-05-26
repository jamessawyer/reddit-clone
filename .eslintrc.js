const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    quotes: [ERROR, 'single'],
    'no-extra-semi': OFF,
    '@typescript-eslint/no-extra-semi': [ERROR],
    'prefer-const': ERROR,
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
    'import/prefer-default-export': OFF,
    'import/no-cycle': OFF,
    'no-console': process.env.NODE_ENV === 'production' ? WARN : OFF,
    // https://github.com/typescript-eslint/typescript-eslint/issues/557#issuecomment-505652331
    // 避免 OneToMany type 产生警告信息
    '@typescript-eslint/no-unused-vars': [WARN, { argsIgnorePattern: '^_' }],
    'no-plusplus': OFF,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js'],
      },
    },
  },
}
