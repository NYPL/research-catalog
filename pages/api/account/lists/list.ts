import type { NextApiRequest, NextApiResponse } from "next"
import {
  createList,
  deleteList,
  fetchList,
  updateList,
} from "../../../../src/server/api/lists"
import MyAccount from "../../../../src/models/MyAccount"
import type { ListSort } from "../../../../src/types/listTypes"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { listId } = req.query

  const {
    description,
    listName,
    records,
    patronId: bodyPatronId,
  } = req.body || {}

  const patronId = req.query.patronId || bodyPatronId
  if (!patronId || typeof patronId !== "string") {
    return res.status(400).json({ error: "Missing or invalid patronId" })
  }

  const accountModel = new MyAccount(null, patronId)

  if (req.method == "GET") {
    if (!listId || typeof listId !== "string") {
      return res.status(400).json({ error: "Missing or invalid listId" })
    }
    const response = await fetchList({
      patronId,
      listId,
    })
    if (response.list) {
      response.list = accountModel.buildLists([response.list])[0]
    }
    res.status(200).json(response)
  } else if (req.method == "POST") {
    if (!listName || typeof listName !== "string") {
      return res.status(400).json({ error: "Missing or invalid listName" })
    }

    if (!listId) {
      const response = await createList({
        patronId,
        listName,
        description,
        records,
      })
      if (response.list) {
        response.list = accountModel.buildLists([response.list])[0]
      }
      res.status(200).json(response)
    } else {
      if (typeof listId !== "string") {
        return res.status(400).json({ error: "Invalid listId" })
      }
      const response = await updateList({
        patronId,
        listId,
        listName,
        description,
      })
      if (response.list) {
        response.list = accountModel.buildLists([response.list])[0]
      }
      res.status(200).json(response)
    }
  } else if (req.method == "DELETE") {
    if (!listId || typeof listId !== "string") {
      return res.status(400).json({ error: "Missing or invalid listId" })
    }
    const response = await deleteList({
      patronId,
      listId,
    })
    res.status(response.status).json(response)
  } else {
    return res.status(405).json({ error: "Method not allowed" })
  }
}
