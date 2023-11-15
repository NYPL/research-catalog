import {
  Card,
  CardContent,
  CardHeading,
  Box,
  Text,
} from "@nypl/design-system-react-components"

import RCLink from "../RCLink/RCLink"
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
        paddingBottom: "m",
      }}
    >
      <CardHeading level="h3" size="heading4">
        <RCLink href={`${PATHS.BIB}/${bib.id}`}>{bib.title}</RCLink>
      </CardHeading>
      <CardContent>
        <Box sx={{ p: { display: "inline", marginRight: "s" } }}>
          {bib.materialType && <Text>{bib.materialType}</Text>}
          {bib.publicationStatement && <Text>{bib.publicationStatement}</Text>}
          {bib.yearPublished && <Text>{bib.yearPublished}</Text>}
          <Text>{bib.itemMessage}</Text>
          <ItemTable
            items={bib.items}
            isArchiveCollection={bib.isArchiveCollection}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default SearchResult
