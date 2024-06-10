import type { NextApiRequest, NextApiResponse } from "next"

import { fetchBibItems } from "../../../../src/server/api/bib"

/**
 * Item fetching route handler for Bib page
 *
 * Used for pagination, item filtering, and view all.
 *
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string
  const viewAllItems = req.query?.view_all_items === "true"

  const items = await fetchBibItems(id, req.query, viewAllItems)

  if (req.method === "GET") {
    if (!items?.length) {
      res.status(500).json({
        error: "Error fetching Bib items for this query",
      })
    } else {
      res.status(200).json({
        items,
      })
    }
  }
  if (req.method === "POST") {
    res.status(500).json({
      error: "Please use a GET request for the Bib Items API endpoint",
    })
  }
}

export default handler
