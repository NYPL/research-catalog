const includeDomain = process.env.NODE_ENV !== "test"

export const getTimeLeft = (expTime) => {
  return (new Date(expTime).getTime() - new Date().getTime()) / 1000
}

const setCookieWithExpiration = (
  cookieName: string,
  expiration: string,
  value = ""
) => {
  document.cookie =
    `${cookieName}=${value}; expires=${expiration || Date.now()}; ` +
    (includeDomain ? "path=/; domain=.nypl.org;" : "")
}

export const getIncrementedTime = (minutes, seconds = 0) => {
  const now = new Date()
  now.setTime(now.getTime() + minutes * 60 * 1000 + seconds * 1000)
  return now.toUTCString()
}

const deleteCookie = (cookieName: string) =>
  setCookieWithExpiration(cookieName, null)

export const buildTimeLeft = (expirationTime) => {
  const left =
    (new Date(expirationTime).getTime() - new Date().getTime()) / 1000
  const minutes = Math.ceil(left / 60)
  const seconds = Math.ceil(left) % 60
  return { minutes, seconds }
}

export { deleteCookie, setCookieWithExpiration }
