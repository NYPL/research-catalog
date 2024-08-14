import { useRef, useState } from "react"
import {
  Card,
  CardContent,
  CardHeading,
  Button,
  Icon,
  List,
  Box,
} from "@nypl/design-system-react-components"

import { ELECTRONIC_RESOURCES_PER_BIB_PAGE } from "../../config/constants"
import ExternalLink from "../Links/ExternalLink/ExternalLink"
import type { ElectronicResource } from "../../types/bibTypes"

interface ElectronicResourcesProps {
  electronicResources: ElectronicResource[]
  isTestMode?: boolean
}

/**
 * ElectronicResources renders a list of electronic resources links, sans aeon links
 */
const ElectronicResources = ({
  electronicResources,
  isTestMode = false,
}: ElectronicResourcesProps) => {
  const [showMore, setShowMore] = useState(true)
  const [electronicResourcesToDisplay, setElectronicResourcesToDisplay] =
    useState(
      electronicResources &&
        electronicResources.slice(0, ELECTRONIC_RESOURCES_PER_BIB_PAGE)
    )
  const scrollToRef = useRef<null | HTMLDivElement>(null)

  if (!electronicResources || !electronicResources.length) {
    return null
  }

  const eResourcesList = electronicResourcesList(electronicResourcesToDisplay)

  const onClick = () => {
    if (!isTestMode && scrollToRef.current)
      scrollToRef.current?.scrollIntoView({ behavior: "smooth" })
    setShowMore((prev) => {
      setElectronicResourcesToDisplay(
        prev
          ? electronicResources
          : electronicResources.slice(0, ELECTRONIC_RESOURCES_PER_BIB_PAGE)
      )
      return !prev
    })
  }

  return (
    <Card
      ref={scrollToRef}
      isBordered
      mt="l"
      data-testid="electronic-resources"
    >
      <CardHeading level="three">Available Online</CardHeading>
      <CardContent aria-expanded={!showMore}>
        {eResourcesList}
        {electronicResources.length > ELECTRONIC_RESOURCES_PER_BIB_PAGE ? (
          <Button
            id="see-more-eresources-button"
            p={0}
            onClick={onClick}
            buttonType="link"
            aria-expanded={!showMore}
            fontWeight="bold"
          >
            View {showMore ? `all ${electronicResources.length}` : "fewer"}{" "}
            Available Online resources
            <Icon
              ml="xs"
              iconRotation={`rotate${showMore ? 0 : 180}`}
              name="arrow"
              size="small"
            />
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}

/**
 * Renders a single electronic resource link
 */
const electronicResourceLink = ({
  url,
  title,
  prefLabel,
}: ElectronicResource) => (
  <ExternalLink href={url} py="x">
    <Box as="span" display="inline-block" my="xxs">
      {title || prefLabel || url}
    </Box>
  </ExternalLink>
)

/**
 * Renders an unordered list of electronic resources links
 */
const electronicResourcesList = (electronicResources: ElectronicResource[]) => {
  // If there is only one electronic resource, then
  // just render a single anchor element.
  if (electronicResources.length === 1) {
    const electronicItem = electronicResources[0]
    return electronicResourceLink({
      url: electronicItem.url,
      title: electronicItem.title || electronicItem.prefLabel,
    })
  }

  // Otherwise, create a list of anchors.
  return (
    <List
      type="ul"
      noStyling
      m={0}
      listItems={electronicResources.map((resource) =>
        electronicResourceLink({
          url: resource.url,
          title: resource.title || resource.prefLabel,
        })
      )}
    />
  )
}

export default ElectronicResources
