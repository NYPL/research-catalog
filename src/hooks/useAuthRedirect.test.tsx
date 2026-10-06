import { renderHook } from "@testing-library/react"
import { useLoginRedirect, useLogoutRedirect } from "./useAuthRedirect"

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
