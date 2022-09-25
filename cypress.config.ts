import { defineConfig } from 'cypress';
// import cypressWatchAndReload from 'cypress-watch-and-reload/plugins';
import path from 'path';
import webpackPreprocessor from '@cypress/webpack-preprocessor';

module.exports = defineConfig({
  e2e: {
    baseUrl: `http://localhost:5173`,
    specPattern: `test/**/*.spec.ts`,
    supportFile: `test/drivers/cypress/support/application-test.ts`,
    // env: {
    //   'cypress-watch-and-reload': {
    //     watch: [
    //       path.resolve(process.cwd(), `public/**/*`),
    //       path.resolve(process.cwd(), `src/**/*`),
    //     ],
    //   },
    // },
    setupNodeEvents(on) {
      let preprocessorOptions = {
        ...webpackPreprocessor.defaultOptions,
        webpackOptions: {
          ...webpackPreprocessor.defaultOptions.webpackOptions,
          module: {
            rules: [
              ...webpackPreprocessor.defaultOptions.webpackOptions.module.rules,
              {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: `ts-loader`,
                    options: {
                      transpileOnly: true,
                    },
                  },
                ],
              },
            ],
          },
          resolve: {
            alias: {
              '@talk-vitest-cypress/application-test-driver': path.resolve(
                process.cwd(),
                `test/drivers/cypress/cypress-driver.ts`,
              ),
            },
            extensions: [`.tsx`, `.ts`, `.js`],
          },
        },
      };
      on(`file:preprocessor`, webpackPreprocessor(preprocessorOptions));
      // return cypressWatchAndReload(on, config);
    },
  },
  downloadsFolder: `test/drivers/cypress/downloads`,
  fixturesFolder: `test/drivers/cypress/fixtures`,
  screenshotsFolder: `test/drivers/cypress/screenshots`,
  videosFolder: `test/drivers/cypress/videos`,
});
