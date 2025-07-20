import type { NextApiRequest, NextApiResponse } from "next"
import { fetchSubjects } from "../../src/server/api/browse"
import { mapQueryToBrowseParams } from "../../src/utils/browseUtils"

/**
 * Default API route handler for Browse
 * Calls a helper function that maps the query params object to a BrowseParams object
 * It is then passed to fetchSubjects, which fetches the subjects and returns a JSON response
 * via its onSuccess callback on a successful fetch
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const browseParams = mapQueryToBrowseParams(req.query)
    const response = await fetchSubjects(browseParams)
    res.status(200).json(response)
  }
}

export default handler
