import { SimpleGrid } from "@nypl/design-system-react-components"
import type SearchResultsBib from "../../models/SearchResultsBib"
import SearchResult from "./SearchResult"

export default function SearchResults({ isLoading, searchResultsBibs }) {
  return !isLoading ? (
    <SimpleGrid columns={1} id="search-results-list" gap="grid.l">
      {searchResultsBibs.map((bib: SearchResultsBib) => {
        return <SearchResult key={bib.id} bib={bib} />
      })}
    </SimpleGrid>
  ) : null
}
