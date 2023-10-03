import {
  Card,
  CardContent,
  Text,
  Box,
  Link as DSLink,
} from "@nypl/design-system-react-components"

import type DRBResult from "../../models/DRBResult"
import { getAuthorURL } from "../../utils/drbUtils"
import type { Author, Agent } from "../../types/drbTypes"
import DownloadIcon from "../../client/icons/Download"

interface DRBCardProps {
  drbResult: DRBResult
}

/**
 * The DRBContainer fetches and displays DRBContainer search results
 */
const DRBCard = ({ drbResult }: DRBCardProps) => {
  return (
    <Card
      backgroundColor="var(--nypl-colors-ui-bg-default)"
      sx={{
        padding: "var(--nypl-space-xs)",
      }}
    >
      <CardContent>
        <DSLink href={drbResult.url} target="_blank">
          <Text size="body2">{drbResult.title}</Text>
        </DSLink>

        {drbResult?.authors && (
          <Text size="body2">
            By{" "}
            {drbResult.authors.map((author: Author | Agent, index: number) => (
              <>
                {index > 0 && ","}
                <DSLink href={getAuthorURL(author)} target="_blank">
                  {author.name}
                </DSLink>
              </>
            ))}
          </Text>
        )}

        {drbResult?.readOnlineUrl && (
          <DSLink
            href={drbResult.readOnlineUrl}
            target="_blank"
            type="buttonPrimary"
            mb={drbResult?.downloadLink ? "s" : ""}
          >
            Read Online
          </DSLink>
        )}

        {drbResult?.downloadLink && (
          <DSLink href={drbResult.downloadLink.url} target="_blank">
            <Text
              size="body2"
              sx={{ display: "flex", alignItems: "center" }}
              noSpace
            >
              <Box pr="xxs" sx={{ display: "flex", alignItems: "center" }}>
                <DownloadIcon />
              </Box>{" "}
              Download {drbResult.downloadLink.mediaType || ""}
            </Text>
          </DSLink>
        )}
      </CardContent>
    </Card>
  )
}

export default DRBCard
