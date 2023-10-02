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

interface DRBProps {
  drbResults: DRBResult[]
  totalWorks: number
  searchParams: SearchParams
}

/**
 * The DRBContainer fetches and displays DRBContainer search results
 */
const DRBContainer = ({ drbResults, totalWorks, searchParams }: DRBProps) => {
  const drbQuery = getDRBQueryStringFromSearchParams(searchParams)

  return (
    <Card isBordered>
      <CardHeading level="three">
        Results from Digital Research Books Beta
      </CardHeading>
      <CardContent>
        <Text size="body2">
          Digital books for research from multiple sources world wide- all free
          to read, download, and keep. No Library Card is Required.{" "}
          <RCLink href={appConfig.externalUrls.drbAbout}>
            Read more about the project
          </RCLink>
          .
        </Text>
        {drbResults?.length ? (
          <>
            <SimpleGrid columns={1} gap="s" pb="s">
              {drbResults.map((result: DRBResult) => (
                <DRBCard key={result.id} drbResult={result} />
              ))}
            </SimpleGrid>
            {totalWorks && (
              <DSLink
                href={`${
                  appConfig.externalUrls.drbFrontEnd[appConfig.environment]
                }/search${drbQuery}`}
                target="_blank"
              >
                <Text size="body2" noSpace isBold>
                  See {totalWorks.toLocaleString()} result
                  {totalWorks === 1 ? "" : "s"} from Digital Research Books Beta
                </Text>
              </DSLink>
            )}
          </>
        ) : (
          <div>There was an error getting DRB results. Please try again.</div>
        )}
      </CardContent>
    </Card>
  )
}

export default DRBContainer
