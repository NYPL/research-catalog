import type { NextApiRequest, NextApiResponse } from "next"

import type { BibResponse } from "../../src/types/bibTypes"

export async function fetchBib(id: string): Promise<BibResponse | Error> {
  console.log(id)
  try {
    return {
      bib: [],
    }
  } catch (error) {
    return new Error("Error fetching Bib")
  }
}

/**
 * Default API route handler for Bib page
 * Calls a helper function that maps the query params object to a SearchParams object
 * It is then passed to fetchResults, which fetches the results and returns a JSON response
 * via its onSuccess callback on a successful fetch
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json([])
  }
}

export default handler
