import { Card, CardContent, Text } from "@nypl/design-system-react-components"

import RCLink from "../RCLink/RCLink"
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
    <Card
      backgroundColor="var(--nypl-colors-ui-bg-default)"
      sx={{
        padding: "var(--nypl-space-xs)",
      }}
    >
      <CardContent>
        <RCLink href={drbResult.url}>
          <Text size="body2" noSpace isBold>
            {drbResult.title}
          </Text>
        </RCLink>

        {drbResult?.authors && (
          <Text size="body2" noSpace>
            By{" "}
            {drbResult.authors.map((author: Author | Agent, index: number) => (
              <>
                {index > 0 && ","}
                <RCLink href={getAuthorURL(author)}>{author.name}</RCLink>
              </>
            ))}
          </Text>
        )}
      </CardContent>
    </Card>
  )
}

export default DRBCard
