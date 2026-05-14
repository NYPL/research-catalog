import type { NextApiRequest, NextApiResponse } from "next"
import { fetchBibRecords } from "../../../../src/server/api/lists"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { uris } = req.query

  if (!uris || typeof uris !== "string") {
    return res.status(400).json({ error: "Missing or invalid uris" })
  }

  const response = await fetchBibRecords(uris)
  res.status(response.status || 200).json(response)
}
