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
  Flex,
} from "@nypl/design-system-react-components"
import Link from "../Link/Link"
import ElectronicResourcesLink from "./ElectronicResourcesLink"
import type SearchResultsBib from "../../models/SearchResultsBib"
import { PATHS } from "../../config/constants"
import FindingAid from "../BibPage/FindingAid"
import SearchResultItems from "./SearchResultItems"
import { ManageBibInList } from "../List/ManageBibInList"
import { StatusBanner } from "../MyAccount/Settings/StatusBanner"
import type { StatusBannerState } from "../MyAccount/Settings/StatusBanner"
import { useState } from "react"
import { idConstants } from "../../context/FocusContext"
import { FeaturePopup } from "../Banners/FeaturePopup"

interface SearchResultProps {
  bib: SearchResultsBib
  isAuthenticated: boolean
  isFirstResult?: boolean
}

/**
 * The SearchResult component displays a single search result element.
 */
const SearchResult = ({
  bib,
  isAuthenticated,
  isFirstResult,
}: SearchResultProps) => {
  const separatingDot = (i) => (
    // @ts-ignore
    <Icon key={`dot-${i}`} size="xxsmall" ml="xs" mr="xs" pb="xxs">
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
    bib.getNumItemsMessage(),
  ].filter(Boolean)

  const joinedMetadata = metadata.reduce((acc, piece, i) => {
    if (i > 0) acc.push(separatingDot(i))
    acc.push(<Text key={i}>{piece}</Text>)
    return acc
  }, [])

  // Manage status banner display for list actions
  const [status, setStatus] = useState<StatusBannerState | null>(null)

  return (
    <Card
      key={bib.id}
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
      <CardContent data-testid="card-content">
        <Flex flexDir="row" justifyContent="space-between" alignItems="center">
          <CardHeading
            level="h3"
            size="heading5"
            sx={{ a: { textDecoration: "none" } }}
          >
            <Box>
              {bib.findingAid && (
                <StatusBadge variant="informative" mb="s">
                  Finding aid available
                </StatusBadge>
              )}
              <Link href={`${PATHS.BIB}/${bib.id}`}>{bib.titleDisplay}</Link>
            </Box>
          </CardHeading>
          <Box position="relative">
            {isFirstResult && (
              <Box
                position="absolute"
                sx={{
                  bottom: "100%",
                  right: -10,
                  zIndex: "100",
                }}
              >
                <FeaturePopup
                  id="listPopup"
                  title="Save to lists"
                  content="You can now save records to one or more lists. Lists can be found and managed in the 'Lists' tab in your patron account."
                  pointerRight="50px"
                />
              </Box>
            )}
            <ManageBibInList
              recordId={bib.id}
              isAuthenticated={isAuthenticated}
              setStatus={setStatus}
            />
          </Box>
        </Flex>
        <Box
          sx={{
            div: { display: "inline-block" },
            p: { display: "inline-block" },
          }}
        >
          {joinedMetadata}
        </Box>
        <div
          tabIndex={-1}
          id={`${idConstants.listStatusBanner}-${bib.id}`}
          style={{ marginTop: "24px" }}
        >
          {status && (
            <StatusBanner type={status.type} message={status.message} />
          )}
        </div>
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
              "& > *:first-of-type table": {
                borderTop: "none !important",
                paddingTop: "xs !important",
              },
              paddingBottom: bib.showViewAllItemsLink() ? "s" : "m",
            }}
          >
            {bib.itemTables.map((itemTableData) => (
              <SearchResultItems
                itemTableData={itemTableData}
                key={`search-results-item-${itemTableData.items[0].id}`}
              />
            ))}
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
