/**
 *
 * Confirm the url is an Aeon Link
 * @param url string | string[]
 * @return A boolean indicating the passed url[s] are valid Aeon links
 *
 * Example URL:
 * - https://specialcollections.nypl.org/aeon/Aeon.dll
 * - https://nypl-aeon-test.aeon.atlas-sys.com
 */
export function isAeonUrl(url) {
  if (!url) return false
  const aeonLinks = [
    "https://specialcollections.nypl.org/aeon/Aeon.dll",
    "https://nypl-aeon-test.aeon.atlas-sys.com",
  ]
  const link = Array.isArray(url) ? url[0] : url
  return Boolean(aeonLinks.some((path) => link.startsWith(path)))
}

export default isAeonUrl
