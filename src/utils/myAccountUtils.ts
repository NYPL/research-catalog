import type { Patron, SierraPatron } from "../types/myAccountTypes"

export const incrementTime = (minutes, seconds = 0) => {
  const now = new Date()
  now.setTime(now.getTime() + minutes * 60 * 1000 + seconds * 1000)
  return now.toUTCString()
}

export const notificationPreferenceMap = {
  z: "Email",
  p: "Phone",
}

export const notificationPreferenceTuples = Object.keys(
  notificationPreferenceMap
).reduce((tuples, key) => {
  tuples.push([key, notificationPreferenceMap[key]])
  return tuples
}, [])

/**
 * Formats the patron's name per NYPL guidelines.
 */
function formatPatronName(name = "") {
  if (!name) return ""

  const [lastName, firstName] = name.split(",")
  // The name from Sierra is in all caps, so we need to lowercase
  // all but the first letter.
  function capitalize(name: string) {
    return `${name.charAt(0)}${name.slice(1).toLowerCase()}`
  }
  return `${capitalize(firstName.trim())} ${capitalize(lastName.trim())}`
}

/**
 * getDueDate
 * Returns date in readable string ("Month day, year")
 */
export function formatDate(date: string | number | Date) {
  if (!date) return null
  // pickup location returns an iso string, but expiration date is YYYY-MM-DD.
  // we need to specify timezone to avoid off by one error.
  // perhaps this method needs to be two methods for the specific cases.
  const d = new Date(date)
  console.log(d)
  const year = d.getFullYear()
  const day = d.getUTCDate()
  const month = d.toLocaleString("default", { month: "long" })
  return `${month} ${day}, ${year}`
}

// this method has to live here so it can be imported into the front end without
// importing the MyAccount files.
export const buildPatron = (patron: SierraPatron): Patron => {
  const notificationPreference = patron.fixedFields?.["268"].value
  return {
    notificationPreference,
    name: formatPatronName(patron.names?.[0]),
    barcode: patron.barcodes?.[0],
    formattedBarcode: patron.barcodes?.[0].replace(
      /(\d{1})(\d{4})(\d{5})(\d{4})/,
      "$1 $2 $3 $4"
    ),
    expirationDate: formatDate(patron.expirationDate),
    emails: patron.emails || [],
    phones: patron.phones || [],
    homeLibrary: patron.homeLibrary || null,
    id: patron.id,
  }
}
