import { Box } from "@nypl/design-system-react-components"
import Link from "../Link/Link"
import { PATHS } from "../../config/constants"

const SearchSuggestions = ({ suggestions }: { suggestions: any[] }) => {
  return (
    <Box style={{ marginBottom: "20px" }}>
      Did you mean&nbsp;
      {suggestions.map((suggestion, i) => {
        const key = i
        const query = suggestion.query
        return (
          <span key={key}>
            {i > 0 && <span> or </span>}
            <Link href={`${PATHS.SEARCH}?${query}`}>
              <span
                dangerouslySetInnerHTML={{ __html: suggestion.highlighted }}
              />
            </Link>
          </span>
        )
      })}
      ?
    </Box>
  )
}

export default SearchSuggestions
