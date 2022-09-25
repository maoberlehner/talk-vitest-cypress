import {
  expect,
  it,
  render,
  screen,
  userEvent,
} from '../../../__test__/utils';

import ShoppingListApp from './ShoppingListApp.vue';

it(`should clear the input field after a successful submission`, async () => {
  let user = userEvent.setup();
  render(ShoppingListApp);
  user.type(await screen.findByLabelText(`Name`), `Foo`);
  user.click(await screen.findByRole(`button`, { name: `Add item` }));

  expect(await screen.queryByDisplayValue(`Foo`)).not.toBeInTheDocument();
});


// render(ShoppingListApp);
// let user = userEvent.setup();
// await user.type(await screen.findByLabelText(`Name`), `Foo bar`);
// await user.click(await screen.findByRole(`button`, { name: `Add item` }));

// expect(await screen.findByText(`Foo bar`)).toBeInTheDocument();
// expect(screen.queryByDisplayValue(`Foo bar`)).not.toBeInTheDocument();
