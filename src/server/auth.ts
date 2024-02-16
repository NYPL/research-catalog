/* eslint-disable @typescript-eslint/naming-convention */
// import type { JWTPayload } from "jose"
import { importSPKI, jwtVerify, type JWTPayload } from "jose"
import type { NextRequest } from "next/server"
import { appConfig } from "../config/config"
import { BASE_URL } from "../config/constants"
import { useEffect, useState } from "react"

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
 * Creates and returns redirect url. Call this function only with an un-authenticated patron,
 * i.e., patronTokenResponse.isTokenValid must be false.
 */
export function getLoginRedirect(req) {
  const protocol = req.protocol || "http"
  const hostname = req.headers["host"]
  const originalUrl = BASE_URL + req.url
  const fullUrl = encodeURIComponent(`${protocol}://${hostname}${originalUrl}`)
  const redirect = `${appConfig.urls.loginUrl}?redirect_uri=${fullUrl}`
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
    setRedirect(`${appConfig.urls.logoutUrl}?redirect_uri=${backPath}`)
  }, [])
  return redirect
}
