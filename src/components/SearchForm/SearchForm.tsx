import { SearchBar } from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import type { SyntheticEvent } from "react"

import styles from "../../../styles/components/Search.module.scss"
import RCLink from "../RCLink/RCLink"
import { getQueryString } from "../../utils/searchUtils"
import type { SearchFormEvent } from "../../types/searchTypes"
import { BASE_URL, PATHS } from "../../config/constants"

/**
 * The SearchForm component renders and controls the Search form and
 * advanced search link.
 */
const SearchForm = () => {
  const router = useRouter()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & SearchFormEvent
    const searchParams = {
      q: target.q.value,
      field: target.search_scope.value,
    }
    const queryString = getQueryString(searchParams)

    await router.push(`${PATHS.SEARCH}${queryString}`)
  }

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
            selectProps={{
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
              labelText:
                "Search by keyword, title, journal title, or author/contributor",
              name: "q",
              placeholder:
                "Keyword, title, journal title, or author/contributor",
            }}
          />
        </div>
        <div className={styles.advancedSearchContainer}>
          <RCLink href={"/search/advanced"}>Advanced Search</RCLink>
        </div>
      </div>
    </div>
  )
}

export default SearchForm
