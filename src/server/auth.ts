/* eslint-disable @typescript-eslint/naming-convention */
// import type { JWTPayload } from "jose"
import { importSPKI, jwtVerify, type JWTPayload } from "jose"
import { appConfig } from "../config/config"
import { BASE_URL } from "../config/constants"
import { useEffect, useState } from "react"
import { encodeURIComponentWithPeriods } from "../utils/appUtils"

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
      // Otherwise, log the error
      if (error.code !== "ERR_JWT_EXPIRED") {
        console.error(error)
      }
      patronTokenResponse.errorCode = error.message
      patronTokenResponse.isTokenValid = false
    }
  }

  return patronTokenResponse
}

export const doRedirectBasedOnNyplAccountRedirects = (count: number) => {
  if (!count) return true
  if (count >= 3) return false
  else return true
}

/**
 * Creates and returns redirect url. Call this function only with an un-authenticated patron,
 * i.e., patronTokenResponse.isTokenValid must be false.
 * Due to redirect shenanigans, this method is somewhat hardcoded to return
 * /account. The req url coming from my account redirects sometimes is a
 * server url from the NextJS json API. We don't want NOTHING to do with that.
 */
export function getLoginRedirect(req, defaultPath?: string) {
  const protocol = appConfig.environment === "production" ? "https" : "http"
  const hostname = appConfig.apiEndpoints.domain[appConfig.environment]
  const path = req.url?.includes("_next") ? defaultPath : req.url
  const originalUrl = BASE_URL + path
  const fullUrl = encodeURIComponentWithPeriods(
    `${protocol}://${hostname}${originalUrl}`
  )
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
