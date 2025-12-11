import { getSearchQuery } from "../../utils/searchUtils"
import styles from "../../../styles/components/Search.module.scss"
import { PATHS, SEARCH_FORM_OPTIONS } from "../../config/constants"
import Link from "../Link/Link"
import SearchFilterModal from "../SearchFilters/SearchFilterModal"
import { idConstants } from "../../context/FocusContext"
import type { Aggregation } from "../../types/filterTypes"
import { collapseMultiValueQueryParams } from "../../utils/refineSearchUtils"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import SearchBrowseForm from "../SearchBrowseForm/SearchBrowseForm"

const SearchForm = ({
  aggregations,
  searchResultsCount,
}: {
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
      activePage="search"
      initialScope="all"
      path={PATHS.SEARCH}
      tipTitle="Search tip: "
      selectOptions={SEARCH_FORM_OPTIONS}
      scopeParamKey="field"
      getQueryString={getSearchQuery}
      onSubmitFocusId={idConstants.searchResultsHeading}
    >
      <Link
        className={styles.advancedSearch}
        href="/search/advanced"
        isUnderlined={false}
        mb="xs"
      >
        Advanced search
      </Link>
      {displayFilters && (
        <SearchFilterModal
          aggregations={aggregations}
          searchResultsCount={searchResultsCount}
        />
      )}
    </SearchBrowseForm>
  )
}

export default SearchForm
