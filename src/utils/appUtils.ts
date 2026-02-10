import type { BrowseType } from "../types/browseTypes"

/**
 * getPaginationOffsetStrings
 * Used to generate start and end counts for pagination on Search Results and above the
 * item table in the Bib page
 */
export function getPaginationOffsetStrings(
  page = 1,
  total: number,
  pageLimit: number
): [string, string] {
  const offset = pageLimit * page - pageLimit
  const start = offset + 1
  let end = offset + pageLimit
  end = end >= total ? total : end

  return [start.toLocaleString(), end.toLocaleString()]
}

/**
 * encodeHTML
 * Return a version of the string sanitized to protect against XSS.
 */
export const encodeHTML = (str: string) =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;")

/**
 * encodeURIComponentWithPeriods
 * Return a URI-encoded string that also encodes periods
 */
export const encodeURIComponentWithPeriods = (str: string) => {
  return encodeURIComponent(str).replace(/\./g, "%2E")
}

/**
 * convertToSentenceCase
 * Return a sentence-cased version of the string if it's more than 2 words (to avoid sentence-casing acronyms).
 */
export const convertToSentenceCase = (str: string) =>
  str.split(" ").length > 1
    ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    : str

/**
 * Converts camel case string to shish kabob case
 *
 * e.g. camelToShishKabobCase("RecapPul")
 *        => "recap-pul"
 *      camelToShishKabobCase("firstCharCanBeLowerCase")
 *        => "first-char-can-be-lower-case"
 */
export const convertCamelToShishKabobCase = (str: string) =>
  str
    // Change capital letters into "-{lowercase letter}"
    .replace(/([A-Z])/g, (capitalLetter, placeholderVar, index) => {
      // If capital letter is not first character, precede with '-':
      return (index > 0 ? "-" : "") + capitalLetter.toLowerCase()
    })

/**
 * Attempts to instantiate an object using the provided constructor and arguments.
 * If instantiation fails without a flag to ignore failure, throws an error with the given message.
 * Otherwise, returns null.
 */
export function tryInstantiate<T>({
  constructor,
  args = [],
  ignoreError = false,
  errorMessage = "Failed to instantiate",
}: {
  constructor: new (...args: any[]) => T
  args?: any[]
  ignoreError?: boolean
  errorMessage?: string
}): T | null {
  try {
    return new constructor(...args)
  } catch {
    if (ignoreError === false) {
      throw new Error(errorMessage)
    }
    return null
  }
}

export function getBrowseTypeFromUrl(query): BrowseType {
  return query?.browseType && query?.browseType[0] === "authors"
    ? "contributors"
    : "subjects"
}
