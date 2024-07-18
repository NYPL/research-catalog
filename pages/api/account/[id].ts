import type { NextApiRequest, NextApiResponse } from "next"
import sierraClient from "../../../src/server/sierraClient"
import { MyAccountFactory } from "../../../src/models/MyAccount"

export const fetchPatronData = async (id: string) => {
  try {
    const client = await sierraClient()
    const patronData = await MyAccountFactory(id, client)
    return { status: 200, message: JSON.stringify(patronData) }
  } catch (e) {
    return {
      status: e.response.status,
      message: e.response.data.name || e.response.data.description,
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const patronId = req.query.id as string
  let responseMessage = ""
  let responseStatus = 400
  if (req.method !== "GET")
    responseMessage = "Please make a GET request to this endpoint."
  else {
    const resp = await fetchPatronData(patronId)
    responseMessage = resp.message
    responseStatus = resp.status
  }
  return res.status(responseStatus).json(responseMessage)
}
