import { it } from '@talk-vitest-cypress/application-test-driver';

import { Precondition } from '../drivers/types';

const hasItemsActive: Precondition = ({ localStorage }): void => {
  localStorage.setItem(`shopping-list`, JSON.stringify([
    { id: 1, name: `Foo`, state: `active` },
    { id: 2, name: `Bar`, state: `active` },
  ]));
};

const hasItemsInactive: Precondition = ({ localStorage }): void => {
  localStorage.setItem(`shopping-list`, JSON.stringify([
    { id: 1, name: `Foo`, state: `inactive` },
    { id: 2, name: `Bar`, state: `inactive` },
  ]));
};

it(`should list active items`, ({ driver }) => [
  driver.prepare(hasItemsActive),
  driver.goTo(`/`),
  driver.findByText(`Foo`, { withinTestId: `active items` }).shouldBeVisible(),
  driver.findByText(`Bar`, { withinTestId: `active items` }).shouldBeVisible(),
]);

it(`should list inactive items`, ({ driver }) => [
  driver.prepare(hasItemsInactive),
  driver.goTo(`/`),
  driver.findByText(`Foo`, { withinTestId: `inactive items` }).shouldBeVisible(),
  driver.findByText(`Bar`, { withinTestId: `inactive items` }).shouldBeVisible(),
]);

it(`should be possible to add a new item`, ({ driver }) => [
  driver.goTo(`/`),
  driver.findByLabelText(`Name`).type(`Foo bar`),
  driver.findByRole(`button`, { name: `Add item` }).click(),
  driver.findByText(`Foo bar`, { withinTestId: `active items` }).shouldBeVisible(),
]);

it(`should be possible to move active items to inactive items`, ({ driver }) => [
  driver.prepare(hasItemsActive),
  driver.goTo(`/`),
  driver.findByRole(`button`, { name: `Foo` }).click(),
  driver.findByText(`Foo`, { withinTestId: `inactive items` }).shouldBeVisible(),
]);

it(`should be possible to move inactive items to active items`, ({ driver }) => [
  driver.prepare(hasItemsInactive),
  driver.goTo(`/`),
  driver.findByRole(`button`, { name: `Foo` }).click(),
  driver.findByText(`Foo`, { withinTestId: `active items` }).shouldBeVisible(),
]);

// it(`should show information how to add new active items if there are none`, ({ driver }) => [
//   driver.goTo(`/`),
//   driver.findByText(`Use the form below to add new items!`).shouldBeVisible(),
//   driver.findByLabelText(`Name`).type(`Foo bar`),
//   driver.findByRole(`button`, { name: `Add item` }).click(),
//   driver.queryByText(`Use the form below to add new items!`).shouldNotExist(),
// ]);
