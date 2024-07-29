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
    // Math.floor isn't really necessary for this to work in the wild,
    // but it facilitates local testing by allowing for timeout windows that are less than a minute
    Math.floor(new Date(expirationTime).getTime() - new Date().getTime()) / 1000
  const minutes = Math.floor(left / 60)
  const seconds = Math.ceil(left) % 60
  // edge case of 1 minute left
  if (left > 0 && minutes === 0 && seconds === 0) {
    return { minutes: 1, seconds: 0 }
  }
  // seconds have to be Math.ceil'd, which makes it very unlikely to actually hit zero
  if (Math.floor(left) === 0) {
    return { minutes: 0, seconds: 0 }
  }
  return { minutes, seconds }
}

export { deleteCookie, setCookieWithExpiration }
