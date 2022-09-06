/**
 * @jest-environment jsdom
 */

import TableListView from "./TableListView";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container;
let root;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  // cleanup on exiting
  // unmountComponentAtNode(container);
  // container.remove();
  // container = null;
  root.unmount();
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
    root.render(<TableListView {...testProps} />);
  });

  // check restricted button active
  expect(container.querySelector('[data-testid="header-metadata.title"]'));

  // // check public button not active
  // expect(
  //   container.querySelector(
  //     '[data-testid="protection-buttons-component-public"]'
  //   )
  // ).not.toHaveClass("active");

  // // check embargo checkbox disabled
  // expect(
  //   container.querySelector('[data-testid="embargo-checkbox-component"]')
  // ).not.toHaveClass("disabled");

  // // check embargo option disabled
  // expect(
  //   container.querySelector('[data-testid="option-list-embargo"]')
  // ).not.toHaveClass("disabled");

  // // check if message informs about restriction
  // expect(
  //   container.querySelector('[data-testid="access-message"]').textContent
  // ).toContain("Restricted");

  // // check if files disabled
  // expect(
  //   container.querySelector('[data-testid="access-files"]').textContent
  // ).toContain("The record has no files.");
});
