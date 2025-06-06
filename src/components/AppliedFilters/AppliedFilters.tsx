import { useRouter } from "next/router"
import { type TagSetFilterDataProps } from "@nypl/design-system-react-components"

import {
  getQueryWithoutFiltersOrPage,
  buildFilterQuery,
  collapseMultiValueQueryParams,
} from "../../utils/refineSearchUtils"
import {
  buildTagsetData,
  buildAppliedFiltersValueArrayWithTagRemoved,
  addLabelPropAndParseFilters,
} from "./appliedFilterUtils"
import type { Aggregation } from "../../types/filterTypes"
import ActiveFilters from "../ItemFilters/ActiveFilters"
import { useFocusContext } from "../../context/FocusContext"

const AppliedFilters = ({ aggregations }: { aggregations: Aggregation[] }) => {
  const router = useRouter()
  const appliedFilters = collapseMultiValueQueryParams(router.query)
  const appliedFiltersWithLabels = addLabelPropAndParseFilters(
    aggregations,
    appliedFilters
  )

  const { setPersistentFocus } = useFocusContext()

  // this type cast is happening because Option type had to be updated to
  // account for Offsite's Element label. That label does
  // not pass thru this part of the code, but this is to placate the
  // compiler.
  const tagSetData = buildTagsetData(
    appliedFiltersWithLabels
  ) as TagSetFilterDataProps[]
  const handleRemove = (tag: TagSetFilterDataProps) => {
    if (tag.label === "Clear filters") {
      setPersistentFocus("filter-results-heading")
      router.push({
        pathname: "/search",
        query: getQueryWithoutFiltersOrPage(router.query),
      })
      return
    }
    const updatedFilters = buildAppliedFiltersValueArrayWithTagRemoved(
      tag,
      appliedFiltersWithLabels
    )
    const updatedQuery = {
      ...getQueryWithoutFiltersOrPage(router.query),
      ...buildFilterQuery(updatedFilters),
    }
    if (tagSetData.length >= 2) {
      setPersistentFocus("active-filters-heading")
    } else {
      setPersistentFocus("filter-results-heading")
    }
    router.push(
      {
        pathname: "/search",
        query: updatedQuery,
      },
      undefined,
      { scroll: false }
    )
  }

  if (!tagSetData.length) return null
  return (
    <ActiveFilters
      onClick={handleRemove}
      tagSetData={tagSetData}
      filterName="search-results"
    />
  )
}

export default AppliedFilters
