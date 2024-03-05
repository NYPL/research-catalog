import {
  Card,
  CardHeading,
  CardContent,
  Text,
  SimpleGrid,
  Link as DSLink,
} from "@nypl/design-system-react-components"
import EbscoCard from "./EbscoCard"

const EbscoSidebar = ({ results, showCount = 10, publicationSuggestion }) => {
  if (!results?.queryString) return null

  const queryString = results.queryString.replace("query-1=AND,", "q=")

  const publicationAsResult = publicationSuggestion && {
    type: publicationSuggestion.publicationType,
    isFeatured: true,
    title: publicationSuggestion.publicationTitle,
    authors: null,
    fullTextUrl: `https://research-ebsco-com.i.ezproxy.nypl.org/c/2styhb/search/publication-results?id=&limiters=None&${queryString}`,
  }

  const adjustedShowCount = showCount - (publicationSuggestion ? 1 : 0)

  return (
    <Card isBordered background="ui.gray.x-light-cool" marginBottom="1em">
      <CardHeading level="h3">Results from Article Search</CardHeading>
      <CardContent>
        <Text size="body2">
          Results include journals &amp; books available from home with your
          library card.
        </Text>
        <SimpleGrid columns={1} gap="s" pb="s">
          {(publicationSuggestion && (
            <EbscoCard
              key={publicationSuggestion.publicationId}
              ebscoResult={publicationAsResult}
            />
          )) ||
            null}
          {results.records.slice(0, adjustedShowCount).map((result) => (
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
