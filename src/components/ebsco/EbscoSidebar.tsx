import {
  Card,
  CardHeading,
  CardContent,
  Text,
  SimpleGrid,
  Link as DSLink,
} from "@nypl/design-system-react-components"
import EbscoCard from "./EbscoCard"

const EbscoSidebar = ({ results }) => {
  // https://research-ebsco-com.i.ezproxy.nypl.org/c/2styhb/search/results?query-1=AND,q%3dtoast&sort=relevance&includefacets=y&searchmode=all&autosuggest=n&autocorrect=n&view=brief&resultsperpage=20&pagenumber=1&highlight=y&includeimagequickview=n
  if (!results?.queryString) return null

  const queryString = results.queryString.replace("query-1=AND,", "q=")

  return (
    <Card isBordered>
      <CardHeading level="h3">Results from Article Search</CardHeading>
      <CardContent>
        <Text size="body2">
          Results include journals &amp; books available from home with your
          library card.
        </Text>
        <SimpleGrid columns={1} gap="s" pb="s">
          {results.records.map((result) => (
            <EbscoCard key={result.id} ebscoResult={result} />
          ))}
        </SimpleGrid>
        {results.total && (
          <DSLink
            href={`https://research-ebsco-com.i.ezproxy.nypl.org/c/2styhb/search/results?${queryString}`}
            target="_blank"
            isUnderlined={false}
          >
            <Text size="body2" noSpace isBold>
              See {results.total.toLocaleString()} result
              {results.total === 1 ? "" : "s"} from Article Search
            </Text>
          </DSLink>
        )}
      </CardContent>
    </Card>
  )
}

export default EbscoSidebar
