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
import type { ElectronicResource } from "../../types/bibTypes"
import Link from "../Link/Link"

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
      data-testid="electronic-resources"
      bg="ui.bg.default"
      p="s"
      marginBottom="s"
      borderRadius="8px"
    >
      <CardHeading level="four" size="body1" mb="xs">
        Available online
      </CardHeading>
      <CardContent aria-expanded={!showMore}>
        <List
          variant="ul"
          mb="0"
          noStyling
          listItems={electronicResourcesToDisplay.map((resource) => (
            <Link
              isExternal
              href={resource.url}
              key={kebabCase(resource.title)}
              variant="standalone"
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
            </Link>
          ))}
        />
        {electronicResources.length > ELECTRONIC_RESOURCES_PER_BIB_PAGE ? (
          <Button
            id="see-more-eresources-button"
            data-testid="see-more-eresources-button"
            p={0}
            mt="s"
            onClick={onClick}
            variant="text"
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
