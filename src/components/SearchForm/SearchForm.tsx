import { SearchBar } from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import type { SyntheticEvent, Dispatch, SetStateAction } from "react"
import { useState } from "react"

import styles from "../../../styles/components/Search.module.scss"
import RCLink from "../RCLink/RCLink"
import { getQueryString } from "../../utils/searchUtils"
import { BASE_URL, PATHS } from "../../config/constants"

/**
 * The SearchForm component renders and controls the Search form and
 * advanced search link.
 */
const SearchForm = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState((router.query.q as string) || "")
  const [searchScope, setSearchScope] = useState("all")

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const searchParams = {
      q: searchTerm,
      field: searchScope,
    }
    const queryString = getQueryString(searchParams)

    await router.push(`${PATHS.SEARCH}${queryString}`)
  }

  const handleInputChange = (
    e: SyntheticEvent,
    setValue: Dispatch<SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement
    setValue(target.value)
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
              value: searchScope,
              onChange: (e) => handleInputChange(e, setSearchScope),
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
              onChange: (e) => handleInputChange(e, setSearchTerm),
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
        <div className={styles.advancedSearchContainer}>
          <RCLink href={"/search/advanced"}>Advanced Search</RCLink>
        </div>
      </div>
    </div>
  )
}

export default SearchForm
