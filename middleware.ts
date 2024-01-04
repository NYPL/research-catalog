// write middleware file for nextjs
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import initializePatronTokenAuth from "./src/server/auth"

/**
 * Middleware to check and parse the nyplIdentiyPatron cookie and then verify
 * it through JWT. The decoded patron information is then set in Nextjs'
 * request headers.
 */
export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const patronTokenResponse = await initializePatronTokenAuth(request)

  requestHeaders.set("x-is-token-valid", `${patronTokenResponse?.isTokenValid}`)
  requestHeaders.set("x-user-id", `${patronTokenResponse?.decodedPatron?.sub}`)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  return response
}

// EG: This is a bit annoying but the catch-all regex did not work for me.
// We might have to manually include all routes individually.
export const config = {
  matcher: ["/", "/search/:path*"],
}
