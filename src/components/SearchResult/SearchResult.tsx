import {
  Card,
  CardContent,
  Link as DSLink,
  CardHeading,
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
        <ul></ul>
      </CardContent>
    </Card>
  )
}

export default SearchResult
