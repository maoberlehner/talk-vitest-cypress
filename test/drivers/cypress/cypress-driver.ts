import {
  cy,
  it as itCypress,
} from 'local-cypress';

import type {
  Assertions,
  AssertionsNot,
  Driver,
  Interactions,
  ItCallback,
  MockEndpoint,
} from '../types';

// eslint-disable-next-line no-undef
type ElementResolver = () => Cypress.Chainable;

function makeAssertions(elementResolver: ElementResolver): Assertions {
  return {
    shouldHaveAttribute: (attribute, value) => () => elementResolver()
      .should(`have.attr`, attribute).and(`match`, value),
    shouldBeVisible: () => () => elementResolver().should(`be.visible`),
    shouldMatchScreenshot: () => () => { throw new Error(`Not implemented! Use a different driver for this!`); },
  };
}

function makeAssertionsNot(elementResolver: ElementResolver): AssertionsNot {
  return {
    shouldNotBeVisible: () => () => elementResolver().should(`not.be.visible`),
    shouldNotExist: () => () => elementResolver().should(`not.exist`),
  };
}

function makeInteractions(elementResolver: ElementResolver): Interactions {
  return {
    check: () => () => {
      elementResolver().check();
    },
    click: () => () => {
      elementResolver().click();
    },
    focus: () => () => {
      elementResolver().focus();
    },
    type: text => () => {
      elementResolver().clear();
      elementResolver().type(`${text}`);
    },
  };
}

function makeActions(elementResolver: ElementResolver): Assertions & Interactions {
  return {
    ...makeAssertions(elementResolver),
    ...makeInteractions(elementResolver),
  };
}

const mockEndpoint: MockEndpoint = (endpoint, {
  body: bodyOrGetBody,
  httpVerb = `get`,
  status = 200,
}) => {
  let getBody = typeof bodyOrGetBody === `function` ? bodyOrGetBody : () => bodyOrGetBody;
  cy.intercept(`${endpoint}*`, {
    method: httpVerb.toUpperCase(),
  }, (req) => {
    req.reply({
      statusCode: status,
      body: getBody({ searchParams: new URLSearchParams(req.url.split(`?`)[1]) }),
    });
  });
};

const makeDriver = (): Driver => ({
  goTo(path) {
    return () => {
      cy.visit(path);
    };
  },
  findByLabelText(text) {
    return makeActions(() => cy.findByLabelText(text));
  },
  findByRole(role, { name }) {
    return makeActions(() => cy.findByRole(role, { name }));
  },
  findByText(text, { withinTestId = null } = {}) {
    return makeAssertions(() => {
      let cyLocal = withinTestId ? cy.findByTestId(withinTestId) : cy;
      return cyLocal.findByText(text);
    });
  },
  findAllByText(text, { withinTestId = null } = {}) {
    return makeAssertions(() => {
      let cyLocal = withinTestId ? cy.findByTestId(withinTestId) : cy;
      return cyLocal.findAllByText(text);
    });
  },
  findByTestId(testId) {
    return makeActions(() => cy.findByTestId(testId));
  },
  prepare(precondition) {
    return () => precondition({ localStorage, mockEndpoint });
  },
  queryByText(text, { withinTestId = null } = {}) {
    return makeAssertionsNot(() => {
      let cyLocal = withinTestId ? cy.findByTestId(withinTestId) : cy;
      return cyLocal.findByText(text);
    });
  },
});

function wrapItCallback(func: ItCallback) {
  return () => {
    let driver = makeDriver();
    let steps = func({ driver });
    // eslint-disable-next-line no-restricted-syntax
    for (let step of steps) {
      let nestedCallback = step({ driver });
      // Step definitions return another callback.
      if (typeof nestedCallback === `function`) nestedCallback();
    }
  };
}

const it = (description: string, func: ItCallback) => itCypress(
  description,
  wrapItCallback(func),
);
it.only = (description: string, func: ItCallback) => itCypress.only(
  description,
  wrapItCallback(func),
);

export {
  it,
};
