import { NextResponse } from "next/server"
import { BASE_URL } from "./src/config/constants"
import { getBrowseDestination } from "./src/utils/redirectUtils"

export function middleware(req) {
  const dest = getBrowseDestination(req.nextUrl)
  const redirectUrl = new URL(BASE_URL + dest, req.url)
  return NextResponse.redirect(redirectUrl)
}

// Only matching on SHEP URLs
export const config = {
  matcher: ["/subject_headings/:path*", "/subject_headings"],
}
