import type { NextApiRequest, NextApiResponse } from "next"
import MyAccount from "../../../../src/models/MyAccount"
import type { ListSort } from "../../../../src/types/listTypes"
import initializePatronTokenAuth from "../../../../src/server/auth"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const cookiePatronId = patronTokenResponse.decodedPatron?.sub
  if (!cookiePatronId) {
    return res.status(403).json({ error: "No authenticated patron" })
  }

  const { sort } = req.query

  try {
    const accountModel = new MyAccount(null, cookiePatronId)
    const lists = await accountModel.getLists(cookiePatronId, sort as ListSort)
    res.status(200).json({ lists })
  } catch (error) {
    console.error("Error fetching lists:", error)
    res.status(500).json({ error: "Failed to fetch lists" })
  }
}
