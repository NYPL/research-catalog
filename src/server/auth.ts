/* eslint-disable @typescript-eslint/naming-convention */
// import type { JWTPayload } from "jose"
import { importSPKI, jwtVerify, type JWTPayload } from "jose"
import { appConfig } from "../config/config"
import { BASE_URL } from "../config/constants"
import { useEffect, useState } from "react"
import { incrementTime } from "../../src/utils/myAccountUtils"

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
 * Used in Nextjs middleware to check and parse the nyplIdentityPatron cookie
 * and then verify it through JWT. The decoded patron information is returned.
 */
export default async function initializePatronTokenAuth(reqCookies: unknown) {
  type cookie = typeof reqCookies & { nyplIdentityPatron?: string }

  const nyplIdentityPatron = (reqCookies as cookie)?.nyplIdentityPatron
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
      patronTokenResponse.decodedPatron = verified.payload as UserJwtPayload
      patronTokenResponse.errorCode = null
    } catch (error) {
      // Most likely the token is expired and it needs to be refreshed
      console.log("error", error)
      patronTokenResponse.errorCode = error.message
      patronTokenResponse.isTokenValid = false
    }
  }

  return patronTokenResponse
}

const parseNyplAccountRedirects = (nyplAccountRedirects: string) => {
  const currentValue = nyplAccountRedirects.split("exp")
  const count = parseInt(currentValue[0], 10)
  const expiration = currentValue[1]
  return { count, expiration }
}

export const stuckInRedirectLoop = (nyplAccountRedirects: string) => {
  if (!nyplAccountRedirects) return false
  const { count } = parseNyplAccountRedirects(nyplAccountRedirects)
  if (count < 3) return false
  if (count >= 3) return true
}

export const buildNewAuthRedirectCookie = (nyplAccountRedirects: string) => {
  if (!nyplAccountRedirects) {
    const expiration = incrementTime(0, 10)
    return `1; expires=${expiration}`
  } else {
    const { count, expiration } =
      parseNyplAccountRedirects(nyplAccountRedirects)
    return `${count + 1}; expires=${expiration}`
  }
}

/**
 * Creates and returns redirect url. Call this function only with an un-authenticated patron,
 * i.e., patronTokenResponse.isTokenValid must be false.
 */
export function getLoginRedirect(req) {
  const protocol = req.protocol || "http"
  const hostname = appConfig.apiEndpoints.domain[appConfig.environment]
  const originalUrl = BASE_URL + req.url
  const fullUrl = encodeURIComponent(`${protocol}://${hostname}${originalUrl}`)
  const redirect = `${
    appConfig.apiEndpoints.loginUrl[appConfig.environment]
  }?redirect_uri=${fullUrl}`
  return redirect
}

/**
 * Creates redirect to log out user, then return user to their current page.
 */
export const useLogoutRedirect = () => {
  // Will send user back to prod if user has noscript or javascript disabled
  // (useEffect won't work).
  const [redirect, setRedirect] = useState(`https://www.nypl.org${BASE_URL}`)
  useEffect(() => {
    const current = window.location.pathname
    let backPath = window.location.href
    // If the patron is on any hold or account page, then
    // redirect them to the home page after logging out. Otherwise,
    // send them back to the page they were on.
    if (current.includes("hold") || current.includes("account")) {
      backPath = window.location.origin + BASE_URL
    }
    setRedirect(
      `${
        appConfig.apiEndpoints.logoutUrl[appConfig.environment]
      }?redirect_uri=${backPath}`
    )
  }, [])
  return redirect
}
