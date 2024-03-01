import {
  Card,
  CardContent,
  StatusBadge,
  Text,
  Link as DSLink,
} from "@nypl/design-system-react-components"

/**
 */
const EbscoCard = ({ ebscoResult }) => {
  return (
    <Card backgroundColor="ui.white" p="xs">
      <CardContent>
        {ebscoResult.isFeatured && (
          <StatusBadge level="high">Featured result</StatusBadge>
        )}

        {ebscoResult.type && <Text size="body2">{ebscoResult.type}</Text>}

        <DSLink href={ebscoResult.url} target="_blank" isUnderlined={false}>
          <Text size="body2">{ebscoResult.title}</Text>
        </DSLink>

        {ebscoResult.authors && (
          <Text size="body2">
            By{" "}
            {ebscoResult.authors.map((author, index: number) => (
              <>
                {index > 0 && ","}
                <DSLink
                  href={`https://research-ebsco-com.i.ezproxy.nypl.org/c/2styhb/search/results?initiatedBy=typed-in&q=AR%20%22${author}%22`}
                  target="_blank"
                  isUnderlined={false}
                >
                  {author}
                </DSLink>
              </>
            ))}
          </Text>
        )}

        {ebscoResult.fullTextUrl && (
          <>
            <DSLink
              href={ebscoResult.fullTextUrl}
              type="buttonSecondary"
              target="_blank"
            >
              Read online
            </DSLink>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default EbscoCard
