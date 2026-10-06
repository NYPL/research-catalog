import { render, screen, waitFor } from "@testing-library/react"
import { FocusProvider, useFocusContext } from "./FocusContext"

const TestComponent = () => {
  const { activeElementId, redirectFocusTarget } = useFocusContext()
  return (
    <div>
      <div data-testid="active-element-id">{activeElementId}</div>
      <div data-testid="redirect-focus-target">{redirectFocusTarget}</div>
      <button id="button-id">Target</button>
    </div>
  )
}

describe("FocusProvider", () => {
  const originalWindowLocation = window.location
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      value: new URL(window.location.href),
      writable: true,
    })
    window.history.replaceState = jest.fn()
  })
  afterEach(() => {
    Object.defineProperty(window, "location", {
      value: originalWindowLocation,
    })
    jest.restoreAllMocks()
  })

  it("does nothing if there is no focus param in the url", async () => {
    window.location.href =
      "https://local.nypl.org:8080/research/research-catalog/account"

    render(
      <FocusProvider>
        <TestComponent />
      </FocusProvider>
    )

    expect(screen.getByTestId("redirect-focus-target")).toBeEmptyDOMElement()
    expect(window.history.replaceState).not.toHaveBeenCalled()
  })

  it("sets redirectFocusTarget and activeElementId from the focus param in the url", async () => {
    window.location.href =
      "https://local.nypl.org:8080/research/research-catalog/account?focus=button-id"

    render(
      <FocusProvider>
        <TestComponent />
      </FocusProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId("redirect-focus-target")).toHaveTextContent(
        "button-id"
      )
      expect(screen.getByTestId("active-element-id")).toHaveTextContent(
        "button-id"
      )
    })
    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveFocus()
    })
    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      "",
      "/research/research-catalog/account"
    )
  })

  it("preserves other query params and hash when cleaning up focus param", async () => {
    window.location.href =
      "https://local.nypl.org:8080/research/research-catalog/account?bon=jour&focus=button-id"

    render(
      <FocusProvider>
        <TestComponent />
      </FocusProvider>
    )

    await waitFor(() => {
      expect(window.history.replaceState).toHaveBeenCalledWith(
        {},
        "",
        "/research/research-catalog/account?bon=jour"
      )
    })
  })
})
