/* eslint-disable no-undef */
import "@testing-library/jest-dom"

// We expect an error to be thrown and we do catch, but it still gets
// logged and we don't want to see expected errors while we test.
jest.spyOn(global.console, "error").mockImplementation(() => jest.fn())
jest.spyOn(global.console, "warn").mockImplementation(() => jest.fn())

// Increase timeout on tests
jest.setTimeout(35000)
