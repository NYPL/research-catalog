import { SearchBar } from "@nypl/design-system-react-components"

import styles from "../../../styles/components/Search.module.scss"
import RCLink from "../RCLink/RCLink"

/**
 * The SearchForm component renders and controls the Search form and
 * advanced search link.
 */
const SearchForm = () => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchContainerInner}>
        <div className={styles.searchBarContainer}>
          <SearchBar
            id="mainContent"
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onSubmit={() => {}}
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
          <RCLink href={"/search/advanced"}>Advanced SearchForm</RCLink>
        </div>
      </div>
    </div>
  )
}

export default SearchForm
