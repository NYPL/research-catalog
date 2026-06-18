import type { NextApiRequest, NextApiResponse } from "next"
import MyAccount from "../../../../src/models/MyAccount"
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

  try {
    const accountModel = new MyAccount(null, patronId)
    const lists = await accountModel.getLists(patronId, sort as ListSort)
    res.status(200).json({ lists })
  } catch (error) {
    console.error("Error fetching lists:", error)
    res.status(500).json({ error: "Failed to fetch lists" })
  }
}
