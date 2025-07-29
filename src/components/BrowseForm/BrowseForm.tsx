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
import { BASE_URL, PATHS, SEARCH_FORM_OPTIONS } from "../../config/constants"
import useLoading from "../../hooks/useLoading"
import type { Aggregation } from "../../types/filterTypes"
import { collapseMultiValueQueryParams } from "../../utils/refineSearchUtils"
import SearchFilterModal from "../SearchFilters/SearchFilterModal"
import { useFocusContext, idConstants } from "../../context/FocusContext"
import { browseFormSelectOptions } from "../../utils/browseUtils"

/**
 * The BrowseForm component renders and controls the Browse form.
 */
const BrowseForm = ({
  aggregations,
  browseResultsCount,
}: {
  aggregations?: Aggregation[]
  browseResultsCount?: number
}) => {
  const router = useRouter()
  const [browseTerm, setBrowseTerm] = useState(
    (router?.query?.q as string) || ""
  )
  const [searchScope, setSearchScope] = useState(
    (router?.query?.search_scope as string) || "has"
  )
  const [, setAppliedFilters] = useState(
    collapseMultiValueQueryParams(router.query)
  )

  const isLoading = useLoading()

  const { setPersistentFocus } = useFocusContext()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const browseParams = {
      q: browseTerm,
      field: searchScope,
    }

    const queryString = getSearchQuery(browseParams)

    if (router.asPath.includes("/search?"))
      setPersistentFocus(idConstants.searchResultsHeading)
    // if we are doing a search from the home page, there should be no focused element when results are delivered
    else setPersistentFocus(null)
    await router.push(`${PATHS.SEARCH}${queryString}`)
  }

  const handleChange = (
    e: SyntheticEvent,
    setValue: Dispatch<SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement
    setValue(target.value)
  }

  useEffect(() => {
    setAppliedFilters(collapseMultiValueQueryParams(router.query))
  }, [router.query])

  return (
    <Box className="no-print" backgroundColor="ui.bg.default">
      <div className={styles.searchContainerInner}>
        <SearchBar
          id="mainContent"
          action={`${BASE_URL}/browse`}
          method="get"
          onSubmit={handleSubmit}
          labelText="Browse Bar Label"
          isDisabled={isLoading}
          selectProps={{
            value: searchScope,
            onChange: (e) => handleChange(e, setSearchScope),
            labelText: "Select a category",
            name: "search_scope",
            optionsData: browseFormSelectOptions,
          }}
          textInputProps={{
            isClearable: true,
            onChange: (e) => handleChange(e, setBrowseTerm),
            isClearableCallback: () => setBrowseTerm(""),
            value: browseTerm,
            name: "q",
            labelText: "Ornithology -- Birds",
          }}
        />
      </div>
    </Box>
  )
}

export default BrowseForm
