/* eslint-disable @typescript-eslint/naming-convention */
// import type { JWTPayload } from "jose"
import { importSPKI, jwtVerify, type JWTPayload } from "jose"
import type { NextRequest } from "next/server"

import { appConfig } from "../config/config"
import { BASE_URL } from "../config/constants"
import { useRouter } from "next/router"

interface UserJwtPayload extends JWTPayload {
  iss: string
  sub: string
  aud: string
  iat: number
  exp: number
  auth_time: number
  scope: string
}

/**
 * Used in Nextjs middleware to check and parse the nyplIdentiyPatron cookie
 * and then verify it through JWT. The decoded patron information is returned.
 */
export default async function initializePatronTokenAuth(req: NextRequest) {
  type cookie = typeof req.cookies & { nyplIdentityPatron?: string }

  const nyplIdentityPatron = (req.cookies as cookie)?.nyplIdentityPatron
  const nyplIdentityCookieObject = nyplIdentityPatron
    ? JSON.parse(nyplIdentityPatron)
    : {}
  const patronTokenResponse = {
    isTokenValid: false,
    // Token is undefined from the cookie
    errorCode: "token undefined",
    decodedPatron: null,
  }

  if (nyplIdentityCookieObject.access_token) {
    try {
      const algorithm = "RS256"
      const publicKey = await importSPKI(appConfig.jwtPublicKey, algorithm)
      const verified = await jwtVerify(
        nyplIdentityCookieObject.access_token,
        publicKey
      )
      patronTokenResponse.isTokenValid = true
      patronTokenResponse.errorCode = null
      patronTokenResponse.decodedPatron = verified.payload as UserJwtPayload
    } catch (error) {
      // Most likely the token is expired and it needs to be refreshed
      console.log("error", error)
      patronTokenResponse.errorCode = error.message
    }
  }

  return patronTokenResponse
}

/**
 * Creates and returns redirect url from initializePatronTokenAuth() response
 */
export function getLoginRedirect(req) {
  if (
    !req.patronTokenResponse ||
    !req.patronTokenResponse.isTokenValid ||
    !req.patronTokenResponse.decodedPatron ||
    !req.patronTokenResponse.decodedPatron.sub
  ) {
    const protocol = "http"
    const hostname = req.headers["host"]
    const originalUrl = BASE_URL + req.url
    const fullUrl = encodeURIComponent(
      `${protocol}://${hostname}${originalUrl}`
    )
    const redirect =
      //`${appConfig.externalUrls.login}?redirect_uri=${fullUrl}`
      `${process.env.LOGIN_BASE_URL}/login?redirect_uri=${fullUrl}`
    console.log(redirect)
    return redirect
  }
}

/**
 * Creates redirect to log out user, then return user to their current page. Requires an instance of useRouter.
 */

export function getLogoutRedirect(router) {
  const current = router.pathname
  let backPath = current
  // If the patron is on any hold or account page, then
  // redirect them to the home page after logging out.
  if (current.includes("hold") || current.includes("account")) {
    backPath = "/"
  }
  return `${appConfig.externalUrls.logoutUrl}?redirect_uri=http://local.nypl.org:8080/research/research-catalog${backPath}`
  // TODO: The home url needs to be an env variable fs
}
