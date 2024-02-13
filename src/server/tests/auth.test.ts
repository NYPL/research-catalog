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
  it("should return a redirect link based on passed initializePatronTokenAuth request", async () => {
    const patronTokenResponse = await initializePatronTokenAuth(
      reqCookiesWithToken
    )
    console.log(patronTokenResponse)
    // const login = getLoginRedirect(patronTokenResponse)
    // console.log(login)
  })
})

// describe("useLogoutRedirect", () => {
//   let sandbox

//   beforeEach(() => {
//     sandbox = sinon.createSandbox()
//   })

//   afterEach(() => {
//     sandbox.restore()
//   })

//   it("links to the logout url with the current location as the redirect param", () => {
//     // Try a search results page.
//     let currentLocation =
//       "http://localhost:3001/research/research-catalog/search?q=national%20geographic"
//     sandbox.stub(window.location, "href").value(currentLocation)

//     let component = mountLogoutLink({ loggedIn: true })

//     expect(component.find("a").prop("href")).to.equal(
//       `${logoutLink}${currentLocation}`
//     )
//   })

//   it("links to the logout url with the homepage as the redirect param on hold and account pages", () => {
//     const originUrl = "http://localhost:3001"
//     const homepageUrl = `${originUrl}/research/research-catalog/`
//     // Mock the origin property as localhost.
//     sandbox.stub(window.location, "origin").value(originUrl)

//     // Try a hold page.
//     let currentLocation =
//       "http://localhost:3001/research/research-catalog/hold/request/cb7891544-ci7911509"
//     sandbox.stub(window.location, "href").value(currentLocation)

//     let component = mountLogoutLink({ loggedIn: true })

//     expect(component.find("a").prop("href")).to.equal(
//       `${logoutLink}${homepageUrl}`
//     )

//     // Try an account page.
//     currentLocation = "http://localhost:3001/research/research-catalog/account"
//     sandbox.stub(window.location, "href").value(currentLocation)

//     component = mountLogoutLink({ loggedIn: true })

//     expect(component.find("a").prop("href")).to.equal(
//       `${logoutLink}${homepageUrl}`
//     )
//   })
//})
