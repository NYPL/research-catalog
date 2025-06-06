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
import { ITEMS_PER_SEARCH_RESULT, PATHS } from "../../config/constants"
import FindingAid from "../BibPage/FindingAid"

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
        " > div": {
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
          <StatusBadge type="informative" mb="s">
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
        <SimpleGrid columns={1} mt="l" gap="grid.l">
          {bib.getItemTable && (
            <>
              {bib
                .getItemTable({
                  inSearchResult: true,
                  maxItems: ITEMS_PER_SEARCH_RESULT,
                })
                .map((itemTableData) => (
                  <ItemTable
                    key={`item-table-${itemTableData.items[0].id}`}
                    itemTableData={itemTableData}
                    inSearchResult={true}
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
