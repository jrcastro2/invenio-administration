import { TableListView } from "./TableListView";

let container;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Can render public access - record without files, public comm, not embargoed", () => {
  const testProps = {
    header: "Test header",
    apiEndpoint: "/api/test",
    fields: {
      "metadata.title": { text: "Title", order: 1 },
      "metadata.subtitle": { text: "Subtitle", order: 2 },
    },
  };

  act(() => {
    render(<TableListView {...testProps} />, container);
  });

  // check restricted button active
  expect(
    container.querySelector(
      '[data-testid="protection-buttons-component-restricted"]'
    )
  ).toHaveClass("active");

  // check public button not active
  expect(
    container.querySelector(
      '[data-testid="protection-buttons-component-public"]'
    )
  ).not.toHaveClass("active");

  // check embargo checkbox disabled
  expect(
    container.querySelector('[data-testid="embargo-checkbox-component"]')
  ).not.toHaveClass("disabled");

  // check embargo option disabled
  expect(
    container.querySelector('[data-testid="option-list-embargo"]')
  ).not.toHaveClass("disabled");

  // check if message informs about restriction
  expect(
    container.querySelector('[data-testid="access-message"]').textContent
  ).toContain("Restricted");

  // check if files disabled
  expect(
    container.querySelector('[data-testid="access-files"]').textContent
  ).toContain("The record has no files.");
});
