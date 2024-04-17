import {
  Card,
  CardContent,
  Text,
  Icon,
  Box,
  Link as DSLink,
  CardHeading,
} from "@nypl/design-system-react-components"

import type DRBResult from "../../models/DRBResult"
import { getAuthorURL } from "../../utils/drbUtils"
import type { Author, Agent } from "../../types/drbTypes"
import { textDecoration } from "@chakra-ui/styled-system"
import { BASE_URL, PATHS } from "../../config/constants"

interface DRBCardProps {
  drbResult: DRBResult
}

/**
 * The DRBContainer fetches and displays DRBContainer search results
 */
const DRBCard = ({ drbResult }: DRBCardProps) => {
  if (!drbResult) return null

  return (
    <Card backgroundColor="ui.white" p="s" borderRadius="5px">
      <CardHeading
        level="h3"
        size="heading6"
        mb="xs"
        url={drbResult.url}
        fontSize={{
          base: "mobile.subtitle.subtitle2",
          md: "desktop.subtitle.subtitle2",
        }}
        fontWeight="medium"
        lang={drbResult.language !== "en" ? drbResult.language : null}
      >
        {drbResult.title}
      </CardHeading>
      <CardContent>
        {drbResult?.authors?.length > 0 ? (
          <Text size="body2" mb="s">
            <Box as="span" fontSize="desktop.body.body2" fontWeight="medium">
              By
            </Box>{" "}
            {drbResult.authors.map((author: Author | Agent, index: number) => (
              <>
                {index > 0 && ","}
                <DSLink
                  href={getAuthorURL(author)}
                  target="_blank"
                  fontSize="desktop.body.body2"
                  fontWeight="light"
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
            type="buttonSecondary"
            mt="xs"
            isUnderlined={false}
          >
            Read Online
          </DSLink>
        )}

        {drbResult.downloadLink && (
          <DSLink
            href={drbResult.downloadLink?.url}
            target="_blank"
            type="buttonSecondary"
            isUnderlined={false}
            fontSize="desktop.body.body2"
            mt="xs"
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
