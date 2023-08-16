import { Heading } from "@nypl/design-system-react-components"

import type { DRBResultsResponse } from "../../types/drbTypes"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../config/constants"

interface DRBContainerProps {
  drbQuery: URLSearchParams
}

/**
 * The DRBContainer fetches and displays DRB search results
 */
const DRBContainer = ({ drbQuery }: DRBContainerProps) => {
  const [drbResults, setDrbResults] = useState({} as DRBResultsResponse)
  const [drbLoading, setDrbLoading] = useState(true)
  const [drbError, setDrbError] = useState(false)

  useEffect(() => {
    setDrbLoading(true)
    fetch(BASE_URL + "/api/drb?" + drbQuery)
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
  }, [drbQuery])

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
