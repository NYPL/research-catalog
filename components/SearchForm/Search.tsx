import styles from "@/styles/components/Search.module.scss"
import {
  SearchBar,
  Link as DSLink,
  TextInput,
} from "@nypl/design-system-react-components"
import Link from "next/link"

const Search = () => {
  return (
    <section role="search" className={styles.searchContainer}>
      <div className={styles.searchFormContainer}>
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
          textInputElement={
            <TextInput
              labelText=""
              id="searchBar"
              className={styles.searchBarWrapper}
              type="text"
              name="q"
              aria-label="Search by keyword, title, journal title, or author/contributor"
              placeholder="Keyword, title, journal title, or author/contributor"
              onChange={() => {}}
              value=""
            />
          }
        />
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
