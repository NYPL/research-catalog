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
    // but it facilitates local testing by allowing for timeout windows that are
    // less than a minute
    Math.floor(new Date(expirationTime).getTime() - new Date().getTime()) / 1000
  const seconds = Math.ceil(left) % 60
  let minutes
  if (seconds === 0) {
    // this is to cover the case where minutes ends up at 1.98 and seconds are
    // zero. in this case, we want minutes to be 2 and not 1.
    minutes = Math.ceil(left / 60)
  } else {
    // otherwise, if minutes is 1.2 and seconds is 30, we want minutes to be 1
    minutes = Math.floor(left / 60)
  }
  // seconds are Math.ceil'd, which makes it very unlikely to hit exactly zero
  if (Math.floor(left) === 0) {
    return { minutes: 0, seconds: 0 }
  }
  return { minutes, seconds }
}

export { deleteCookie, setCookieWithExpiration }
