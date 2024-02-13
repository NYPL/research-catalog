import type { NextRequest } from "next/server"
import initializePatronTokenAuth, { getLoginRedirect } from "../auth"

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

// Mock the "jose" library that does the JWT verification.
jest.mock("jose", () => ({
  importSPKI: async () => Promise.resolve("testPublicKey"),
  jwtVerify: async () => ({
    payload: mockPatronJwtDecodedObj,
  }),
}))

const reqNoCookies = {
  cookies: {},
} as NextRequest
const reqCookiesWithToken = {
  cookies: {
    nyplIdentityPatron: '{"access_token":123}',
  } as any,
} as NextRequest

describe("initializePatronTokenAuth", () => {
  it("should return the default empty patron object when the nyplIdentityPatron cookie is not set", async () => {
    const patronTokenResponse = await initializePatronTokenAuth(reqNoCookies)

    expect(patronTokenResponse).toEqual({
      isTokenValid: false,
      errorCode: "token undefined",
      decodedPatron: null,
    })
  })

  it("should return the decoded patron object when the nyplIdentityPatron cookie is set", async () => {
    const patronTokenResponse = await initializePatronTokenAuth(
      reqCookiesWithToken
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
