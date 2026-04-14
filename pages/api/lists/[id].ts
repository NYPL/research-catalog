import type { NextApiRequest, NextApiResponse } from "next"

/**
 * Route handler for single list operations
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    //get list
    // get items
  }
  if (req.method === "POST") {
    //update list
  }
  if (req.method === "DELETE") {
    //delete list
  }
  if (req.method === "PUT") {
    //create list
  }
}

export default handler
