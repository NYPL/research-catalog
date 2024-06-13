import type { NextRequest } from "next/server"
import initializePatronTokenAuth, {
  buildNewAuthRedirectCookie,
  getLoginRedirect,
  stuckInRedirectLoop,
  useLogoutRedirect,
} from "../auth"
import { renderHook } from "@testing-library/react"

const mockPatronJwtDecodedObj = {
  iss: "",
  sub: "123",
  aud: "",
  iat: 123,
  exp: 123,
  auth_time: 123,
  scope: "openid",
}

const mockReq = {
  protocol: "http",
  url: "/account",
  headers: {
    host: "local.nypl.org:8080",
  },
}

const reqNoCookies = {
  cookies: {},
} as NextRequest
const reqCookiesWithToken = {
  cookies: {
    nyplIdentityPatron: '{"access_token":123}',
  } as any,
} as NextRequest

describe.only("auth redirect loop evasion", () => {
  it("buildNewAuthRedirectCookie increments count by one", () => {
    const nyplAccountRedirectTracker =
      "1expWed, 12 Jun 2024 18:36:19 GMT; expires=Wed, 12 Jun 2024 18:36:19 GMT"
    expect(
      buildNewAuthRedirectCookie(nyplAccountRedirectTracker).split("exp")[0]
    ).toEqual("2")
  })
  describe("stuck in redirect loop", () => {
    it("returns false when no cookie exists", () =>
      expect(stuckInRedirectLoop(null)).toEqual(false))
    it("returns false when count is less than 3", () =>
      expect(
        stuckInRedirectLoop("1; expires=Wed, 12 Jun 2024 18:36:19 GMT")
      ).toEqual(false))
    it("returns true when count is 3", () =>
      expect(
        stuckInRedirectLoop("3; expires=Wed, 12 Jun 2024 18:36:19 GMT")
      ).toEqual(true))
  })
})

describe("initializePatronTokenAuth", () => {
  it("should return the default empty patron object when the nyplIdentityPatron cookie is not set", async () => {
    const patronTokenResponse = await initializePatronTokenAuth(
      reqNoCookies.cookies
    )

    expect(patronTokenResponse).toEqual({
      isTokenValid: false,
      errorCode: "token undefined",
      decodedPatron: null,
    })
  })

  it("should return the decoded patron object when the nyplIdentityPatron cookie is set", async () => {
    const patronTokenResponse = await initializePatronTokenAuth(
      reqCookiesWithToken.cookies
    )

    expect(patronTokenResponse).toEqual({
      isTokenValid: true,
      errorCode: null,
      decodedPatron: mockPatronJwtDecodedObj,
    })
  })
})

describe("getLoginRedirect", () => {
  it("should return a redirect link based on the request", async () => {
    const login = getLoginRedirect(mockReq)
    expect(login).toStrictEqual(
      "https://dev-login.nypl.org/auth/login?redirect_uri=http%3A%2F%2Flocal.nypl.org%3A8080%2Fresearch%2Fresearch-catalog%2Faccount"
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
      "https://dev-login.nypl.org/auth/logout?redirect_uri=https://local.nypl.org:8080/research/research-catalog/search/advanced"
    )
  })

  it("should return the logout link to home if user is on account/hold pages", () => {
    window.location.href =
      "https://local.nypl.org:8080/research/research-catalog/account"
    const { result } = renderHook(() => useLogoutRedirect())
    expect(result.current).toBe(
      "https://dev-login.nypl.org/auth/logout?redirect_uri=https://local.nypl.org:8080/research/research-catalog"
    )
  })
})
