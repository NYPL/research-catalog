import type { NextApiRequest, NextApiResponse } from "next"

import { fetchAutocomplete } from "../../src/server/api/autocomplete"

/**
 * API route for autocomplete
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const response = await fetchAutocomplete(
      req.query.q,
      req.query.search_scope
    )
    res.status(200).json(response)
  }
}

export default handler
