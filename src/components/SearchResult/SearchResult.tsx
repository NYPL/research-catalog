import {
  Card,
  CardContent,
  Link as DSLink,
  CardHeading,
  Box,
  Text,
} from "@nypl/design-system-react-components"

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
        <DSLink href={`${PATHS.BIB}/${bib.id}`} isUnderlined={false}>
          {bib.title}
        </DSLink>
      </CardHeading>
      <CardContent>
        <Box sx={{ p: { display: "inline", marginRight: "s" } }}>
          {bib.materialType && <Text>{bib.materialType}</Text>}
          {bib.publicationStatement && <Text>{bib.publicationStatement}</Text>}
          {bib.yearPublished && <Text>{bib.yearPublished}</Text>}
          <Text>{bib.itemMessage}</Text>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SearchResult
