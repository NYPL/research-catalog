import type { NextApiRequest, NextApiResponse } from "next"

import { mapQueryToSearchParams } from "../../src/utils/searchUtils"
import { fetchDRBResults } from "../../src/server/api/drb"

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
