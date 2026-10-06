import { useEffect, useState } from "react"
import { appConfig } from "../config/appConfig"
import { encodeURIComponentWithPeriods } from "../utils/appUtils"
import { BASE_URL } from "../config/constants"

/**
 * Provides login endpoint with redirect back to the current page.
 * Can pass parameter to focus on a specific id upon returning
 */
export const useLoginRedirect = (focusId?: string) => {
  const [redirect, setRedirect] = useState(`https://www.nypl.org${BASE_URL}`)
  useEffect(() => {
    const loginEndpoint =
      appConfig.urls?.loginUrl?.[appConfig.environment] ||
      appConfig.apiEndpoints?.loginUrl?.[appConfig.environment]
    if (typeof window === "undefined") return loginEndpoint

    const currentUrl = new URL(window.location.href)
    if (focusId) currentUrl.searchParams.set("focus", focusId)
    const encodedRedirect = encodeURIComponentWithPeriods(currentUrl.toString())
    setRedirect(`${loginEndpoint}?redirect_uri=${encodedRedirect}`)
  }, [])
  return redirect
}

/**
 * After redirecting back to RC, sets the focus to the element with the id
 * found in the original redirect URL param (must match expectedFocusTarget if
 * provided). If focus applied, also executes follow-up operation if provided.
 * This is a layer on top of setPersistentFocus from FocusContext - takes in the
 * setPersistentFocus function defined from hook in calling component
 */
export const applyFocusAfterRedirect = (
  persistentFocusSetter,
  expectedFocusTarget?,
  followUpOperation?
) => {
  const params = new URLSearchParams(window.location.search)
  const focusTarget = params.get("focus")

  if (!focusTarget) return

  if (!expectedFocusTarget || focusTarget === expectedFocusTarget) {
    persistentFocusSetter(expectedFocusTarget ?? focusTarget)
    // Clean up the URL
    params.delete("focus")
    const newUrl =
      window.location.pathname +
      (params.toString() ? `?${params.toString()}` : "") +
      window.location.hash

    window.history.replaceState({}, "", newUrl)
    followUpOperation && followUpOperation()
  }
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
