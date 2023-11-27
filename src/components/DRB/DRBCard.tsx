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
  return (
    <Card backgroundColor="var(--nypl-colors-ui-bg-default)" p="xs">
      <CardContent>
        <DSLink href={drbResult.url} target="_blank" isUnderlined={false}>
          <Text size="body2">{drbResult.title}</Text>
        </DSLink>

        {drbResult?.authors && (
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
        )}

        {drbResult.readOnlineUrl && (
          <DSLink
            href={drbResult.readOnlineUrl}
            target="_blank"
            type="buttonPrimary"
            mb={drbResult.downloadLink ? "s" : ""}
            isUnderlined={false}
          >
            Read Online
          </DSLink>
        )}

        {drbResult.downloadLink && (
          <DSLink
            href={drbResult.downloadLink.url}
            target="_blank"
            isUnderlined={false}
          >
            <Text
              size="body2"
              sx={{ display: "flex", alignItems: "center" }}
              noSpace
            >
              <Icon
                className="more-link"
                name="download"
                align="left"
                size="small"
              />
              Download {drbResult.downloadLink.mediaType || ""}
            </Text>
          </DSLink>
        )}
      </CardContent>
    </Card>
  )
}

export default DRBCard
