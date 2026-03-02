import { useRouter } from "next/router"
import {
  useNYPLBreakpoints,
  type TagSetFilterDataProps,
} from "@nypl/design-system-react-components"

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
import { useFocusContext, idConstants } from "../../context/FocusContext"

const AppliedFilters = ({ aggregations }: { aggregations: Aggregation[] }) => {
  const router = useRouter()
  const appliedFilters = collapseMultiValueQueryParams(router.query)
  const appliedFiltersWithLabels = addLabelPropAndParseFilters(
    aggregations,
    appliedFilters
  )
  const { isLargerThanSmallTablet } = useNYPLBreakpoints()
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
      setPersistentFocus(idConstants.filterResultsHeading)
      router.push({
        pathname: router.pathname,
        query: getQueryWithoutFiltersOrPage(router.query),
      })
      return
    }

    const updatedFilters = buildAppliedFiltersValueArrayWithTagRemoved(
      tag,
      appliedFilters
    )

    const updatedQuery = {
      ...getQueryWithoutFiltersOrPage(router.query),
      ...buildFilterQuery(updatedFilters),
    }
    if (tagSetData.length > 1) {
      // If there's still 1 or more filter tags after removing one
      setPersistentFocus(idConstants.activeFiltersHeading)
    } else {
      setPersistentFocus(
        isLargerThanSmallTablet
          ? idConstants.filterResultsHeading
          : idConstants.searchFiltersModal
      )
    }
    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { scroll: false }
    )
  }

  if (!tagSetData.length) return null

  // 'From' date filter should appear before 'to' date.
  const sortedTagSetData = [...tagSetData].sort((a, b) => {
    if (a.field === "dateFrom" && b.field === "dateTo") return -1
    if (a.field === "dateTo" && b.field === "dateFrom") return 1
    return 0
  })

  return (
    <ActiveFilters
      onClick={handleRemove}
      tagSetData={sortedTagSetData}
      filterName="search-results"
    />
  )
}

export default AppliedFilters
