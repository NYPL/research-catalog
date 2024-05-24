import type { Patron, SierraPatron } from "../types/myAccountTypes"

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
// this method has to live here so it can be imported into the front end without
// importing the MyAccount files.
export const buildPatron = (patron: SierraPatron): Patron => {
  const notificationPreference =
    notificationPreferenceMap[patron.fixedFields?.["268"].value]
  return {
    notificationPreference,
    name: patron.names?.[0],
    barcode: patron.barcodes?.[0],
    expirationDate: patron.expirationDate,
    emails: patron.emails || [],
    phones: patron.phones || [],
    homeLibraryCode: patron.homeLibraryCode || null,
    id: patron.id,
  }
}
