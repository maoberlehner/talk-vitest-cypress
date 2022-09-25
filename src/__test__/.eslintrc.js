module.exports = {
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'import/no-extraneous-dependencies': [`error`, {
      devDependencies: true,
      optionalDependencies: true,
      peerDependencies: true,
    }],
  },
};
