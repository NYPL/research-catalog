import type { NextApiRequest, NextApiResponse } from "next"
import { fetchBib } from "../../../../src/server/api/bib"
import { PATHS, BASE_URL } from "../../../../src/config/constants"
import { mapQueryToBibParams } from "../../../../src/utils/bibUtils"

/**
 * Item fetching route handler for Bib page
 *
 * Used for pagination, item filtering, and view all.
 *
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string
  const bibParams = mapQueryToBibParams(req.query)
  const { discoveryBibResult, status } = await fetchBib(id, bibParams)
  const items = discoveryBibResult?.items

  if (req.method === "GET") {
    switch (status) {
      case 404:
        res.redirect(BASE_URL + PATHS["404"])
        break
      default:
        res.status(200).json({
          items,
        })
        break
    }
  }
  if (req.method === "POST") {
    res.status(500).json({
      error: "Please use a GET request for the Bib Items API endpoint",
    })
  }
}

export default handler
