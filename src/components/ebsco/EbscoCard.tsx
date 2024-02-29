import {
  Card,
  CardContent,
  Text,
  Link as DSLink,
} from "@nypl/design-system-react-components"
import RCLink from "../RCLink/RCLink"

/**
 */
const EbscoCard = ({ ebscoResult }) => {
  const description = `${ebscoResult.type} from ${ebscoResult.db}`

  return (
    <Card backgroundColor="ui.white" p="xs">
      <CardContent>
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

        {description && <Text size="body2">{description}</Text>}

        {ebscoResult.fullTextUrl && (
          <>
            <RCLink href={ebscoResult.fullTextUrl} type="buttonSecondary">
              Read online
            </RCLink>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default EbscoCard
