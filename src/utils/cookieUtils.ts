const includeDomain = process.env.NODE_ENV !== "test"

export const getTimeLeft = (expTime) => {
  console.log(expTime)
  return (new Date(expTime).getTime() - new Date().getTime()) / 1000
}
/**
 * setCookieWithMaxAge(sKey, expiration, value)
 * set a cookie
 * @param {string} sKey - The name of the cookie
 * @param {string} expiration - when to expire the cookie. Defaults to immediately expire
 * @param {string} value - The value of the cookie, defaults to an empty string
 */

const setCookieWithExpiration = (sKey, expiration, value = "") => {
  document.cookie =
    `${sKey}=${value}; expires=${expiration || Date.now()}; ` +
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
const deleteCookie = (sKey) => setCookieWithExpiration(sKey, null)

export const buildTimeLeft = (expirationTime) => {
  const left =
    (new Date(expirationTime).getTime() - new Date().getTime()) / 1000
  const minutes = Math.ceil(left / 60)
  const seconds = Math.ceil(left) % 60
  return { minutes, seconds }
}

export { deleteCookie, setCookieWithExpiration }
