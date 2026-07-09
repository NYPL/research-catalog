import type { NextApiRequest, NextApiResponse } from "next"
import {
  addRecordsToList,
  deleteRecordFromList,
  fetchBibRecords,
} from "../../../../src/server/api/lists"
import MyAccount from "../../../../src/models/MyAccount"
import type { ListRecordsSort } from "../../../../src/types/listTypes"
import initializePatronTokenAuth from "../../../../src/server/auth"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const cookiePatronId = patronTokenResponse.decodedPatron?.sub
  if (!cookiePatronId) {
    return res.status(403).json({ error: "No authenticated patron" })
  }

  // Records requested in query for easy GETting.
  // Note that this flips the pattern of other /lists endpoints,
  // which indicate records in the body and the list ID in query params.
  const { uris, sort } = req.query
  const { listId } = req.body

  if (!uris || typeof uris !== "string") {
    return res.status(400).json({ error: "Missing or invalid uris" })
  }

  if (req.method === "GET") {
    const response = await fetchBibRecords(uris, sort as ListRecordsSort)
    res.status(response.status || 200).json(response)
  } else if (req.method === "PATCH") {
    const response = await addRecordsToList({
      records: uris,
      listId,
      patronId: cookiePatronId,
    })
    if (response.list) {
      const accountModel = new MyAccount(null, cookiePatronId)
      response.list = accountModel.buildLists([response.list])[0]
    }
    res.status(response.status || 200).json(response)
  } else if (req.method === "DELETE") {
    const response = await deleteRecordFromList({
      record: uris,
      listId,
      patronId: cookiePatronId,
    })
    if (response.list) {
      const accountModel = new MyAccount(null, cookiePatronId)
      response.list = accountModel.buildLists([response.list])[0]
    }
    res.status(response.status || 200).json(response)
  } else {
    return res.status(405).json({ error: "Method not allowed" })
  }
}
