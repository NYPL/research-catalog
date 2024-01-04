/* eslint-disable @typescript-eslint/naming-convention */
import type { JWTPayload } from "jose"
import { importSPKI, jwtVerify } from "jose"
import type { NextRequest } from "next/server"

import { appConfig } from "../config/config"

interface UserJwtPayload extends JWTPayload {
  iss: string
  sub: string
  aud: string
  iat: number
  exp: number
  auth_time: number
  scope: string
}

export default async function initializePatronTokenAuth(req: NextRequest) {
  const nyplIdentityPatron = req.cookies.get("nyplIdentityPatron")

  const nyplIdentityCookieObject = nyplIdentityPatron
    ? JSON.parse(nyplIdentityPatron.value)
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
      const publicKey = await importSPKI(appConfig.publicKey, algorithm)
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
