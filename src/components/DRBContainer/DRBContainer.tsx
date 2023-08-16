import type { DRBResultsResponse } from "../../types/drbTypes"

interface DRBContainerProps {
  results: DRBResultsResponse
}

/**
 * The DRBContainer fetches and displays DRB search results
 */
const DRBContainer = ({ results }: DRBContainerProps) => {
  return <div>{JSON.stringify(results)}</div>
}

export default DRBContainer
