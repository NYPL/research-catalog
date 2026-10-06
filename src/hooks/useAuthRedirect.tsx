import { useEffect, useState } from "react"
import { appConfig } from "../config/appConfig"
import { encodeURIComponentWithPeriods } from "../utils/appUtils"
import { BASE_URL } from "../config/constants"

/**
 * Provides login endpoint with redirect back to the current page.
 * Can pass parameter to focus on a specific id upon returning
 */
export const useLoginRedirect = (focusId?: string) => {
  const loginEndpoint =
    appConfig.urls?.loginUrl?.[appConfig.environment] ||
    appConfig.apiEndpoints?.loginUrl?.[appConfig.environment]
  const [redirect, setRedirect] = useState(
    `${loginEndpoint}?redirect_uri=${encodeURIComponentWithPeriods(
      `https://www.nypl.org${BASE_URL}`
    )}`
  )
  useEffect(() => {
    if (typeof window === "undefined") return
    const currentUrl = new URL(window.location.href)
    if (focusId) currentUrl.searchParams.set("focus", focusId)
    const encodedRedirect = encodeURIComponentWithPeriods(currentUrl.toString())
    setRedirect(`${loginEndpoint}?redirect_uri=${encodedRedirect}`)
  }, [])
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
    const encodedRedirect = encodeURIComponentWithPeriods(backPath)
    setRedirect(
      `${
        appConfig.apiEndpoints.logoutUrl[appConfig.environment]
      }?redirect_uri=${encodedRedirect}`
    )
  }, [])
  return redirect
}
