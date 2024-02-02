import type { NextApiRequest, NextApiResponse } from "next"

import type { SearchParams } from "../../src/types/searchTypes"
import type { DRBResults } from "../../src/types/drbTypes"
import nyplApiClient from "../../src/server/nyplApiClient/index"
import { DRB_API_NAME } from "../../src/config/constants"
import { getDRBQueryStringFromSearchParams } from "../../src/utils/drbUtils"
import { mapQueryToSearchParams } from "../../src/utils/searchUtils"

/**
 * Getter function for DRB results. Accepts a SearchParams object as an argument.
 */
export async function fetchDRBResults(
  searchParams: SearchParams
): Promise<DRBResults | Error> {
  const drbQueryString = getDRBQueryStringFromSearchParams(searchParams)

  try {
    const client = await nyplApiClient({ apiName: DRB_API_NAME })
    const { data } = await client.get(drbQueryString)

    return {
      works: data.works,
      totalWorks: data.totalWorks,
    }
  } catch (error) {
    console.log(`Error fetching DRB results ${error.message}`)
    throw new Error(error)
  }
}

/**
 * Default API route handler for ResearchNow DRB
 * Expects the same query parameters as the Search endpoint
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const searchParams = mapQueryToSearchParams(req.query)

    try {
      const response = await fetchDRBResults(searchParams)

      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({
        title: "Error fetching DRB results",
        status: 500,
        detail: error.message,
      })
    }
  }
}

export default handler
