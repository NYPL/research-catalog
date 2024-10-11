import type { NextApiRequest, NextApiResponse } from "next"
import { fetchBib } from "../../../src/server/api/bib"
import { PATHS, BASE_URL } from "../../../src/config/constants"

/**
 * Default API route handler for Hold request / EDD request pages
 *
 * It handles a get request for a given bib and item item separated by a dash,
 * fetching the bib and item details and returning them in the response.
 *
 * This is primarily used for debugging and in the case that the user has JS disabled
 * since we can fetch the bib and item directly in getServerSideProps.
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string
  const { discoveryBibResult, status } = await fetchBib(id, req.query)

  if (status !== 200) {
    res
      .status(500)
      .json({ error: "There was a problem fetching the bib details" })
  }

  if (req.method === "POST") {
    res.status(200).json({
      discoveryBibResult,
    })
  } else {
    res
      .status(500)
      .json({ error: "Please use a POST request for the Hold API endpoint" })
  }
}

export default handler
