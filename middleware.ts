// write middleware file for nextjs
import { NextResponse, type NextRequest } from "next/server"
import initializePatronTokenAuth from "./src/server/auth"

interface CustomNextRequest extends NextRequest {
  userId: string
  isTokenValid: boolean
}
export type CustomNextHandler = (req: CustomNextRequest) => void

/**
 * Middleware to check and parse the nyplIdentiyPatron cookie and then verify
 * it through JWT. The decoded patron information is then set in Nextjs'
 * request headers.
 */
const middleware: CustomNextHandler = async (request: NextRequest) => {
  //   const requestHeaders = new Headers(request.headers)
  //   const patronTokenResponse = await initializePatronTokenAuth(request)

  //   requestHeaders.set("x-is-token-valid", `${patronTokenResponse?.isTokenValid}`)
  //   requestHeaders.set("x-user-id", `${patronTokenResponse?.decodedPatron?.sub}`)

  const response = NextResponse.next()

  // const response = NextResponse.next({
  //   isTokenValid: patronTokenResponse?.isTokenValid,
  //   userId: patronTokenResponse?.decodedPatron?.sub,
  // } as any)
  console.log("response")
  return response
}

export default middleware

// EG: This is a bit annoying but the catch-all regex did not work for me.
// We might have to manually include all routes individually.
export const config = {
  matcher: ["/", "/search/:path*"],
}
