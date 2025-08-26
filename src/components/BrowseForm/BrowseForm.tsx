import { getBrowseQuery } from "../../utils/browseUtils"
import { BROWSE_FORM_OPTIONS, PATHS } from "../../config/constants"
import { idConstants } from "../../context/FocusContext"
import SearchBrowseForm from "../SearchBrowseForm/SearchBrowseForm"
import type { RCPage } from "../../types/pageTypes"
import { useRouter } from "next-router-mock"
import { useState, useEffect } from "react"
import type { Aggregation } from "../../types/filterTypes"
import { collapseMultiValueQueryParams } from "../../utils/refineSearchUtils"
import SearchFilterModal from "../SearchFilters/SearchFilterModal"

const BrowseForm = ({
  activePage,
  aggregations,
  searchResultsCount,
}: {
  activePage: RCPage
  aggregations?: Aggregation[]
  searchResultsCount?: number
}) => {
  const router = useRouter()
  const [, setAppliedFilters] = useState(
    collapseMultiValueQueryParams(router.query)
  )

  useEffect(() => {
    setAppliedFilters(collapseMultiValueQueryParams(router.query))
  }, [router.query])

  const displayFilters = !!aggregations?.filter((agg) => agg.values.length)
    .length

  return (
    <SearchBrowseForm
      initialScope="has"
      path={PATHS.BROWSE}
      tipTitle="Browse tip: "
      selectOptions={BROWSE_FORM_OPTIONS}
      scopeParamKey="searchScope"
      getQueryString={getBrowseQuery}
      onSubmitFocusId={idConstants.browseResultsHeading}
      activePage={activePage}
    >
      {displayFilters && activePage === "sh-results" && (
        <SearchFilterModal
          aggregations={aggregations}
          searchResultsCount={searchResultsCount}
        />
      )}
    </SearchBrowseForm>
  )
}

export default BrowseForm
