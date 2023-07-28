import type { NextApiRequest, NextApiResponse } from "next"

export function fetchResults() {}

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.status(200).json({ message: "This works" })
  }
  res.status(200).json({ message: "This works" })
}

export default handler
