module.exports = {
  extends: 'stylelint-config-recommended-scss',
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind'],
      },
    ],
    'no-descending-specificity': null,
  },
};
