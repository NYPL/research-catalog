import { useEffect, useState } from "react"
import { appConfig } from "../config/appConfig"
import { encodeURIComponentWithPeriods } from "../utils/appUtils"
import { BASE_URL } from "../config/constants"

const protocol = appConfig.environment === "production" ? "https" : "http"
const hostname = appConfig.apiEndpoints.domain[appConfig.environment]
const encodedBaseRedirect = encodeURIComponentWithPeriods(
  `${protocol}://${hostname}${BASE_URL}`
)

/**
 * Provides login endpoint with redirect back to the current page.
 * If user has noscript or javascript disabled, will send user back to base URL
 * (useEffect won't work).
 * Can pass parameter to focus on a specific id upon returning
 */
export const useLoginRedirect = (focusId?: string) => {
  const loginEndpoint = appConfig.apiEndpoints.loginUrl[appConfig.environment]
  const [redirect, setRedirect] = useState(
    `${loginEndpoint}?redirect_uri=${encodedBaseRedirect}`
  )
  useEffect(() => {
    const currentUrl = new URL(window.location.href)
    if (focusId) currentUrl.searchParams.set("focus", focusId)
    const encodedRedirect = encodeURIComponentWithPeriods(currentUrl.toString())
    setRedirect(`${loginEndpoint}?redirect_uri=${encodedRedirect}`)
  }, [])
  return redirect
}

/**
 * Creates redirect to log out user, then return user to their current page.
 * If user has noscript or javascript disabled, will send user back to base URL
 * (useEffect won't work).
 */
export const useLogoutRedirect = () => {
  const logoutEndpoint = appConfig.apiEndpoints.logoutUrl[appConfig.environment]
  const [redirect, setRedirect] = useState(
    `${logoutEndpoint}?redirect_uri=${encodedBaseRedirect}`
  )
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
    setRedirect(`${logoutEndpoint}?redirect_uri=${encodedRedirect}`)
  }, [])
  return redirect
}
