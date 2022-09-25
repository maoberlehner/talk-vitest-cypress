module.exports = {
  overrides: [
    {
      files: [
        `./cypress-driver.ts`,
      ],
      env: {
        browser: true,
        node: true,
      },
    },
  ],
};
