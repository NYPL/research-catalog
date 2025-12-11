import type { NextApiRequest, NextApiResponse } from "next"
import { fetchSubjects } from "../../src/server/api/browse"
import { mapQueryToBrowseParams } from "../../src/utils/browseUtils"

/**
 * API route handler for Browse
 * Determines which fetcher to use based on the `browse_type` query parameter.
 * Supported types: "subjects" (default), "authors".
 * Calls a helper function that maps the query params object to a BrowseParams object,
 * returns a JSON response.
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { browse_type: browseType } = req.query
    const browseParams = mapQueryToBrowseParams(req.query)

    let response

    switch (browseType) {
      case "authors":
        //response = await fetchAuthors(browseParams)
        break
      case "subjects":
      default:
        response = await fetchSubjects(browseParams)
        break
    }

    res.status(200).json(response)
  }
}

export default handler
