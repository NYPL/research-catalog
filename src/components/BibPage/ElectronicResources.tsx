import { useRef, useState } from "react"
import { kebabCase } from "lodash"
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
      <CardHeading level="three">Available online</CardHeading>
      <CardContent aria-expanded={!showMore}>
        <List
          type="ul"
          noStyling
          m={0}
          listItems={electronicResourcesToDisplay.map((resource) => (
            <ExternalLink
              href={resource.url}
              py="x"
              key={kebabCase(resource.title)}
            >
              <Box as="span" display="inline-block" my="xxs">
                {resource.title || resource.prefLabel || resource.url}
              </Box>
            </ExternalLink>
          ))}
        />
        {electronicResources.length > ELECTRONIC_RESOURCES_PER_BIB_PAGE ? (
          <Button
            id="see-more-eresources-button"
            data-testid="see-more-eresources-button"
            p={0}
            onClick={onClick}
            buttonType="link"
            aria-expanded={!showMore}
            fontWeight="bold"
          >
            View {showMore ? `all ${electronicResources.length}` : "fewer"}{" "}
            available online resources
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

export default ElectronicResources
