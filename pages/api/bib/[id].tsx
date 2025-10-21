import type { NextApiRequest, NextApiResponse } from "next"
import { fetchBib } from "../../../src/server/api/bib"

/**
 * Default API route handler for Bib page
 *
 * It handles a GET request for a given bib id by internally calling fetchBib
 * and handling the response based on the status returned there.
 *
 * Note: This is primarily used for debugging since the Bib page fetches the
 * result by calling fetchBib directly in getServerSideProps.
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res
      .status(500)
      .json({ error: "Please use a GET request for the Bib API endpoint" })
  }

  let bibId = req.query.id as string
  let itemId: string | undefined

  // If the id contains a hyphen, the id contains a bibId and an itemId
  if (bibId.includes("-")) {
    ;[bibId, itemId] = bibId.split("-")
  }

  const bibResponse = await fetchBib(bibId, req.query, itemId)

  // Handle error responses
  if ("status" in bibResponse) {
    switch (bibResponse.status) {
      case 307:
        if (bibResponse.redirectUrl) {
          return res.redirect(bibResponse.redirectUrl)
        }
        return res.status(500).json({ error: "Redirect URL missing" })

      case 404:
        return res.status(404).json({ error: `Bib ${bibId} not found` })

      case 500:
        return res.status(500).json({ error: "Bib error" })

      default:
        return res.status(200).json({
          discoveryBibResult: (bibResponse as any).discoveryBibResult,
          annotatedMarc: (bibResponse as any).annotatedMarc,
        })
    }
  }

  return res.status(500).json({ error: "Unknown error fetching bib" })
}

export default handler
