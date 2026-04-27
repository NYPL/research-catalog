import type { Patron, SierraPatron } from "../types/myAccountTypes"

export const notificationPreferenceMap = {
  z: "Email",
  p: "Phone",
  "-": "None",
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
export function formatPatronName(name = "") {
  if (!name) return ""
  if (!name.includes(",")) return name
  const [lastName, firstName] = name.split(",")
  // The name from Sierra is in all caps, so we need to lowercase
  // all but the first letter.
  function capitalize(name: string) {
    return `${name.charAt(0)}${name.slice(1).toLowerCase()}`
  }
  const splitAndCapitalize = (nameSegment) =>
    nameSegment.split(" ").map(capitalize).join(" ")
  return `${
    firstName && splitAndCapitalize(firstName.trim())
  } ${splitAndCapitalize(lastName.trim())}`
}

/**
 * getDueDate
 * Returns date in readable string ("Month day, year")
 */
export function formatDate(date: string | number | Date) {
  if (!date) return null
  // Pickup location returns an ISO string, but expiration date is YYYY-MM-DD.
  // If the date is a string without a time component (e.g., "YYYY-MM-DD"),
  // treat it as UTC to avoid timezone shifting.
  const d = new Date(date)
  const isDateOnly = typeof date === "string" && !date.includes("T")
  const year = isDateOnly ? d.getUTCFullYear() : d.getFullYear()
  const day = isDateOnly ? d.getUTCDate() : d.getDate()
  const month = d.toLocaleString("default", {
    month: "long",
    timeZone: isDateOnly ? "UTC" : undefined,
  })

  return `${month} ${day}, ${year}`
}

// this method has to live here so it can be imported into the front end without
// importing the MyAccount files.
export const buildPatron = (patron: SierraPatron): Patron => {
  const notificationPreference = patron.fixedFields?.["268"].value
  const username = patron.varFields?.find(
    (field) => field.fieldTag === "u" && field.content.length
  )?.content
  const processedPatron = {
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
  } as Patron
  if (username) processedPatron.username = username
  return processedPatron
}
