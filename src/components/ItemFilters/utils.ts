export const combineRecapLocations = (locations: string[]) => {
  const isRecapLocation = (loc: string) => {
    loc.split(":")[1].startsWith("rc")
  }
  if (locations.filter(isRecapLocation).length !== locations.length) {
    return [...locations.filter(isRecapLocation), "offsite"]
  } else return locations
}
