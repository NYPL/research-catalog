import type { SearchParams, SearchFormInputField } from "../types/searchTypes"
import { BASE_URL } from "../config/constants"
import { searchVocabularies } from "../../data/searchVocabularies"

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
    language: "",
    dateBefore: "",
    dateAfter: "",
    format: [],
    buildingLocation: [],
  },
}

// Returns an array of objects of Language options types derived from the aggregations sorted by label text,
// including the empty default option of "Any".
export const languageOptions = [
  {
    value: "",
    label: "-- Any -- ",
  },
]
  .concat(
    searchVocabularies.languages.sort((a, b) => (a.label > b.label ? 1 : -1))
  )
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

export const collectionOptions = searchVocabularies.buildingLocations
  .filter((building) => building.value !== "rc")
  .map((building) => {
    const children = searchVocabularies.collections
      .filter((col) => col.value.startsWith(building.value))
      .map((col) => ({
        id: col.value,
        name: col.label,
      }))
    return {
      id: building.value,
      name: building.label,
      children,
    }
  })

export const buildGoBackHref = (referer) => {
  if (!referer) return null
  const isNotRCUrl = !referer.includes(BASE_URL)
  if (isNotRCUrl) return null
  const goBackEndpoint = referer.split(BASE_URL)[1]
  if (!goBackEndpoint) return "/"
  return goBackEndpoint
}
