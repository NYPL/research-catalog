import {
  Card,
  CardContent,
  CardHeading,
  Box,
  Text,
  CardActions,
  useNYPLBreakpoints,
  SimpleGrid,
} from "@nypl/design-system-react-components"

import RCLink from "../Links/RCLink/RCLink"
import ElectronicResourcesLink from "./ElectronicResourcesLink"
import ItemTable from "../ItemTable/ItemTable"
import ItemTableData from "../../models/ItemTableData"
import type SearchResultsBib from "../../models/SearchResultsBib"
import { PATHS, ITEMS_PER_SEARCH_RESULT } from "../../config/constants"

interface SearchResultProps {
  bib: SearchResultsBib
}

/**
 * The SearchResult component displays a single search result element.
 */
const SearchResult = ({ bib }: SearchResultProps) => {
  const { isLargerThanLarge: isDesktop } = useNYPLBreakpoints()

  // On Search Results, a separate ItemTable is constructed for each item up to
  // the limit set in ITEMS_PER_SEARCH_RESULT.
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
        sx={{ a: { textDecoration: "none" } }}
      >
        <RCLink href={`${PATHS.BIB}/${bib.id}`}>{bib.title}</RCLink>
      </CardHeading>
      <CardContent>
        <Box
          sx={{ p: { display: "inline", marginRight: "s", marginBottom: "s" } }}
        >
          {bib.materialType && <Text>{bib.materialType}</Text>}
          {bib.publicationStatement && <Text>{bib.publicationStatement}</Text>}
          {bib.yearPublished && <Text>{bib.yearPublished}</Text>}
          <Text>{bib.itemMessage}</Text>
        </Box>

        <SimpleGrid columns={1} gap="grid.l">
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
                    href={`${bib.url}#items-table`}
                    fontSize={{
                      base: "mobile.body.body2",
                      md: "desktop.body.body2",
                    }}
                    fontWeight="medium"
                    type="standalone"
                  >
                    {`View All ${bib.itemMessage} `}
                  </RCLink>
                </CardActions>
              )}
            </>
          )}
        </SimpleGrid>
      </CardContent>
    </Card>
  )
}

export default SearchResult
