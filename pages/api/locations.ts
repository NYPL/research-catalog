import type { NextApiRequest, NextApiResponse } from "next"
import nyplApiClient from "../../src/server/nyplApiClient/index"
import { encode as encodeQueryString } from "node:querystring"
import { DISCOVERY_API_NAME } from "../../src/config/constants"

/**
 *  Fetch locations by query {object}
 */
export async function fetchLocations(query) {
  const client = await nyplApiClient({ apiName: DISCOVERY_API_NAME })
  const path = `/locations?${encodeQueryString(query)}`
  return client.get(path)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const response = await fetchLocations(req.query)
    res.status(200).json(response)
  }
}

export default handler
