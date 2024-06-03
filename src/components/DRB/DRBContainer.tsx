import {
  Card,
  CardHeading,
  CardContent,
  Text,
  SimpleGrid,
  Box,
} from "@nypl/design-system-react-components"
import Image from "next/image"

import { appConfig } from "../../config/config"
import ExternalLink from "../Links/ExternalLink/ExternalLink"
import DRBCard from "./DRBCard"
import type DRBResult from "../../models/DRBResult"
import type { SearchParams } from "../../types/searchTypes"
import { getDRBQueryStringFromSearchParams } from "../../utils/drbUtils"
import { DRB_BASE_URL } from "../../config/constants"
import drbPromoImage from "../../client/assets/drb_promo.png"

interface DRBContainerProps {
  drbResults: DRBResult[]
  totalWorks: number
  // TODO: Get these from context when SearchParamsContext is added
  searchParams: SearchParams
}

/**
 * The DRBContainer fetches and displays DRBContainer search results
 */
const DRBContainer = ({
  drbResults,
  totalWorks,
  searchParams,
}: DRBContainerProps) => {
  const drbQuery = getDRBQueryStringFromSearchParams(searchParams)
  const hasResults = totalWorks > 0
  return (
    <Card
      id="drb-sidebar-container"
      backgroundColor="ui.bg.default"
      p="s"
      borderRadius="5px"
    >
      <CardHeading size="h6" id="drb-sidebar-container-heading">
        {hasResults
          ? "Results from Digital Research Books Beta"
          : "No results found from Digital Research Books Beta"}
      </CardHeading>
      <CardContent id="drb-sidebar-container-content">
        <Box mb="s">
          <Text size="body2" mb="xxs">
            Digital books for research from multiple sources worldwide - all
            free to read, download, and keep. No library card required.
          </Text>
          <Text size="body2">
            <ExternalLink href={appConfig.urls.drbAbout} size="body2">
              Read more about the project
            </ExternalLink>
          </Text>
        </Box>

        {hasResults ? (
          <>
            <SimpleGrid columns={1} gap="grid.s" pb="s">
              {drbResults.map((result: DRBResult) => (
                <DRBCard key={result.id} drbResult={result} />
              ))}
            </SimpleGrid>
            <ExternalLink
              href={`${DRB_BASE_URL}/search${drbQuery}`}
              fontSize={{
                base: "mobile.body.body2",
                md: "desktop.body.body2",
              }}
              type="standalone"
              fontWeight="bold"
            >
              <>
                View {totalWorks === 1 ? "" : "all"}{" "}
                {totalWorks.toLocaleString()} result
                {totalWorks === 1 ? "" : "s"} in Digital Research Books Beta
              </>
            </ExternalLink>
          </>
        ) : (
          <>
            <ExternalLink
              href={appConfig.urls.drbAbout}
              aria-label="Explore Digital Research Books Beta"
            >
              <Box mb="xs" bg="ui.white" p="s" borderRadius="5px">
                <Image
                  src={drbPromoImage}
                  alt="Image of three Digital Research Books"
                />
              </Box>
            </ExternalLink>
            <ExternalLink
              href={appConfig.urls.drbAbout}
              fontSize={{
                base: "mobile.body.body2",
                md: "desktop.body.body2",
              }}
              type="standalone"
              fontWeight="bold"
            >
              Explore Digital Research Books Beta
            </ExternalLink>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default DRBContainer
