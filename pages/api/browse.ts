import type { NextApiRequest, NextApiResponse } from "next"
import { fetchBrowse } from "../../src/server/api/browse"
import type { BrowseType } from "../../src/types/browseTypes"
import { mapQueryToBrowseParams } from "../../src/utils/browseUtils"

/**
 * API route handler for Browse
 * Determines which fetcher to use based on the `browse_type` query parameter.
 * Supported types: "subjects" (default), "contributors".
 * Calls a helper function that maps the query params object to a BrowseParams object,
 * returns a JSON response.
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const browseType = (req.query.browse_type as BrowseType) ?? "subjects"
    const browseParams = mapQueryToBrowseParams(req.query)

    const response = await fetchBrowse(browseType, browseParams)
    res.status(200).json(response)
  }
}

export default handler
