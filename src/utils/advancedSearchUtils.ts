import { searchAggregations } from "../config/aggregations"

export const textInputFields = [
  { name: "searchKeywords", label: "Keywords" },
  { name: "title", label: "Title" },
  { name: "contributor", label: "Author" },
  { name: "subject", label: "Subject" },
]

export const initialSearchFormState = {
  searchKeywords: "",
  title: "",
  contributor: "",
  subject: "",
  selectedFilters: {
    language: "",
  },
}

// Returns an object of Language options types derived from the aggregations sorted by label text,
// including the empty default option of "Any".
export const languageOptions = [
  {
    value: "",
    label: "-- Any -- ",
  },
].concat(
  searchAggregations.language.sort((a, b) => (a.label > b.label ? 1 : -1))
)

// Returns an object of Material Type options derived from the aggregations sorted by label text
export const materialTypeOptions = searchAggregations.materialType.sort(
  (a, b) => (a.label > b.label ? 1 : -1)
)
