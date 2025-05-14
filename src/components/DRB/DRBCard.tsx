import {
  Card,
  CardContent,
  Text,
  Icon,
  Box,
  CardHeading,
} from "@nypl/design-system-react-components"

import ExternalLink from "../Links/ExternalLink/ExternalLink"
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

  const handleReadOnlineGAEvent = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "read_online",
        item_title: drbResult.title,
        item_author: drbResult.authors?.map((author) => author.name).join(","),
        read_online_url: drbResult.readOnlineUrl,
      })
    }
  }

  return (
    <Card backgroundColor="ui.white" p="s" borderRadius="5px">
      <CardHeading
        level="h3"
        size="heading6"
        mb="0"
        sx={{ a: { textDecoration: "none" } }}
      >
        <ExternalLink
          href={drbResult.url}
          fontSize={{
            base: "mobile.subtitle.subtitle2",
            md: "desktop.subtitle.subtitle2",
          }}
          display="inline-block"
          mb="xs"
          lang={drbResult.language !== "en" ? drbResult.language : null}
        >
          {drbResult.title}
        </ExternalLink>
      </CardHeading>
      <CardContent>
        {drbResult?.authors?.length > 0 ? (
          <Text size="body2" mb="s">
            <Box
              as="span"
              fontSize={{
                base: "mobile.body.body2",
                md: "desktop.body.body2",
              }}
            >
              By
            </Box>{" "}
            {drbResult.authors.map((author: Author | Agent, index: number) => (
              <span key={`author-${drbResult.id}-${index}`}>
                {index > 0 && ","}
                <ExternalLink
                  href={getAuthorURL(author)}
                  fontSize={{
                    base: "mobile.body.body2",
                    md: "desktop.body.body2",
                  }}
                >
                  {author.name}
                </ExternalLink>
              </span>
            ))}
          </Text>
        ) : null}

        {drbResult.readOnlineUrl && (
          <ExternalLink
            href={drbResult.readOnlineUrl}
            aria-label={`Read Online, ${drbResult.title}`}
            type="buttonSecondary"
            mt="xs"
            isUnderlined={false}
            onClick={() => {
              handleReadOnlineGAEvent()
            }}
          >
            Read Online
          </ExternalLink>
        )}

        {drbResult.downloadLink && (
          <ExternalLink
            href={drbResult.downloadLink?.url}
            type="buttonSecondary"
            isUnderlined={false}
            fontSize={{
              base: "mobile.body.body2",
              md: "desktop.body.body2",
            }}
            mt="xs"
          >
            <>
              <Icon name="download" align="left" size="small" />
              Download {drbResult.downloadLink?.mediaType || ""}
            </>
          </ExternalLink>
        )}
      </CardContent>
    </Card>
  )
}

export default DRBCard
