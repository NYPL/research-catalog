/**
 * mapLocations
 * Takes a semicolon-separated list of locations set in an ENV variable and maps them to an array.
 */
export const mapLocations = (locations) =>
  (locations ? locations.split(";") : []).map((location) =>
    location === "all" ? "" : location
  )
