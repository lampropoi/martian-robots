module.exports = {
  extends: [
    'airbnb'
  ],
  rules: {
    'arrow-parens': [2, 'as-needed', {'requireForBlockBody': false}],
    'comma-dangle': ['off'],
    'jsx-a11y/img-has-alt': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'import/prefer-default-export': 'off',
    'max-len': ['error', 120],
    'no-inline-comments': ['error'],
    'no-loop-func': 'off',
    'no-mixed-operators': 'off',
    'no-plusplus': 'off',
    'no-return-assign': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-spacing': ['error', 'never'],
    'react/forbid-prop-types': ['error', {'forbid': ['array', 'object']}],
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-filename-extension': [1, {'extensions': ['.js', '.jsx']}]
  },
  env: {
    browser: true
  }
};
