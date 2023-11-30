import {
  Card,
  CardContent,
  CardHeading,
  Box,
  Text,
  useNYPLBreakpoints,
} from "@nypl/design-system-react-components"

import RCLink from "../RCLink/RCLink"
import ItemTable from "../ItemTable/ItemTable"
import type SearchResultsBib from "../../models/SearchResultsBib"
import ItemTableData from "../../models/ItemTableData"
import { PATHS, ITEMS_PER_SEARCH_RESULT } from "../../config/constants"

interface SearchResultProps {
  bib: SearchResultsBib
}

/**
 * The SearchResult component displays a single search result element.
 */
const SearchResult = ({ bib }: SearchResultProps) => {
  const { isLargerThanLarge: isDesktop } = useNYPLBreakpoints()

  // On Search Results, a separate ItemTable is constructed for each item up to the limit set in ITEMS_PER_SEARCH_RESULT.
  // TODO: Move this preprocessing to SearchResultsBib model
  const searchResultItems: ItemTableData[] =
    bib.hasItems &&
    bib.items.slice(0, ITEMS_PER_SEARCH_RESULT).map((item) => {
      return new ItemTableData([item], {
        isBibPage: false,
        isDesktop,
        isArchiveCollection: bib.isArchiveCollection,
      })
    })

  return (
    <Card
      sx={{
        borderBottom: "1px solid var(--nypl-colors-ui-border-default)",
        paddingBottom: "m",
      }}
    >
      <CardHeading level="h3" size="heading4">
        <RCLink href={`${PATHS.BIB}/${bib.id}`}>{bib.title}</RCLink>
      </CardHeading>
      <CardContent>
        <Box sx={{ p: { display: "inline", marginRight: "s" } }} mb="m">
          {bib.materialType && <Text>{bib.materialType}</Text>}
          {bib.publicationStatement && <Text>{bib.publicationStatement}</Text>}
          {bib.yearPublished && <Text>{bib.yearPublished}</Text>}
          <Text>{bib.itemMessage}</Text>
        </Box>
        {searchResultItems &&
          searchResultItems.map((itemTableData) => (
            <ItemTable
              itemTableData={itemTableData}
              key={`search-results-item-${itemTableData.items[0].id}`}
            />
          ))}
      </CardContent>
    </Card>
  )
}

export default SearchResult
