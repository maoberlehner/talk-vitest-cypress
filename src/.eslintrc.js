module.exports = {
  env: {
    browser: true,
    node: false,
  },
  rules: {
    'import/no-extraneous-dependencies': [`error`, {
      devDependencies: false,
      optionalDependencies: false,
      peerDependencies: false,
    }],
  },
  overrides: [
    {
      files: [`.eslintrc.js`],
      env: {
        browser: false,
        node: true,
      },
    },
  ],
};
