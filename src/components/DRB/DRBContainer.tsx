import {
  Card,
  CardHeading,
  CardContent,
  Text,
  SimpleGrid,
  Link as DSLink,
} from "@nypl/design-system-react-components"
import useSWRImmutable from "swr/immutable"

import { appConfig } from "../../config/config"
import RCLink from "../RCLink/RCLink"
import DRBResult from "./DRBResult"
import styles from "../../../styles/components/DRB.module.scss"
import { BASE_URL } from "../../config/constants"
import type { SearchParams } from "../../types/searchTypes"
import type { DRBWork } from "../../types/drbTypes"
import { getQueryString } from "../../utils/searchUtils"
import { getDRBQueryStringFromSearchParams } from "../../utils/drbUtils"

interface DRBProps {
  searchParams: SearchParams
}

/**
 * The DRBContainer fetches and displays DRBContainer search results
 */
const DRBContainer = ({ searchParams }: DRBProps) => {
  const searchQuery = getQueryString(searchParams)
  const drbUrl = `${BASE_URL}/api/drb?${searchQuery}`
  const drbQuery = getDRBQueryStringFromSearchParams(searchParams)
  const fetcher = (url: string) => fetch(url).then((res) => res.json())

  const { data, error, isValidating } = useSWRImmutable(drbUrl, fetcher)

  return isValidating ? (
    <Card className={styles.drbContainer}>
      <CardContent>Loading</CardContent>
    </Card>
  ) : (
    <Card isBordered className={styles.drbContainer}>
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
        {!error && data.works ? (
          <>
            <SimpleGrid columns={1} gap="s" pb="s">
              {data.works.map(
                (work: DRBWork) =>
                  work?.uuid &&
                  work?.title && <DRBResult key={work.uuid} work={work} />
              )}
            </SimpleGrid>
            {data.totalWorks && (
              <DSLink
                href={`${
                  appConfig.externalUrls.drbFrontEnd[appConfig.environment]
                }/search${drbQuery}`}
                target="_blank"
              >
                <Text size="body2" noSpace isBold>
                  See {data.totalWorks.toLocaleString()} result
                  {data.totalWorks === 1 ? "" : "s"} from Digital Research Books
                  Beta
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
