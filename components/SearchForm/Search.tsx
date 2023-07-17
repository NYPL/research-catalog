import styles from "@/styles/components/Search.module.scss"
import { SearchBar, Link as DSLink } from "@nypl/design-system-react-components"
import Link from "next/link"

const Search = () => {
  return (
    <section role="search" className={styles.searchContainer}>
      <div className={styles.searchFormContainer}>
        <div className={styles.searchBarContainer}>
          <SearchBar
            id="mainContent"
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
          <Link href={"/search/advanced"} passHref>
            <DSLink>Advanced Search</DSLink>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Search
