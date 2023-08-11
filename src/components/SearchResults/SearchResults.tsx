import type { SearchResultsResponse } from "../../types/searchTypes"
import {
  SimpleGrid,
  Card,
  CardHeading,
} from "@nypl/design-system-react-components"

import RCLink from "../../components/RCLink/RCLink"

/**
 * The SearchResults component renders the search results fetched in the Search page
 */
const SearchResults = ({ results }: SearchResultsResponse) => {
  // TODO: Add bib model and render fields in a SearchResult component
  return (
    <SimpleGrid columns={1} gap="grid.m">
      {results?.itemListElement.map(function (resultsItem) {
        return (
          <Card key={resultsItem.result["@id"]}>
            <CardHeading level="four">
              <RCLink href="/bib">
                {resultsItem.result["titleDisplay"][0]}
              </RCLink>
            </CardHeading>
          </Card>
        )
      })}
    </SimpleGrid>
  )
}

export default SearchResults
