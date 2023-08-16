import type { NextApiRequest, NextApiResponse } from "next"

import type { SearchParams } from "../../src/types/searchTypes"
import type { DRBResultsResponse } from "../../src/types/drbTypes"
import nyplApiClient from "../../src/server/nyplApiClient/index"
import { DRB_API_NAME } from "../../src/config/constants"
import { getDRBQueryStringFromSearchParams } from "../../src/utils/drbUtils"

export async function fetchDRBResults(
  searchParams: SearchParams
): Promise<DRBResultsResponse | string> {
  const drbQueryString = getDRBQueryStringFromSearchParams(searchParams)

  const drbCall = nyplApiClient({ apiName: DRB_API_NAME }).then((client) =>
    client.get(drbQueryString)
  )

  // Return a promise resolving the DRB API response and the query string used
  return drbCall.then(({ data }) => {
    return {
      response: data,
      researchNowQueryString: drbQueryString,
    }
  })
}

/**
 * Default API route handler for ResearchNow DRB
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const drbQueryParams = req.query
    const response = await fetchDRBResults(drbQueryParams)
    res.status(200).json(response)
  }
}

export default handler
