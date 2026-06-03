import type { NextApiRequest, NextApiResponse } from "next"
import {
  addRecordsToList,
  deleteRecordFromList,
  fetchBibRecords,
} from "../../../../src/server/api/lists"
import type { ListRecordsSort } from "../../../../src/types/listTypes"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Records requested in query for easy GETting, note that this flips the pattern of other list endpoints
  const { uris, sort } = req.query
  const { listId, patronId } = req.body

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
      patronId,
    })
    res.status(response.status || 200).json(response)
  } else if (req.method === "DELETE") {
    const response = await deleteRecordFromList({
      record: uris,
      listId,
      patronId,
    })
    res.status(response.status || 200).json(response)
  } else {
    return res.status(405).json({ error: "Method not allowed" })
  }
}
