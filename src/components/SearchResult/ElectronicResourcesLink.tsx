import {
  Box,
  Heading,
  Text,
  Icon,
  Link as DSLink,
} from "@nypl/design-system-react-components"

import RCLink from "../RCLink/RCLink"
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
    <Box>
      <Heading level="four" size="callout" mb="xxs">
        Available Online
      </Heading>
      {electronicResources.length === 1 ? (
        <DSLink
          href={electronicResources[0].url}
          target="_blank"
          rel="noreferrer"
        >
          {electronicResources[0].prefLabel || electronicResources[0].url}
        </DSLink>
      ) : (
        <RCLink href={`${bibUrl}#electronic-resources`} type="standalone">
          See All Available Online Resources
        </RCLink>
      )}
    </Box>
  )
}

export default ElectronicResourcesLink
