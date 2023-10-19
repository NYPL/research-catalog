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
    <Card>
      <CardHeading level="three">
        <DSLink href={`${PATHS.BIB}/${bib.id}`}>{bib.title}</DSLink>
      </CardHeading>
      <CardContent>
        <Box>
          {bib.materialType && <Text>{bib.materialType}</Text>}
          {bib.publicationStatement && <Text>{bib.publicationStatement}</Text>}
          {bib.yearPublished && <Text>{bib.yearPublished}</Text>}
          {bib.itemMessage.length && <Text>{bib.itemMessage}</Text>}
        </Box>
      </CardContent>
    </Card>
  )
}

export default SearchResult
