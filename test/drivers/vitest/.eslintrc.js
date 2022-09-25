module.exports = {
  overrides: [
    {
      files: [
        `./vitest-driver.ts`,
      ],
      env: {
        browser: true,
        node: true,
      },
    },
  ],
};
