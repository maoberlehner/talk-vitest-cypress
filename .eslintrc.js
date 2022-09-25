module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    `plugin:@typescript-eslint/eslint-recommended`,
    `plugin:@typescript-eslint/recommended`,
    `@avalanche/eslint-config`,
  ],
  plugins: [
    `@typescript-eslint`,
    `prefer-let`,
  ],
  rules: {
    'no-unused-vars': `off`,
    '@typescript-eslint/no-unused-vars': [`error`],
    'class-methods-use-this': `off`,
    'prefer-let/prefer-let': `error`,
    'prefer-const': `off`,
    'import/no-extraneous-dependencies': [`error`, {
      devDependencies: true,
      optionalDependencies: true,
      peerDependencies: true,
    }],
    'import/extensions': [
      `error`,
      `ignorePackages`,
      {
        mjs: `never`,
        js: `never`,
        jsx: `never`,
        ts: `never`,
        tsx: `never`,
      },
    ],
  },
  parserOptions: {
    parser: `@typescript-eslint/parser`,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          `.mjs`,
          `.js`,
          `.jsx`,
          `.ts`,
          `.tsx`,
          `json`,
        ],
      },
      typescript: {},
    },
    'import/extensions': [
      `.mjs`,
      `.js`,
      `.jsx`,
      `.ts`,
      `.tsx`,
    ],
  },
  overrides: [
    {
      files: [`**/*.vue`],
      extends: [
        `plugin:vue/vue3-recommended`,
      ],
      rules: {
        'vue/one-component-per-file': `off`,
      },
    },
  ],
};
