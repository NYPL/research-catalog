import { aggregationsResults } from "../../../__test__/fixtures/searchResultsManyBibs"
import type { Aggregation } from "../../types/filterTypes"
import SearchResultsFilters from "../SearchResultsFilters"

describe("SearchResultsFilter model", () => {
  it("adds proper label to building location options", () => {
    const filters = new SearchResultsFilters(
      aggregationsResults.itemListElement as Aggregation[],
      {
        value: "buildingLocation",
        label: "Item location",
      }
    )
  })
})
