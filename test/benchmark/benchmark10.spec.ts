import { it } from '@talk-vitest-cypress/application-test-driver';

for (let i = 0; i < 11; i += 1) {
  it(`should list active items`, ({ driver }) => [
    driver.goTo(`/`),
    driver.findByLabelText(`Name`).type(`Foo`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByLabelText(`Name`).type(`Bar`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByLabelText(`Name`).type(`Baz`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByText(`Foo`, { withinTestId: `active items` }).shouldBeVisible(),
    driver.findByText(`Bar`, { withinTestId: `active items` }).shouldBeVisible(),
    driver.findByText(`Baz`, { withinTestId: `active items` }).shouldBeVisible(),
  ]);

  it(`should list inactive items`, ({ driver }) => [
    driver.goTo(`/`),
    driver.findByLabelText(`Name`).type(`Foo`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByRole(`button`, { name: `Foo` }).click(),
    driver.findByLabelText(`Name`).type(`Bar`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByRole(`button`, { name: `Bar` }).click(),
    driver.findByLabelText(`Name`).type(`Baz`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByRole(`button`, { name: `Baz` }).click(),
    driver.findByText(`Foo`, { withinTestId: `inactive items` }).shouldBeVisible(),
    driver.findByText(`Bar`, { withinTestId: `inactive items` }).shouldBeVisible(),
    driver.findByText(`Baz`, { withinTestId: `inactive items` }).shouldBeVisible(),
  ]);

  it(`should be possible to add a new item`, ({ driver }) => [
    driver.goTo(`/`),
    driver.findByLabelText(`Name`).type(`Foo`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByLabelText(`Name`).type(`Bar`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByLabelText(`Name`).type(`Baz`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByText(`Foo`, { withinTestId: `active items` }).shouldBeVisible(),
    driver.findByText(`Bar`, { withinTestId: `active items` }).shouldBeVisible(),
    driver.findByText(`Baz`, { withinTestId: `active items` }).shouldBeVisible(),
  ]);

  it(`should be possible to move active items to inactive items`, ({ driver }) => [
    driver.goTo(`/`),
    driver.findByLabelText(`Name`).type(`Foo`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByRole(`button`, { name: `Foo` }).click(),
    driver.findByLabelText(`Name`).type(`Bar`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByRole(`button`, { name: `Bar` }).click(),
    driver.findByLabelText(`Name`).type(`Baz`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByRole(`button`, { name: `Baz` }).click(),
    driver.findByText(`Foo`, { withinTestId: `inactive items` }).shouldBeVisible(),
    driver.findByText(`Bar`, { withinTestId: `inactive items` }).shouldBeVisible(),
    driver.findByText(`Baz`, { withinTestId: `inactive items` }).shouldBeVisible(),
  ]);

  it(`should be possible to move inactive items to active items`, ({ driver }) => [
    driver.goTo(`/`),
    driver.findByLabelText(`Name`).type(`Foo`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByRole(`button`, { name: `Foo` }).click(),
    driver.findByRole(`button`, { name: `Foo` }).click(),
    driver.findByLabelText(`Name`).type(`Bar`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByRole(`button`, { name: `Bar` }).click(),
    driver.findByRole(`button`, { name: `Bar` }).click(),
    driver.findByLabelText(`Name`).type(`Baz`),
    driver.findByRole(`button`, { name: `Add item` }).click(),
    driver.findByRole(`button`, { name: `Baz` }).click(),
    driver.findByRole(`button`, { name: `Baz` }).click(),
    driver.findByText(`Foo`, { withinTestId: `active items` }).shouldBeVisible(),
    driver.findByText(`Bar`, { withinTestId: `active items` }).shouldBeVisible(),
    driver.findByText(`Baz`, { withinTestId: `active items` }).shouldBeVisible(),
  ]);
}
