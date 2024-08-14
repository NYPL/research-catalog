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

  const resources = renderERLinksList(electronicResourcesToDisplay)

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
    <Card ref={scrollToRef} isBordered mt="l">
      <CardHeading level="three">Available Online</CardHeading>
      <CardContent aria-expanded={!showMore}>
        {resources}
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
 * Builds unordered list of electronic resources links
 */
const renderERLinksList = (electronicResources) => {
  if (!electronicResources) return null
  const electronicResourcesLink = ({ href, label, prefLabel }) => (
    <ExternalLink href={href} py="x">
      <Box as="span" display="inline-block" my="xxs">
        {label || prefLabel || href}
      </Box>
    </ExternalLink>
  )
  // If there is only one electronic resource, then
  // just render a single anchor element.
  if (electronicResources.length === 1) {
    const electronicItem = electronicResources[0]
    return electronicResourcesLink({
      href: electronicItem.url,
      label: electronicItem.label || electronicItem.prefLabel,
    })
  } else {
    // Otherwise, create a list of anchors.
    return (
      <List
        type="ul"
        noStyling
        m={0}
        listItems={electronicResources.map((resource) =>
          electronicResourcesLink({
            href: resource.url,
            label: resource.label || resource.prefLabel,
          })
        )}
      />
    )
  }
}

export default ElectronicResources
