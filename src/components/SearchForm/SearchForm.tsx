import { Box, SearchBar } from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import type { SyntheticEvent, Dispatch, SetStateAction } from "react"
import { useContext, useState } from "react"

import styles from "../../../styles/components/Search.module.scss"
import RCLink from "../RCLink/RCLink"
import { getSearchQuery } from "../../utils/searchUtils"
import { BASE_URL, PATHS } from "../../config/constants"
import EDSLink from "../EDSLink"
import useLoading from "../../hooks/useLoading"
import RefineSearch from "../RefineSearch/RefineSearch"
import { SearchResultsAggregationsContext } from "../../../pages/search/SearchResultsAggregationsContext"
import type { Aggregation } from "../../types/filterTypes"
import AppliedFilters from "../SearchFilters/AppliedFilters"

/**
 * The SearchForm component renders and controls the Search form and
 * advanced search link.
 */
const SearchForm = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(
    (router?.query?.q as string) || ""
  )
  const [searchScope, setSearchScope] = useState("all")
  const aggregations = useContext(SearchResultsAggregationsContext)

  const isLoading = useLoading()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const searchParams = {
      q: searchTerm,
      field: searchScope,
    }
    const queryString = getSearchQuery(searchParams)

    await router.push(`${PATHS.SEARCH}${queryString}`)
  }

  const handleChange = (
    e: SyntheticEvent,
    setValue: Dispatch<SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement
    setValue(target.value)
  }

  const displayRefineResults = !!aggregations?.filter(
    (agg: Aggregation) => agg.values.length
  ).length

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchContainerInner}>
        <div className={styles.searchBarContainer}>
          <SearchBar
            id="mainContent"
            action={`${BASE_URL}/search`}
            method="get"
            onSubmit={handleSubmit}
            labelText="Search Bar Label"
            isDisabled={isLoading}
            selectProps={{
              value: searchScope,
              onChange: (e) => handleChange(e, setSearchScope),
              labelText: "Select a category",
              name: "search_scope",
              optionsData: [
                { text: "All fields", value: "all" },
                { text: "Title", value: "title" },
                { text: "Journal Title", value: "journal_title" },
                { text: "Author/Contributor", value: "contributor" },
                { text: "Standard Numbers", value: "standard_number" },
                { text: "Subject", value: "subject" },
              ],
            }}
            textInputProps={{
              isClearable: true,
              onChange: (e) => handleChange(e, setSearchTerm),
              isClearableCallback: () => setSearchTerm(""),
              value: searchTerm,
              labelText:
                "Search by keyword, title, journal title, or author/contributor",
              name: "q",
              placeholder:
                "Keyword, title, journal title, or author/contributor",
            }}
            sx={{
              ".chakra-select__icon-wrapper": { "z-index": "999 !important" },
            }}
          />
        </div>
        <div className={styles.auxSearchContainer}>
          {/* Temporary color update. The Header overrides the new
            DS 2.X CSS color variable values. */}
          {displayRefineResults && <RefineSearch aggregations={aggregations} />}
          <EDSLink />
          <RCLink
            className={styles.advancedSearch}
            href={`${BASE_URL}/search/advanced`}
            color="#0069BF"
          >
            Advanced Search
          </RCLink>
        </div>
        <AppliedFilters aggregations={aggregations} />
      </div>
    </div>
  )
}

export default SearchForm
