import {
  Box,
  Flex,
  Icon,
  SearchBar,
  Text,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import type { SyntheticEvent, Dispatch, SetStateAction } from "react"
import { useState, useEffect } from "react"

import styles from "../../../styles/components/Search.module.scss"
import RCLink from "../Links/RCLink/RCLink"
import {
  getSearchQuery,
  searchFormSelectOptions,
} from "../../utils/searchUtils"
import {
  BASE_URL,
  BROWSE_FORM_OPTIONS,
  PATHS,
  SEARCH_FORM_OPTIONS,
} from "../../config/constants"
import useLoading from "../../hooks/useLoading"
import RefineSearch from "../RefineSearch/RefineSearch"
import type { Aggregation } from "../../types/filterTypes"
import { collapseMultiValueQueryParams } from "../../utils/refineSearchUtils"

/**
 * The SearchForm component renders and controls the Search form and
 * advanced search link.
 */
const SearchForm = ({
  aggregations,
  activePage,
}: {
  activePage: string
  aggregations?: Aggregation[]
}) => {
  const browseUtil = {
    initialScope: "keyword",
    path: PATHS.BROWSE_SUBJECT,
    options: BROWSE_FORM_OPTIONS,
  }
  const searchUtil = {
    initialScope: "all",
    path: PATHS.SEARCH,
    options: SEARCH_FORM_OPTIONS,
  }
  const showSearchBar = ["browse", "search"].includes(activePage)
  const config = activePage === "search" ? searchUtil : browseUtil
  const router = useRouter()
  const [keyword, setKeyword] = useState((router?.query?.q as string) || "")
  const [scope, setScope] = useState(
    (router?.query?.[`${activePage}_scope`] as string) || config.initialScope
  )
  const [appliedFilters, setAppliedFilters] = useState(
    collapseMultiValueQueryParams(router.query)
  )
  const tip = config.options[scope].tip
  const placeholder = config.options[scope].placeholder

  const isLoading = useLoading()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const searchParams = {
      q: keyword,
      field: scope,
    }

    const queryString = getSearchQuery(searchParams)

    await router.push(`${config.path}${queryString}`)
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

  useEffect(() => {
    setAppliedFilters(collapseMultiValueQueryParams(router.query))
  }, [router.query])

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchContainerInner}>
        <>
          <Text size="body2" className={styles.searchTip}>
            <Icon size="medium" name="errorOutline" iconRotation="rotate180" />
            <Box as="span" className={styles.searchTipText}>
              <span
                className={styles.searchTipTitle}
              >{`${activePage} tip: `}</span>
              {tip}
            </Box>
          </Text>
          <SearchBar
            id="mainContent"
            action={`${BASE_URL}/${activePage}`}
            method="get"
            onSubmit={handleSubmit}
            labelText="Search Bar Label"
            isDisabled={isLoading}
            selectProps={{
              value: scope,
              onChange: (e) => handleChange(e, setScope),
              labelText: "Select a category",
              name: `${activePage}_scope`,
              optionsData: searchFormSelectOptions(config.options),
            }}
            textInputProps={{
              isClearable: true,
              onChange: (e) => handleChange(e, setKeyword),
              isClearableCallback: () => setKeyword(""),
              value: keyword,
              name: "q",
              labelText: tip,
              placeholder,
            }}
            sx={{
              ".chakra-select__icon-wrapper": { "z-index": "999 !important" },
            }}
          />
        </>
        <Flex direction="column" justifyContent="space-between" mt="xs">
          {activePage === "search" && (
            <RCLink
              className={styles.advancedSearch}
              href="/search/advanced"
              isUnderlined={false}
              mb="xs"
            >
              Advanced search
            </RCLink>
          )}
          {displayRefineResults && (
            <RefineSearch
              activePage={activePage}
              setAppliedFilters={setAppliedFilters}
              appliedFilters={appliedFilters}
              aggregations={aggregations}
            />
          )}
        </Flex>
      </div>
    </div>
  )
}

export default SearchForm
