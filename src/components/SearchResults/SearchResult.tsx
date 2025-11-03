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
import type SearchResultsBib from "../../models/SearchResultsBib"
import { PATHS } from "../../config/constants"
import FindingAid from "../BibPage/FindingAid"
import SearchResultItems from "./SearchResultItems"

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
        "[data-body]": {
          width: "100% !important",
        },
      }}
    >
      <CardHeading
        level="h3"
        size="heading5"
        sx={{ a: { textDecoration: "none" } }}
      >
        {bib.findingAid && (
          <StatusBadge variant="informative" mb="s">
            FINDING AID AVAILABLE
          </StatusBadge>
        )}
        <RCLink href={`${PATHS.BIB}/${bib.id}`}>{bib.titleDisplay}</RCLink>
      </CardHeading>
      <CardContent data-testid="card-content">
        <Box
          sx={{
            p: { display: "inline-block", marginRight: "s", marginBottom: "s" },
          }}
        >
          {bib.format && <Text>{bib.format}</Text>}
          {bib.publicationStatement && <Text>{bib.publicationStatement}</Text>}
          {bib.yearPublished && <Text>{bib.yearPublished}</Text>}
          <Text>{bib.getNumItemsMessage()}</Text>
        </Box>
        <Box width="100%">
          {bib.findingAid ? (
            <FindingAid
              findingAidURL={bib.findingAid}
              hasElectronicResources={bib.hasElectronicResources}
            />
          ) : null}
          {bib.hasElectronicResources ? (
            <ElectronicResourcesLink
              bibUrl={bib.url}
              electronicResources={bib.electronicResources}
            />
          ) : null}
        </Box>
        <SimpleGrid columns={1} gap="grid.m">
          {bib.itemTables && (
            <>
              {bib.itemTables.map((itemTableData) => (
                <SearchResultItems
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
                    variant="standalone"
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
