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
 * Used to create redirect from initializePatronTokenAuth() response, returns the redirect url.
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
      `https://dev-login.nypl.org/auth/login?redirect_uri=${fullUrl}`
    console.log(redirect)
    return redirect
  }
}
