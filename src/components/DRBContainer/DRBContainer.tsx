import { Heading } from "@nypl/design-system-react-components"
import useSWRImmutable from "swr/immutable"

import { BASE_URL, DRB_API_SEARCH_ROUTE } from "../../config/constants"
import type { SearchParams } from "../../types/searchTypes"
import type { DRBWork } from "../../types/drbTypes"
import { getSearchQuery } from "../../utils/searchUtils"

interface DRBContainerProps {
  searchParams: SearchParams
}

/**
 * The DRBContainer fetches and displays DRB search results
 */
const DRBContainer = ({ searchParams }: DRBContainerProps) => {
  const searchQuery = getSearchQuery(searchParams)
  const drbUrl = `${BASE_URL}${DRB_API_SEARCH_ROUTE}?${searchQuery}`
  const fetcher = (url: string) => fetch(url).then((res) => res.json())

  const { data, error, isValidating } = useSWRImmutable(drbUrl, fetcher)

  return isValidating ? (
    <div>Loading</div>
  ) : (
    <div>
      <Heading>Results from Digital Research Books Beta</Heading>
      {!error && data?.works ? (
        data.works.map((drbWork: DRBWork) => (
          <div key={drbWork.uuid}>{drbWork.title}</div>
        ))
      ) : (
        <div>There was an error getting DRB results. Please try again.</div>
      )}
    </div>
  )
}

export default DRBContainer
