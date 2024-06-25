const includeDomain = process.env.NODE_ENV !== "test"
/**
 * setCookieWithMaxAge(sKey, expiration, value)
 * set a cookie
 * @param {string} sKey - The name of the cookie
 * @param {string} expiration - when to expire the cookie. Defaults to immediately expire
 * @param {string} value - The value of the cookie, defaults to an empty string
 */

const setCookieWithMaxAge = (sKey, maxAge, value = "") => {
  document.cookie =
    `${sKey}=${value}; Max-Age=${maxAge || 0}; ` +
    (includeDomain ? "path=/; domain=.nypl.org;" : "")
}

export const incrementTime = (minutes, seconds = 0) => {
  const now = new Date()
  now.setTime(now.getTime() + minutes * 60 * 1000 + seconds * 1000)
  return now.toUTCString()
}

/**
 * deleteCookie(sKey)
 * Delete the cookie by having it expired.
 *
 * @param {string} sKey - The name of the cookie to be looked up.
 */
const deleteCookie = (sKey) => setCookieWithMaxAge(sKey, null)

export { deleteCookie, setCookieWithMaxAge }
