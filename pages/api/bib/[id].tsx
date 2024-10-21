import type { NextApiRequest, NextApiResponse } from "next"
import { fetchBib } from "../../../src/server/api/bib"
import { PATHS, BASE_URL } from "../../../src/config/constants"

/**
 * Default API route handler for Bib page
 *
 * It handles a get request for a given bib id by internally calling fetchBib
 * and handling the response based on the status returned there.
 *
 * Note: This is primarily used for debugging since the Bib page fetches the
 * result by calling fetchBib directly in getServerSideProps.
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  let bibId = req.query.id as string
  let itemId: string | undefined

  // If the id contains a hyphen, the id contains a bibId and an itemId
  if (bibId.includes("-")) {
    bibId = bibId.split("-")[0]
    itemId = bibId.split("-")[1]
  }
  const { discoveryBibResult, annotatedMarc, status, redirectUrl } =
    await fetchBib(bibId, req.query, itemId)

  if (req.method === "GET") {
    switch (status) {
      case 307:
        res.redirect(redirectUrl)
        break
      case 404:
        res.redirect(BASE_URL + PATHS["404"])
        break
      default:
        res.status(200).json({
          discoveryBibResult,
          annotatedMarc,
        })
        break
    }
  } else {
    res
      .status(500)
      .json({ error: "Please use a GET request for the Bib API endpoint" })
  }
}

export default handler
