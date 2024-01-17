import type { NextApiRequest, NextApiResponse } from "next"
import { fetchBib } from "./index"
import { PATHS } from "../../../src/config/constants"
import { mapQueryToBibParams } from "../../../src/utils/bibUtils"

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
  const id = req.query.id as string
  const bibParams = mapQueryToBibParams(req.query)
  const { bib, annotatedMarc, status, redirectUrl } = await fetchBib(
    id,
    bibParams
  )

  if (req.method === "GET") {
    switch (status) {
      case 307:
        res.redirect(redirectUrl)
        break
      case 404:
        res.redirect(PATHS["404"])
        break
      default:
        res.status(200).json({
          bib,
          annotatedMarc,
        })
        break
    }
  }
}

export default handler
