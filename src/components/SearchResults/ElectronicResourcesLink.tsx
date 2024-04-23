import { Box, Text, Link as DSLink } from "@nypl/design-system-react-components"

import RCLink from "../Links/RCLink/RCLink"
import { BASE_URL } from "../../config/constants"
import type { ElectronicResource } from "../../types/bibTypes"

interface ElectronicResourcesLinkProps {
  bibUrl?: string
  electronicResources: ElectronicResource[]
}

/**
 * The SearchResult component displays a single search result element.
 */
const ElectronicResourcesLink = ({
  bibUrl,
  electronicResources,
}: ElectronicResourcesLinkProps) => {
  return (
    <Box mt="s">
      <Text
        mb="xxs"
        fontSize={{ base: "mobile.body.body1", md: "desktop.body.body1" }}
        fontWeight="bold"
      >
        Available Online
      </Text>
      {electronicResources.length === 1 ? (
        <DSLink
          href={electronicResources[0].url}
          target="_blank"
          rel="noreferrer"
          type="standalone"
          fontSize={{ base: "mobile.body.body2", md: "desktop.body.body2" }}
          fontWeight="bold"
          isUnderlined={false}
          hasVisitedState={false}
        >
          {electronicResources[0].prefLabel || electronicResources[0].url}
        </DSLink>
      ) : (
        <RCLink
          href={`${BASE_URL}${bibUrl}#electronic-resources`}
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