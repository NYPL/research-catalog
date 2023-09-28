import type { NextApiRequest, NextApiResponse } from "next"

import type { SearchParams } from "../../src/types/searchTypes"
import type { DRBResultsResponse } from "../../src/types/drbTypes"
import nyplApiClient from "../../src/server/nyplApiClient/index"
import { DRB_API_NAME } from "../../src/config/constants"
import { getDRBQueryStringFromSearchParams } from "../../src/utils/drbUtils"
import { mapQueryToSearchParams } from "../../src/utils/searchUtils"

/**
 * Getter function for DRB results. Accepts a SearchParams object as an argument.
 */
export async function fetchDRBResults(
  searchParams: SearchParams
): Promise<DRBResultsResponse | Error> {
  const drbQueryString = getDRBQueryStringFromSearchParams(searchParams)

  try {
    const client = await nyplApiClient({ apiName: DRB_API_NAME })
    const { data } = await client.get(drbQueryString)
    console.log(data)

    return {
      works: data.works,
      totalWorks: data.totalWorks,
    }
  } catch (error) {
    return Error(error)
  }
}

/**
 * Default API route handler for ResearchNow DRB
 * Expects the same query parameters as the Search endpoint
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const searchParams = mapQueryToSearchParams(req.query)
    const response = await fetchDRBResults(searchParams)
    res.status(200).json(response)
  }
}

export default handler
