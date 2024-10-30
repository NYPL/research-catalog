/* eslint-disable no-undef */
import "@testing-library/jest-dom"
import { configure } from "@testing-library/dom"
// The scrollIntoView function is necessary for the Tabs component.
window.HTMLElement.prototype.scrollIntoView = jest.fn()

//Set up jose to mock auth for every page test
jest.mock("jose", () => ({
  importSPKI: async () => Promise.resolve("testPublicKey"),
  jwtVerify: async () => ({
    payload: {},
  }),
}))

// We expect an error to be thrown and we do catch, but it still gets
// logged and we don't want to see expected errors while we test.
jest.spyOn(global.console, "error").mockImplementation(() => jest.fn())
jest.spyOn(global.console, "warn").mockImplementation(() => jest.fn())

// Increase timeout on tests
jest.setTimeout(40000)

const mockPatronJwtDecodedObj = {
  iss: "",
  sub: "123",
  aud: "",
  iat: 123,
  exp: 123,
  auth_time: 123,
  scope: "openid",
}

// Mock the "jose" library that does the JWT verification.
jest.mock("jose", () => ({
  importSPKI: async () => Promise.resolve("testPublicKey"),
  jwtVerify: async () => ({
    payload: mockPatronJwtDecodedObj,
  }),
}))

// Set NEXT_PUBLIC_APP_ENV to "development" for jest tests
process.env.NEXT_PUBLIC_APP_ENV = "development"

// Related to the useNYPLBreakpoints hook which is used in: ButtonGroup,
// FeedbackBox, Modal, MultiSelectGroup, and NewsletterSignup.
import { MatchMedia } from "@nypl/design-system-react-components"

new MatchMedia()

window.HTMLElement.prototype.scrollIntoView = jest.fn()
