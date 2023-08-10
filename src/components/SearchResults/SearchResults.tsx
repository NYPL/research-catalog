import type { SearchResultsResponse } from "../../types/searchTypes"

/**
 * The SearchResults component renders the search results fetched in the Search page
 */

const SearchResults = ({ results }: SearchResultsResponse) => {
  return (
    <ul>
      {results.itemListElement.map(function (resultsItem) {
        return (
          <li key={resultsItem.result["@id"]}>
            {JSON.stringify(resultsItem.result["titleDisplay"][0])}
          </li>
        )
      })}
    </ul>
  )
}

export default SearchResults
