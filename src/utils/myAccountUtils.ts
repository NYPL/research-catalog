import type { Patron, SierraPatron } from "../types/myAccountTypes"

export const incrementTime = (minutes, seconds = 0) => {
  const now = new Date()
  now.setTime(now.getTime() + minutes * 60 * 1000 + seconds * 1000)
  return now.toUTCString()
}

export const filteredPickupLocations = [
  {
    code: "ft   ",
    name: "53rd Street",
  },
  {
    code: "fe   ",
    name: "58th Street",
  },
  {
    code: "ss   ",
    name: "67th Street",
  },
  {
    code: "ns   ",
    name: "96th Street (CLOSING 7/11)",
  },
  {
    code: "ag   ",
    name: "Aguilar",
  },
  {
    code: "al   ",
    name: "Allerton",
  },
  {
    code: "lb   ",
    name: "Andrew Heiskell",
  },
  {
    code: "bt   ",
    name: "Battery Park",
  },
  {
    code: "ba   ",
    name: "Baychester",
  },
  {
    code: "be   ",
    name: "Belmont",
  },
  {
    code: "bc   ",
    name: "Bronx Library Center",
  },
  {
    code: "cn   ",
    name: "Charleston",
  },
  {
    code: "ch   ",
    name: "Chatham Square",
  },
  {
    code: "ci   ",
    name: "City Island",
  },
  {
    code: "cp   ",
    name: "Clasons Point",
  },
  {
    code: "cs   ",
    name: "Columbus",
  },
  {
    code: "ht   ",
    name: "Countee Cullen",
  },
  {
    code: "dh   ",
    name: "Dongan Hills",
  },
  {
    code: "ea   ",
    name: "Eastchester",
  },
  {
    code: "ew   ",
    name: "Edenwald",
  },
  {
    code: "ep   ",
    name: "Epiphany",
  },
  {
    code: "fx   ",
    name: "Francis Martin",
  },
  {
    code: "gc   ",
    name: "Grand Central",
  },
  {
    code: "gd   ",
    name: "Grand Concourse",
  },
  {
    code: "gk   ",
    name: "Great Kills",
  },
  {
    code: "hg   ",
    name: "Hamilton Grange",
  },
  {
    code: "hl   ",
    name: "Harlem",
  },
  {
    code: "hu   ",
    name: "Harry Belafonte - 115th Street",
  },
  {
    code: "hb   ",
    name: "High Bridge",
  },
  {
    code: "hp   ",
    name: "Hudson Park",
  },
  {
    code: "hk   ",
    name: "Huguenot Park",
  },
  {
    code: "in   ",
    name: "Inwood",
  },
  {
    code: "jp   ",
    name: "Jerome Park",
  },
  {
    code: "kb   ",
    name: "Kingsbridge",
  },
  {
    code: "kp   ",
    name: "Kips Bay",
  },
  {
    code: "my   ",
    name: "LPA - Circulating",
  },
  {
    code: "myarv",
    name: "LPA Reserve Film and Video",
  },
  {
    code: "mb   ",
    name: "Macombs Bridge",
  },
  {
    code: "mn   ",
    name: "Mariners Harbor",
  },
  {
    code: "cl   ",
    name: "Morningside Heights",
  },
  {
    code: "mp   ",
    name: "Morris Park",
  },
  {
    code: "mr   ",
    name: "Morrisania",
  },
  {
    code: "mo   ",
    name: "Mosholu",
  },
  {
    code: "mh   ",
    name: "Mott Haven",
  },
  {
    code: "ml   ",
    name: "Mulberry Street",
  },
  {
    code: "lm   ",
    name: "New Amsterdam",
  },
  {
    code: "nd   ",
    name: "New Dorp",
  },
  {
    code: "ot   ",
    name: "Ottendorfer",
  },
  {
    code: "pk   ",
    name: "Parkchester",
  },
  {
    code: "pm   ",
    name: "Pelham Bay",
  },
  {
    code: "vn   ",
    name: "Pelham Parkway-Van Nest",
  },
  {
    code: "rt   ",
    name: "Richmondtown",
  },
  {
    code: "rd   ",
    name: "Riverdale",
  },
  {
    code: "rs   ",
    name: "Riverside",
  },
  {
    code: "ri   ",
    name: "Roosevelt Island",
  },
  {
    code: "sa   ",
    name: "Saint Agnes",
  },
  {
    code: "sd   ",
    name: "Sedgwick",
  },
  {
    code: "sn   ",
    name: "SNFL (formerly Mid-Manhattan)",
  },
  {
    code: "se   ",
    name: "Seward Park",
  },
  {
    code: "sv   ",
    name: "Soundview",
  },
  {
    code: "sb   ",
    name: "South Beach",
  },
  {
    code: "dy   ",
    name: "Spuyten Duyvil",
  },
  {
    code: "st   ",
    name: "Stapleton",
  },
  {
    code: "tg   ",
    name: "Throgs Neck",
  },
  {
    code: "th   ",
    name: "Todt Hill",
  },
  {
    code: "ts   ",
    name: "Tompkins Square",
  },
  {
    code: "tv   ",
    name: "Tottenville",
  },
  {
    code: "tm   ",
    name: "Tremont",
  },
  {
    code: "vc   ",
    name: "Van Cortlandt",
  },
  {
    code: "wk   ",
    name: "Wakefield",
  },
  {
    code: "wh   ",
    name: "Washington Heights",
  },
  {
    code: "wb   ",
    name: "Webster",
  },
  {
    code: "wf   ",
    name: "West Farms",
  },
  {
    code: "nb   ",
    name: "West New Brighton",
  },
  {
    code: "wt   ",
    name: "Westchester Square",
  },
  {
    code: "wl   ",
    name: "Woodlawn Heights",
  },
  {
    code: "wo   ",
    name: "Woodstock",
  },
  {
    code: "yv   ",
    name: "Yorkville",
  },
]

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
  if (typeof date === "string" && !date.includes("Z")) date += " GMT-0400"
  const d = new Date(date)
  const year = d.getFullYear()
  const day = d.getDate()
  const month = d.toLocaleString("default", { month: "long" })
  return `${month} ${day}, ${year}`
}

// this method has to live here so it can be imported into the front end without
// importing the MyAccount files.
export const buildPatron = (patron: SierraPatron): Patron => {
  const notificationPreference =
    notificationPreferenceMap[patron.fixedFields?.["268"].value]
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
