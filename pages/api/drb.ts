import type { NextApiRequest, NextApiResponse } from "next"

import type { SearchParams } from "../../src/types/searchTypes"
import type { DRBResultsResponse } from "../../src/types/drbTypes"
import nyplApiClient from "../../src/server/nyplApiClient/index"
import { DRB_RESULTS_PER_PAGE, DRB_API_NAME } from "../../src/config/constants"
import { mapQueryToSearchParams } from "../../src/utils/searchUtils"
import { getDRBQueryStringFromSearchParams } from "../../src/utils/drbUtils"

export async function fetchDRBResults(
  searchParams: SearchParams
): Promise<DRBResultsResponse | string> {
  const drbQueryString =
    getDRBQueryStringFromSearchParams(searchParams) +
    `&per_page=${DRB_RESULTS_PER_PAGE.toString()}`

  const drbCall = nyplApiClient({ apiName: DRB_API_NAME }).then((client) =>
    client.get(drbQueryString)
  )

  // Return a promise resolving the DRB API response and the query string used
  return drbCall.then((resp) => {
    return {
      response: resp,
      researchNowQueryString: drbQueryString,
    }
  })
}

/**
 * Default API route handler for ResearchNow DRB
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const searchParams = mapQueryToSearchParams(req.query)
    const response = await fetchDRBResults(searchParams)
    res.status(200).json(response)
  }
}

export default handler
