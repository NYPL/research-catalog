import {
  Card,
  CardContent,
  CardHeading,
} from "@nypl/design-system-react-components"
import RCLink from "../Links/RCLink/RCLink"
import ExternalLink from "../Links/ExternalLink/ExternalLink"
import type { ElectronicResource } from "../../types/bibTypes"

interface ElectronicResourcesLinkProps {
  bibUrl: string
  electronicResources: ElectronicResource[]
}

const ElectronicResourcesLink = ({
  bibUrl,
  electronicResources,
}: ElectronicResourcesLinkProps) => {
  return (
    <Card isBordered data-testid="electronic-resources-link">
      <CardHeading level="four" size="body1" mb="xs">
        Available online
      </CardHeading>
      <CardContent>
        {electronicResources.length === 1 ? (
          <ExternalLink
            href={electronicResources[0].url}
            rel="noreferrer"
            type="standalone"
            fontSize={{ base: "mobile.body.body2", md: "desktop.body.body2" }}
            isUnderlined={false}
            hasVisitedState={false}
          >
            {electronicResources[0].prefLabel || electronicResources[0].url}
          </ExternalLink>
        ) : (
          <RCLink
            href={`${bibUrl}#electronic-resources`}
            type="standalone"
            fontSize={{ base: "mobile.body.body2", md: "desktop.body.body2" }}
            isUnderlined={false}
            hasVisitedState={false}
          >
            View all available online resources
          </RCLink>
        )}
      </CardContent>
    </Card>
  )
}

export default ElectronicResourcesLink
