import type { NextRequest } from "next/server"
import initializePatronTokenAuth from "../auth"

const mockPatronJwtDecodedObj = {
  iss: "",
  sub: "123",
  aud: "",
  iat: 123,
  exp: 123,
  auth_time: 123,
  scope: "openid",
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

describe("log in and log out ", () => {
  //TODO
})
