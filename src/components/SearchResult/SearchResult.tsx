import {
  Card,
  CardContent,
  CardHeading,
  Box,
  Text,
  CardActions,
  useNYPLBreakpoints,
} from "@nypl/design-system-react-components"

import RCLink from "../RCLink/RCLink"
import ElectronicResourcesLink from "./ElectronicResourcesLink"
import ItemTable from "../ItemTable/ItemTable"
import ItemTableData from "../../models/ItemTableData"
import type SearchResultsBib from "../../models/SearchResultsBib"
import {
  PATHS,
  ITEMS_PER_SEARCH_RESULT,
  BASE_URL,
} from "../../config/constants"

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
        paddingBottom: "l",
      }}
    >
      <CardHeading
        level="h3"
        size="heading5"
        url={`${BASE_URL}${PATHS.BIB}/${bib.id}`}
      >
        {bib.title}
      </CardHeading>
      <CardContent>
        <Box sx={{ p: { display: "inline", marginRight: "s" } }}>
          {bib.materialType && <Text>{bib.materialType}</Text>}
          {bib.publicationStatement && <Text>{bib.publicationStatement}</Text>}
          {bib.yearPublished && <Text>{bib.yearPublished}</Text>}
          <Text>{bib.itemMessage}</Text>
        </Box>
        {bib.hasElectronicResources && (
          <ElectronicResourcesLink
            bibUrl={bib.url}
            electronicResources={bib.electronicResources}
          />
        )}
        {searchResultItems && (
          <>
            {searchResultItems.map((itemTableData) => (
              <ItemTable
                itemTableData={itemTableData}
                key={`search-results-item-${itemTableData.items[0].id}`}
              />
            ))}
            {bib.showViewAllItemsLink && (
              <CardActions>
                <RCLink
                  href={`${BASE_URL}${bib.url}#items-table`}
                  type="standalone"
                >
                  {`View All ${bib.itemMessage} `}
                </RCLink>
              </CardActions>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default SearchResult
