type ActionCallback = () => unknown|Promise<unknown>;

export type Interactions = {
    check: () => ActionCallback,
    click: () => ActionCallback,
    focus: () => ActionCallback,
    type: (text: string) => ActionCallback,
}

export type Assertions = {
    shouldBeVisible: () => ActionCallback,
    shouldHaveAttribute: (name: string, value?: string|RegExp) => ActionCallback,
    shouldMatchScreenshot: (name: string) => ActionCallback,
}

export type AssertionsNot = {
    shouldNotBeVisible: () => ActionCallback,
    shouldNotExist: () => ActionCallback,
}

type FindByLabelText = (text: string) => Interactions & Assertions;

type Role = `button`|`link`|`option`|`tab`;

type FindByRoleOptions = {
    name: string,
};

type FindByRole = (role: Role, options: FindByRoleOptions) => Interactions & Assertions;

type FindByTestId = (testId: string) => Interactions & Assertions;

type FindByTextOptions = {
    withinTestId?: string,
};

type FindByText = (text: string, options?: FindByTextOptions) => Assertions;

type FindAllByText = (text: string, options?: FindByTextOptions) => Assertions;

type QueryByText = (text: string, options?: FindByTextOptions) => AssertionsNot;

export type GoToOptions = {
    device?: `desktop`|`mobile`,
};

type GoTo = (path: string, options?: GoToOptions) => () => void;

type Body = Record<string|number, unknown>;

type GetBody = ({ searchParams }: { searchParams: URLSearchParams }) => Body;

export type MockEndpoint = (endpoint: string, options: {
  body: Body|GetBody,
  httpVerb: `get`|`post`|`patch`|`delete`,
  status: number,
}) => void;

type PreconditionOptions = {
  localStorage: typeof window.localStorage,
  mockEndpoint: MockEndpoint,
}

export type Precondition = (options: PreconditionOptions) => void;

export type Prepare = (precondition: Precondition) => () => void;

export type Driver = {
    findAllByText: FindAllByText,
    findByLabelText: FindByLabelText,
    findByRole: FindByRole,
    findByTestId: FindByTestId,
    findByText: FindByText,
    goTo: GoTo,
    prepare: Prepare,
    queryByText: QueryByText,
}

type Step = (() => unknown|void)|(({ driver }: { driver: Driver }) => Step[]);

export type ItCallback = ({ driver }: { driver: Driver }) => Step[];
