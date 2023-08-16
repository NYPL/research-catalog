import { useEffect, useState } from "react"
import { Heading } from "@nypl/design-system-react-components"

import { BASE_URL } from "../../config/constants"
import type { SearchParams } from "../../types/searchTypes"
import type { DRBResultsResponse } from "../../types/drbTypes"
import { getQueryString } from "../../utils/searchUtils"

interface DRBContainerProps {
  searchParams: SearchParams
}

/**
 * The DRBContainer fetches and displays DRB search results
 */
const DRBContainer = ({ searchParams }: DRBContainerProps) => {
  const searchQuery = getQueryString(searchParams)
  const [drbResults, setDrbResults] = useState({} as DRBResultsResponse)
  const [drbLoading, setDrbLoading] = useState(true)
  const [drbError, setDrbError] = useState(false)

  useEffect(() => {
    setDrbLoading(true)
    fetch(BASE_URL + "/api/drb?" + searchQuery)
      .then((results) => results.json())
      .then((data) => {
        setDrbLoading(false)
        return setDrbResults(data)
      })
      .catch((error) => {
        console.error(error)
        setDrbLoading(false)
        setDrbError(true)
      })
  }, [searchQuery])

  useEffect(() => {
    console.log("re-render")
  }, [])

  return drbLoading ? (
    <div>Loading</div>
  ) : (
    <div>
      <Heading>Results from Digital Research Books Beta</Heading>
      {!drbError && drbResults?.works ? (
        drbResults.works.map((drbWork) => <>{drbWork.title}</>)
      ) : (
        <div>There was an error getting DRB results. Please try again.</div>
      )}
    </div>
  )
}

export default DRBContainer
