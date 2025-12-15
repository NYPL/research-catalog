import type { SearchParams, SearchFormInputField } from "../types/searchTypes"
import { BASE_URL } from "../config/constants"
import { searchVocabularies } from "../../data/searchVocabularies"
import type { MultiSelectItem } from "@nypl/design-system-react-components"

export const textInputFields: SearchFormInputField[] = [
  { name: "q", label: "Keyword" },
  { name: "title", label: "Title" },
  { name: "contributor", label: "Author/contributor" },
  { name: "callnumber", label: "Call number" },
  { name: "standard_number", label: "Unique identifier" },
  { name: "subject", label: "Subject" },
]

export const initialSearchFormState: SearchParams = {
  q: "",
  title: "",
  contributor: "",
  subject: "",
  callnumber: "",
  standard_number: "",
  filters: {
    language: [],
    dateTo: "",
    dateFrom: "",
    format: [],
    buildingLocation: [],
    division: [],
  },
}

// Returns an array of objects of Language options types derived from the aggregations sorted by label text.
export const languageOptions = searchVocabularies.languages
  .sort((a, b) => (a.label > b.label ? 1 : -1))

  .filter((language) => language.label !== "")
  .map((language) => {
    return { id: language.value, name: language.label }
  })

// Returns an array of objects of Material Type options derived from the aggregations sorted by label text
export const formatOptions = searchVocabularies.formats
  .sort((a, b) => (a.label > b.label ? 1 : -1))
  .map((format) => {
    return { id: format.value, name: format.label }
  })

export const buildingLocationOptions = searchVocabularies.buildingLocations.map(
  (buildingLocation) => {
    return { id: buildingLocation.value, name: buildingLocation.label }
  }
)

export const collectionOptions = mapCollectionsIntoLocations(
  searchVocabularies.collections
)

export const buildGoBackHref = (referer) => {
  if (!referer) return null
  const isNotRCUrl = !referer.includes(BASE_URL)
  if (isNotRCUrl) return null
  const goBackEndpoint = referer.split(BASE_URL)[1]
  if (!goBackEndpoint) return "/"
  return goBackEndpoint
}

export function mapCollectionsIntoLocations(
  collections: { value: string; label: string; count?: number }[]
): MultiSelectItem[] {
  return searchVocabularies.buildingLocations
    .filter((building) => building.value !== "rc")
    .map((building) => {
      const children = collections
        .filter((col) => col.value.startsWith(building.value))
        .map((col) => ({
          id: col.value,
          name: col.count
            ? `${col.label} (${col.count.toLocaleString()})`
            : col.label,
          ...(col.count !== undefined ? { count: col.count } : {}),
        }))
      return {
        id: building.value,
        name: building.label,
        children,
      }
    })
    .filter((group) => group.children.length > 0)
}

/** Get filter string as it displays in the Active filters tagset: with shortened parent location,
 ** then the collection/division title. **/
export function mapCollectionToFilterTag(collectionValue, collectionName) {
  const building = searchVocabularies.buildingLocations.find(
    (b) => collectionValue.toString().slice(0, 2) === b.value
  )
  if (building && building.nickname) {
    return `${building.nickname} - ${collectionName}`
  }
  return collectionName
}
