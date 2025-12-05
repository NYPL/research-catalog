import {
  Card,
  CardContent,
  CardHeading,
  Box,
  Text,
  CardActions,
  SimpleGrid,
  StatusBadge,
  Icon,
} from "@nypl/design-system-react-components"
import Link from "../Link/Link"
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
  const separatingDot = (
    // @ts-ignore
    <Icon size="xxsmall" ml="xs" mr="xs" pb="xxs">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="4"
        height="4"
        viewBox="0 0 4 4"
        fill="#000"
      >
        <circle cx="2" cy="2" r="2" fill="#000" />
      </svg>
    </Icon>
  )
  const metadata = [
    bib.format,
    bib.publicationStatement,
    bib.yearPublished,
    bib.getNumItemsMessage(),
  ].filter(Boolean)

  return (
    <Card
      sx={{
        borderRadius: "8px",
        border: "1px solid var(--ui-gray-medium, #BDBDBD)",
        paddingLeft: "m",
        paddingRight: "m",
        paddingTop: "l",
        paddingBottom: bib.itemTables?.length > 0 ? 0 : "m",
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
            Finding aid available
          </StatusBadge>
        )}
        <Link href={`${PATHS.BIB}/${bib.id}`}>{bib.titleDisplay}</Link>
      </CardHeading>
      <CardContent data-testid="card-content">
        <Box
          sx={{
            p: {
              display: "inline-block",
            },
          }}
        >
          {metadata.map((piece, index) => (
            <>
              <Text key={index}>{piece}</Text>
              {index < metadata.length - 1 && separatingDot}
            </>
          ))}
        </Box>
        {(bib.findingAid || bib.hasElectronicResources) && (
          <Box width="100%" mt="s">
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
        )}
        {bib.itemTables?.length > 0 && (
          <SimpleGrid
            columns={1}
            gap="grid.m"
            mt="s"
            sx={{
              "*:first-of-type table": {
                borderTop: "none !important",
                paddingTop: "xs !important",
              },
              paddingBottom: bib.showViewAllItemsLink() ? "s" : "m",
            }}
          >
            <>
              {bib.itemTables.map((itemTableData) => (
                <SearchResultItems
                  itemTableData={itemTableData}
                  key={`search-results-item-${itemTableData.items[0].id}`}
                />
              ))}
            </>
          </SimpleGrid>
        )}
      </CardContent>
      {bib.showViewAllItemsLink() && (
        <CardActions
          sx={{
            paddingTop: "s",
            paddingBottom: "s",
            borderTop: "1px dashed var(--nypl-colors-ui-bg-active)",
          }}
        >
          <Link
            href={`${bib.url}#item-table`}
            fontSize={{
              base: "mobile.body.body2",
              md: "desktop.body.body2",
            }}
            fontWeight="medium"
            variant="standalone"
          >
            {`View all ${bib.getNumItemsMessage()} `}
          </Link>
        </CardActions>
      )}
    </Card>
  )
}

export default SearchResult
