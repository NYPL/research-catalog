import type { NextApiRequest, NextApiResponse } from "next"
import nyplApiClient from "../../src/server/nyplApiClient"

// Fetch all advanced search vocabularies from Discovery API. Exposes this endpoint
// for `load-search-vocabs`.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await nyplApiClient()
    const data = await client.get("/discovery/vocabularies")
    res.status(200).json(data)
  } catch (error) {
    console.error("Error fetching vocabularies:", error)
    res.status(500).json({ error: "Failed to fetch vocabularies" })
  }
}
