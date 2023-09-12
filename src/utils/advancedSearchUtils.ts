import { searchAggregations } from "../config/aggregations"

export const languages = [
  {
    value: "",
    label: "-- Any -- ",
  },
].concat(
  searchAggregations.language.sort((a, b) => (a.label > b.label ? 1 : -1))
)
