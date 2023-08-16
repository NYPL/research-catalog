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

  useEffect(() => {
    fetch(BASE_URL + "/api/drb?" + drbQuery)
      .then((results) => results.json())
      .then((data) => setDrbResults(data))
  }, [drbQuery])

  return (
    <div>
      <Heading>Results from Digital Research Books Beta</Heading>
      {drbResults?.works &&
        drbResults.works.map((drbWork) => (
          <div className="user" key={Math.random()}>
            {drbWork.title}
          </div>
        ))}
    </div>
  )
}

export default DRBContainer
