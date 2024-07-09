import TimedLogoutModal from "./TimedLogoutModal"
import { render, screen } from "../../../src/utils/testUtils"

// Mock next router
jest.mock("next/router", () => jest.requireActual("next-router-mock"))
jest.useFakeTimers().setSystemTime(new Date("Mon, 08 Jul 2024 12:00:00 GMT"))

describe("TimedLogoutModal", () => {
  it.todo("does not render if expiration is empty string")
  it.todo("does not render until the timeout window has ellapsed")
  it.todo("closes and redirects when time till expiration is zero")
  it.todo("returns to account page when user clicks stay logged in")
})
