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
    <Card ref={scrollToRef} isBordered data-testid="electronic-resources">
      <CardHeading level="four" size="body1" mb="xs">
        Available online
      </CardHeading>
      <CardContent aria-expanded={!showMore}>
        <List
          type="ul"
          mb="0"
          noStyling
          listItems={electronicResourcesToDisplay.map((resource) => (
            <ExternalLink
              href={resource.url}
              key={kebabCase(resource.title)}
              type="standalone"
            >
              <Box
                as="span"
                display="inline-block"
                fontSize={{
                  base: "mobile.body.body2",
                  md: "desktop.body.body2",
                }}
              >
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
            mt="s"
            onClick={onClick}
            buttonType="link"
            aria-expanded={!showMore}
            fontWeight="bold"
            sx={{ textDecoration: "none", height: "auto" }}
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
