import {
  Card,
  CardContent,
  Text,
  Icon,
  Link as DSLink,
} from "@nypl/design-system-react-components"

import type DRBResult from "../../models/DRBResult"
import { getAuthorURL } from "../../utils/drbUtils"
import type { Author, Agent } from "../../types/drbTypes"

interface DRBCardProps {
  drbResult: DRBResult
}

/**
 * The DRBContainer fetches and displays DRBContainer search results
 */
const DRBCard = ({ drbResult }: DRBCardProps) => {
  if (!drbResult) return null

  return (
    <Card backgroundColor="ui.bg.default" p="xs">
      <CardContent>
        <DSLink
          href={drbResult.url}
          target="_blank"
          isUnderlined={false}
          fontSize="desktop.body.body2"
          display="inline-block"
          mb="s"
          lang={drbResult.language}
        >
          {drbResult.title}
        </DSLink>

        {drbResult?.authors.length > 0 ? (
          <Text size="body2">
            By{" "}
            {drbResult.authors.map((author: Author | Agent, index: number) => (
              <>
                {index > 0 && ","}
                <DSLink
                  href={getAuthorURL(author)}
                  target="_blank"
                  isUnderlined={false}
                >
                  {author.name}
                </DSLink>
              </>
            ))}
          </Text>
        ) : null}

        {drbResult.readOnlineUrl && (
          <DSLink
            href={drbResult.readOnlineUrl}
            aria-label={`Read Online, ${drbResult.title}`}
            target="_blank"
            type="buttonPrimary"
            mb={drbResult.readOnlineUrl ? "s" : ""}
            isUnderlined={false}
          >
            Read Online
          </DSLink>
        )}

        {drbResult.downloadLink && (
          <DSLink
            href={drbResult.downloadLink?.url}
            target="_blank"
            type="buttonPrimary"
            isUnderlined={false}
            fontSize="desktop.body.body2"
          >
            <>
              <Icon name="download" align="left" size="small" />
              Download {drbResult.downloadLink?.mediaType || ""}
            </>
          </DSLink>
        )}
      </CardContent>
    </Card>
  )
}

export default DRBCard
