import { renderHook } from "@testing-library/react"
import {
  applyFocusAfterRedirect,
  useLoginRedirect,
  useLogoutRedirect,
} from "./useAuthRedirect"

describe("useLoginRedirect", () => {
  const originalWindowLocation = window.location
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      value: new URL(window.location.href),
      writable: true,
    })
  })
  afterEach(() => {
    Object.defineProperty(window, "location", {
      value: originalWindowLocation,
    })
  })

  it("should return the login link redirecting back to the current page", () => {
    window.location.href =
      "https://local.nypl.org:8080/research/research-catalog/search/advanced"
    const { result } = renderHook(() => useLoginRedirect())
    expect(result.current).toBe(
      "https://dev-login.nypl.org/auth/login?redirect_uri=https%3A%2F%2Flocal%2Enypl%2Eorg%3A8080%2Fresearch%2Fresearch-catalog%2Fsearch%2Fadvanced"
    )
  })

  it("should include the focus id as a query param when provided", () => {
    window.location.href =
      "https://local.nypl.org:8080/research/research-catalog/search/advanced"
    const { result } = renderHook(() => useLoginRedirect("myFocusId"))
    expect(result.current).toBe(
      "https://dev-login.nypl.org/auth/login?redirect_uri=https%3A%2F%2Flocal%2Enypl%2Eorg%3A8080%2Fresearch%2Fresearch-catalog%2Fsearch%2Fadvanced%3Ffocus%3DmyFocusId"
    )
  })
})

describe("applyFocusAfterRedirect", () => {
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

  it("does nothing if there is no focus param in the url", () => {
    window.location.href =
      "https://local.nypl.org:8080/research/research-catalog/account"
    const persistentFocusSetter = jest.fn()

    applyFocusAfterRedirect(persistentFocusSetter)

    expect(persistentFocusSetter).not.toHaveBeenCalled()
    expect(window.history.replaceState).not.toHaveBeenCalled()
  })

  it("sets focus to the target found in the url when no expected target is given", () => {
    window.location.href =
      "https://local.nypl.org:8080/research/research-catalog/account?focus=myFocusId"
    const persistentFocusSetter = jest.fn()
    const followUpOperation = jest.fn()

    applyFocusAfterRedirect(persistentFocusSetter, undefined, followUpOperation)

    expect(persistentFocusSetter).toHaveBeenCalledWith("myFocusId")
    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      "",
      "/research/research-catalog/account"
    )
    expect(followUpOperation).toHaveBeenCalled()
  })

  it("sets focus and runs the follow up operation when the focus target matches the expected target", () => {
    window.location.href =
      "https://local.nypl.org:8080/research/research-catalog/account?focus=myFocusId"
    const persistentFocusSetter = jest.fn()
    const followUpOperation = jest.fn()

    applyFocusAfterRedirect(
      persistentFocusSetter,
      "myFocusId",
      followUpOperation
    )

    expect(persistentFocusSetter).toHaveBeenCalledWith("myFocusId")
    expect(followUpOperation).toHaveBeenCalled()
  })

  it("does not set focus when the focus target does not match the expected target", () => {
    window.location.href =
      "https://local.nypl.org:8080/research/research-catalog/account?focus=myFocusId"
    const persistentFocusSetter = jest.fn()
    const followUpOperation = jest.fn()

    applyFocusAfterRedirect(
      persistentFocusSetter,
      "someOtherId",
      followUpOperation
    )

    expect(persistentFocusSetter).not.toHaveBeenCalled()
    expect(window.history.replaceState).not.toHaveBeenCalled()
    expect(followUpOperation).not.toHaveBeenCalled()
  })

  it("preserves other query params and the hash when cleaning up the focus param", () => {
    window.location.href =
      "https://local.nypl.org:8080/research/research-catalog/account?bon=jour&focus=myFocusId#section"
    const persistentFocusSetter = jest.fn()

    applyFocusAfterRedirect(persistentFocusSetter)

    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      "",
      "/research/research-catalog/account?bon=jour#section"
    )
  })
})

describe("useLogoutRedirect", () => {
  const originalWindowLocation = window.location
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      value: new URL(window.location.href),
    })
  })
  afterEach(() => {
    Object.defineProperty(window, "location", {
      value: originalWindowLocation,
    })
  })

  it("should return the logout link returning user to their current page", () => {
    window.location.href =
      "https://local.nypl.org:8080/research/research-catalog/search/advanced"
    const { result } = renderHook(() => useLogoutRedirect())
    expect(result.current).toBe(
      "https://dev-login.nypl.org/auth/logout?redirect_uri=https%3A%2F%2Flocal%2Enypl%2Eorg%3A8080%2Fresearch%2Fresearch-catalog%2Fsearch%2Fadvanced"
    )
  })

  it("should return the logout link to home if user is on account/hold pages", () => {
    window.location.href =
      "https://local.nypl.org:8080/research/research-catalog/account"
    const { result } = renderHook(() => useLogoutRedirect())
    expect(result.current).toBe(
      "https://dev-login.nypl.org/auth/logout?redirect_uri=https%3A%2F%2Flocal%2Enypl%2Eorg%3A8080%2Fresearch%2Fresearch-catalog"
    )
  })
})
