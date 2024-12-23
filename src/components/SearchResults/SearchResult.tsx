import {
  Card,
  CardContent,
  CardHeading,
  Box,
  Text,
  CardActions,
  SimpleGrid,
  StatusBadge,
} from "@nypl/design-system-react-components"

import RCLink from "../Links/RCLink/RCLink"
import ElectronicResourcesLink from "./ElectronicResourcesLink"
import ItemTable from "../ItemTable/ItemTable"
import type SearchResultsBib from "../../models/SearchResultsBib"
import { PATHS } from "../../config/constants"

interface SearchResultProps {
  bib: SearchResultsBib
}

/**
 * The SearchResult component displays a single search result element.
 */
const SearchResult = ({ bib }: SearchResultProps) => {
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
        display="flex"
        alignItems="baseline"
      >
        <RCLink href={`${PATHS.BIB}/${bib.id}`}>{bib.titleDisplay}</RCLink>
        {bib.findingAid && (
          <StatusBadge id={`${bib.id}-has-finding-aid`} type="informative">
            FINDING AID AVAILABLE
          </StatusBadge>
        )}
      </CardHeading>
      <CardContent>
        <Box
          sx={{
            p: { display: "inline-block", marginRight: "s", marginBottom: "s" },
          }}
        >
          {bib.materialType && <Text>{bib.materialType}</Text>}
          {bib.publicationStatement && <Text>{bib.publicationStatement}</Text>}
          {bib.yearPublished && <Text>{bib.yearPublished}</Text>}
          <Text>{bib.getNumItemsMessage()}</Text>
        </Box>

        <SimpleGrid columns={1} gap="grid.l">
          {bib.hasElectronicResources && (
            <ElectronicResourcesLink
              bibUrl={bib.url}
              electronicResources={bib.electronicResources}
            />
          )}
          {bib.itemTables && (
            <>
              {bib.itemTables.map((itemTableData) => (
                <ItemTable
                  itemTableData={itemTableData}
                  key={`search-results-item-${itemTableData.items[0].id}`}
                />
              ))}
              {bib.showViewAllItemsLink() && (
                <CardActions>
                  <RCLink
                    href={`${bib.url}#item-table`}
                    fontSize={{
                      base: "mobile.body.body2",
                      md: "desktop.body.body2",
                    }}
                    fontWeight="medium"
                    type="standalone"
                  >
                    {`View all ${bib.getNumItemsMessage()} `}
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
