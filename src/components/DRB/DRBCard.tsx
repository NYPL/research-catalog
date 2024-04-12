import {
  Card,
  CardContent,
  Text,
  Icon,
  Box,
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
  console.log(drbResult.readOnlineUrl)

  return (
    <Card backgroundColor="ui.white" p="s" borderRadius="5px">
      <CardContent>
        <DSLink
          href={drbResult.url}
          target="_blank"
          isUnderlined={false}
          fontSize="desktop.subtitle.subtitle2"
          fontWeight="medium"
          display="inline-block"
          mb="xs"
        >
          {drbResult.title}
        </DSLink>

        {drbResult?.authors.length > 0 ? (
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
