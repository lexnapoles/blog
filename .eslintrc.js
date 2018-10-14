module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['react'],
  globals: {
    graphql: false,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
}
