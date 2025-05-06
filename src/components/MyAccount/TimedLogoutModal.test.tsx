import React from "react"
import { render, screen, act } from "@testing-library/react"
import MyAccount from "../../../pages/account/[[...index]]"
import { PatronDataProvider } from "../../context/PatronDataContext"
import {
  processedPatron,
  processedFines,
  processedCheckouts,
  processedHolds,
  filteredPickupLocations,
} from "../../../__test__/fixtures/processedMyAccountData"
import { FeedbackProvider } from "../../context/FeedbackContext"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

jest.mock("./TimedLogoutModal", () => ({
  __esModule: true,
  default: () => <div data-testid="logout-modal">Modal is showing</div>,
}))

const accountData = {
  patron: processedPatron,
  fines: processedFines,
  checkouts: processedCheckouts,
  holds: processedHolds,
  pickupLocations: filteredPickupLocations,
}

const renderAccountPageWithProviders = (data) => {
  return render(
    <FeedbackProvider value={null}>
      <PatronDataProvider value={{ ...data }}>
        <MyAccount accountData={data} isAuthenticated={true} />
      </PatronDataProvider>
    </FeedbackProvider>
  )
}

describe("Logout modal on my account page", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it("does not show the logout modal on initial load", () => {
    renderAccountPageWithProviders(accountData)
    expect(screen.queryByTestId("logout-modal")).toBeNull()
  })

  it("shows the logout modal after 5 minutes of inactivity", () => {
    renderAccountPageWithProviders(accountData)

    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000) // 5 minutes
    })

    expect(screen.getByTestId("logout-modal")).toBeInTheDocument()
  })

  it("resets the inactivity timer on mouse move", () => {
    renderAccountPageWithProviders(accountData)

    act(() => {
      jest.advanceTimersByTime(2 * 60 * 1000) // 2 mins
      window.dispatchEvent(new Event("mousemove"))
      jest.advanceTimersByTime(4 * 60 * 1000) // 4 more mins
    })

    expect(screen.queryByTestId("logout-modal")).toBeNull()

    // Now wait 5 more minutes
    act(() => {
      jest.advanceTimersByTime(8 * 60 * 1000)
    })

    expect(screen.getByTestId("logout-modal")).toBeInTheDocument()
  })

  it("resets the inactivity timer on scroll", () => {
    renderAccountPageWithProviders(accountData)

    act(() => {
      jest.advanceTimersByTime(2 * 60 * 1000) // 2 mins
      window.dispatchEvent(new Event("scroll"))
      jest.advanceTimersByTime(4 * 60 * 1000) // 4 more mins
    })

    expect(screen.queryByTestId("logout-modal")).toBeNull()

    // Now wait 5 more minutes
    act(() => {
      jest.advanceTimersByTime(8 * 60 * 1000)
    })

    expect(screen.getByTestId("logout-modal")).toBeInTheDocument()
  })

  it("resets the inactivity timer on touch", () => {
    renderAccountPageWithProviders(accountData)

    act(() => {
      jest.advanceTimersByTime(2 * 60 * 1000) // 2 mins
      window.dispatchEvent(new Event("touchstart"))
      jest.advanceTimersByTime(4 * 60 * 1000) // 4 more mins
    })

    expect(screen.queryByTestId("logout-modal")).toBeNull()

    // Now wait 5 more minutes
    act(() => {
      jest.advanceTimersByTime(8 * 60 * 1000)
    })

    expect(screen.getByTestId("logout-modal")).toBeInTheDocument()
  })
})
