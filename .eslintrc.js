module.exports = {
  root: true,
  extends: ['@react-native', 'eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/jsx-no-undef': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-methods',
          'instance-methods',
          'instance-variables',
          'constructor',
          'render',
        ],
      },
    ],
  },
};
