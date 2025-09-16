import type { NextApiRequest, NextApiResponse } from "next"
import nyplApiClient from "../../src/server/nyplApiClient"
import { DISCOVERY_API_SEARCH_ROUTE } from "../../src/config/constants"

// Fetch all language aggregation values from Discovery API. Exposes API client
// for `load-search-aggs` script.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await nyplApiClient()
    const data = await client.get(
      `${DISCOVERY_API_SEARCH_ROUTE}/aggregations/language?per_page=500`
    )
    res.status(200).json(data)
  } catch (error) {
    console.error("Error fetching languages:", error)
    res.status(500).json({ error: "Failed to fetch languages" })
  }
}
