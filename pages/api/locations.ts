import type { NextApiRequest, NextApiResponse } from "next"
import { fetchLocations } from "../../src/server/api/locations"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const response = await fetchLocations(req.query)
    res.status(200).json(response)
  }
}

export default handler
