import { Box, Text } from "@nypl/design-system-react-components"

import RCLink from "../Links/RCLink/RCLink"
import ExternalLink from "../Links/ExternalLink/ExternalLink"
import type { ElectronicResource } from "../../types/bibTypes"

interface ElectronicResourcesLinkProps {
  bibUrl?: string
  electronicResources: ElectronicResource[]
  inSearchResults?: boolean
}

/**
 * The SearchResult component displays a single search result element.
 */
const ElectronicResourcesLink = ({
  bibUrl,
  electronicResources,
  inSearchResults = true,
}: ElectronicResourcesLinkProps) => {
  const wrapperStyles = inSearchResults
    ? {}
    : { border: "1px solid var(--nypl-colors-ui-border-default)", padding: "s" }
  return (
    <Box mt={inSearchResults ? "l" : "s"} sx={wrapperStyles}>
      <Text
        mb="xxs"
        fontSize={{ base: "mobile.body.body1", md: "desktop.body.body1" }}
        fontWeight="bold"
      >
        Available Online
      </Text>
      {electronicResources.length === 1 ? (
        <ExternalLink
          href={electronicResources[0].url}
          rel="noreferrer"
          type="standalone"
          fontSize={{ base: "mobile.body.body2", md: "desktop.body.body2" }}
          fontWeight="bold"
          isUnderlined={false}
        >
          {electronicResources[0].prefLabel || electronicResources[0].url}
        </ExternalLink>
      ) : (
        <RCLink
          href={`${bibUrl}#electronic-resources`}
          type="standalone"
          fontSize={{ base: "mobile.body.body2", md: "desktop.body.body2" }}
          fontWeight="medium"
          isUnderlined={false}
          hasVisitedState={false}
        >
          View all available online resources
        </RCLink>
      )}
    </Box>
  )
}

export default ElectronicResourcesLink
