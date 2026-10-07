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
  it("should return a redirect link containing defaultPath if req has a server url /account", async () => {
    const login = getLoginRedirect(
      {
        ...mockReq,
        url: "/_next/data/developement/account.json",
      },
      "/account"
    )
    expect(login).toStrictEqual(
      "https://dev-login.nypl.org/auth/login?redirect_uri=http%3A%2F%2Flocal%2Enypl%2Eorg%3A8080%2Fresearch%2Fresearch-catalog%2Faccount"
    )
  })
  it("should return a redirect link based on the request", async () => {
    const login = getLoginRedirect({ ...mockReq, url: "/browse" })
    expect(login).toStrictEqual(
      "https://dev-login.nypl.org/auth/login?redirect_uri=http%3A%2F%2Flocal%2Enypl%2Eorg%3A8080%2Fresearch%2Fresearch-catalog%2Fbrowse"
    )
  })
})
