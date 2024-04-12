import {
  Card,
  CardHeading,
  CardContent,
  Text,
  SimpleGrid,
  Link as DSLink,
} from "@nypl/design-system-react-components"

import { appConfig } from "../../config/config"
import RCLink from "../RCLink/RCLink"
import DRBCard from "./DRBCard"
import type DRBResult from "../../models/DRBResult"
import type { SearchParams } from "../../types/searchTypes"
import { getDRBQueryStringFromSearchParams } from "../../utils/drbUtils"
import { DRB_BASE_URL } from "../../config/constants"

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

  return (
    <Card backgroundColor="ui.bg.default" p="s" borderRadius="5px">
      <CardHeading level="h6">
        Results from Digital Research Books Beta
      </CardHeading>
      <CardContent>
        <Text size="body2">
          Digital books for research from multiple sources world wide- all free
          to read, download, and keep. No Library Card is Required.{" "}
          <RCLink href={appConfig.urls.drbAbout}>
            Read more about the project
          </RCLink>
          .
        </Text>
        <SimpleGrid columns={1} gap="grid.s" pb="s">
          {drbResults.map((result: DRBResult) => (
            <DRBCard key={result.id} drbResult={result} />
          ))}
        </SimpleGrid>
        {totalWorks && (
          <DSLink
            href={`${DRB_BASE_URL}/search${drbQuery}`}
            target="_blank"
            fontSize="desktop.body.body2"
            type="standalone"
            fontWeight="bold"
          >
            <>
              View {totalWorks === 1 ? "" : "all"} {totalWorks.toLocaleString()}{" "}
              result
              {totalWorks === 1 ? "" : "s"} in Digital Research Books Beta
            </>
          </DSLink>
        )}
      </CardContent>
    </Card>
  )
}

export default DRBContainer
