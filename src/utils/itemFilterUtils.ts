import type { SelectedFilters } from "../types/filterTypes"

export const isRecapLocation = (loc: string) => {
  console.log(loc)
  return loc.split(":")[1].startsWith("rc")
}

/* eslint-disable @typescript-eslint/naming-convention */
export const combineRecapLocations = (locations: string[]) => {
  if (locations.find(isRecapLocation)) {
    return [...locations.filter((loc) => !isRecapLocation(loc)), "Offsite"]
  } else return locations
}

type BibPageQueryParams = {
  item_location?: string
  item_format?: string
  item_status?: string
}

export const parseItemFilterQueryParams = ({
  item_status,
  item_format,
  item_location,
}: BibPageQueryParams) => {
  return {
    location: item_location
      ? combineRecapLocations(item_location.split(","))
      : [],
    format: item_format?.split(",") || [],
    status: item_status?.split(",") || [],
  }
}

export const buildItemFilterQueryParams = (
  { location, format, status }: SelectedFilters,
  recapLocations: string
) => {
  const locs = location.map((loc) => {
    if (isRecapLocation(loc)) return recapLocations
    else return loc
  })
  const location_query = location.length
    ? "item_location=" + locs.join(",")
    : ""
  const format_query = format.length ? "item_format=" + format.join(",") : ""
  const status_query = status.length ? "item_status=" + status.join(",") : ""

  const query = encodeURI(`?${location_query}&${format_query}&${status_query}`)
  return query.length > 3 ? query : ""
}
