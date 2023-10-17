import {
  Card,
  CardContent,
  Text,
  Link as DSLink,
} from "@nypl/design-system-react-components"
import type SearchResultsBib from "../../models/SearchResultsBib"

interface SearchResultProps {
  bib: SearchResultsBib
}

/**
 * The SearchResult component displays a single search result element.
 */
const SearchResult = ({ bib }: SearchResultProps) => {
  return (
    <Card>
      <CardContent>
        <DSLink href="/">
          <Text size="subtitle1">{bib.title}</Text>
        </DSLink>
      </CardContent>
    </Card>
  )
}

export default SearchResult
