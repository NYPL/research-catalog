import type { NextApiRequest, NextApiResponse } from "next"
import { fetchLists } from "../../../../src/server/api/lists"
import type { ListSort } from "../../../../src/types/listTypes"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { patronId, sort } = req.query

  if (!patronId || typeof patronId !== "string") {
    return res.status(400).json({ error: "Missing or invalid patronId" })
  }

  const response = await fetchLists({
    patronId,
    sort: sort as ListSort,
  })
  res.status(200).json(response)
}
