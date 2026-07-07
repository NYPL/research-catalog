import type { NextApiRequest, NextApiResponse } from "next"
import {
  createList,
  deleteList,
  fetchList,
  updateList,
} from "../../../../src/server/api/lists"
import MyAccount from "../../../../src/models/MyAccount"
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

  const { listId } = req.query

  const { description, listName, records } = req.body || {}
  const accountModel = new MyAccount(null, cookiePatronId)

  if (req.method == "GET") {
    if (!listId || typeof listId !== "string") {
      return res.status(400).json({ error: "Missing or invalid listId" })
    }
    const response = await fetchList({
      patronId: cookiePatronId,
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
        patronId: cookiePatronId,
        listName,
        description,
        records,
      })
      if (response.list) {
        response.list = accountModel.buildLists([response.list])[0]
      }
      res.status(response.status).json(response)
    }
  } else if (req.method == "PATCH") {
    if (typeof listId !== "string") {
      return res.status(400).json({ error: "Invalid listId" })
    }
    const response = await updateList({
      patronId: cookiePatronId,
      listId,
      listName,
      description,
    })
    if (response.list) {
      response.list = accountModel.buildLists([response.list])[0]
    }
    res.status(response.status).json(response)
  } else if (req.method == "DELETE") {
    if (!listId || typeof listId !== "string") {
      return res.status(400).json({ error: "Missing or invalid listId" })
    }
    const response = await deleteList({
      patronId: cookiePatronId,
      listId,
    })
    res.status(response.status).json(response)
  } else {
    return res.status(405).json({ error: "Method not allowed" })
  }
}
