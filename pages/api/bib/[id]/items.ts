import type { NextApiRequest, NextApiResponse } from "next"

import { fetchItems } from "../../../../src/server/api/items"

/**
 * Item fetching route handler for Bib page
 *
 * Used for pagination, item filtering, and view all.
 *
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { status, items } = await fetchItems(req.query)

  if (req.method === "GET") {
    if (status !== 200 || !items?.length) {
      res.status(400).json({
        error: "Error fetching Bib items for this query",
      })
    } else {
      res.status(200).json({
        items,
      })
    }
  } else {
    res.status(400).json({
      error: "Please use a GET request for the Bib Items API endpoint",
    })
  }
}

export default handler
