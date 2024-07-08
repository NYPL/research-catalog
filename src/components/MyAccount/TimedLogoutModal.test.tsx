import TimedLogoutModal from "./TimedLogoutModal"
import { render, screen } from "../../../src/utils/testUtils"

// Mock next router
jest.mock("next/router", () => jest.requireActual("next-router-mock"))
jest.useFakeTimers().setSystemTime(new Date("Mon, 08 Jul 2024 12:00:00 GMT"))

describe("TimedLogoutModal", () => {
  xit("does not render if expiration is empty string", () => {
    render(
      <TimedLogoutModal
        expirationTime={""}
        stayLoggedIn={() => {
          return
        }}
      />
    )
    const heading = screen.queryByText("Your session is about to expire")
    expect(heading).not.toBeInTheDocument()
  })
  it("does not render until the timeout window has ellapsed", async () => {
    render(
      <TimedLogoutModal
        expirationTime={"Mon, 08 Jul 2024 12:01:00 GMT"}
        stayLoggedIn={() => {
          return
        }}
        timeoutWindow={1}
      />
    )
    await setTimeout(() => {
      console.log("timeout")
      const heading = screen.queryByText("Your session is about to expire")
      expect(heading).not.toBeInTheDocument()
    }, 61 * 1000)
  })
})
