import {
  Card,
  CardHeading,
  CardContent,
  Text,
  SimpleGrid,
} from "@nypl/design-system-react-components"
import useSWRImmutable from "swr/immutable"

import RCLink from "../RCLink/RCLink"
import styles from "../../../styles/components/DRB.module.scss"
import { BASE_URL, DRB_ABOUT_URL } from "../../config/constants"
import type { SearchParams } from "../../types/searchTypes"
import type { DRBWork } from "../../types/drbTypes"
import { getQueryString } from "../../utils/searchUtils"

interface DRBProps {
  searchParams: SearchParams
}

interface DRBItemProps {
  drbWork: DRBWork
}

/**
 * The DRB fetches and displays DRB search results
 */
const DRB = ({ searchParams }: DRBProps) => {
  const searchQuery = getQueryString(searchParams)
  const drbUrl = `${BASE_URL}/api/drb?${searchQuery}`
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
          <RCLink href={DRB_ABOUT_URL}>Read more about the project</RCLink>.
        </Text>
        {!error && data?.works ? (
          <SimpleGrid columns={1}>
            {data.works.map((drbWork: DRBWork) => (
              <DRBItem key={drbWork.uuid} drbWork={drbWork} />
            ))}
          </SimpleGrid>
        ) : (
          <div>There was an error getting DRB results. Please try again.</div>
        )}
      </CardContent>
    </Card>
  )
}

const DRBItem = ({ drbWork }: DRBItemProps) => {
  const { title } = drbWork
  console.log(drbWork)
  return (
    <Card backgroundColor="var(--nypl-colors-ui-bg-default)">
      <CardContent>
        <RCLink href={""}>{title}</RCLink>
      </CardContent>
    </Card>
  )
}

export default DRB
