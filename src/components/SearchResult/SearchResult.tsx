import {
  Card,
  CardContent,
  CardHeading,
  Box,
  Text,
  CardActions,
  Icon,
} from "@nypl/design-system-react-components"

import RCLink from "../RCLink/RCLink"
import type SearchResultsBib from "../../models/SearchResultsBib"
import { PATHS, ITEMS_PER_SEARCH_RESULT } from "../../config/constants"

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
        {/* Move the code block below to the conditional for rendering the Item Table */}
        {bib.numPhysicalItems > ITEMS_PER_SEARCH_RESULT && (
          <CardActions>
            <RCLink href={`${bib.url}#items-table`}>
              <Text
                isBold
                size="body1"
                noSpace
                sx={{ display: "flex", alignItems: "center" }}
              >
                {`View All ${bib.itemMessage} `}
                <Icon
                  iconRotation="rotate270"
                  name="arrow"
                  size="xsmall"
                  ml="xxs"
                />
              </Text>
            </RCLink>
          </CardActions>
        )}
      </CardContent>
    </Card>
  )
}

export default SearchResult
