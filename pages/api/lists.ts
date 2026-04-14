import type { NextApiRequest, NextApiResponse } from "next"

/**
 * Default API route handler for lists
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    //get list
    //get list items
    //get all patron lists
  }
  if (req.method === "POST") {
    //update list
  }
  if (req.method === "DELETE") {
    //delete list
    //delete item from list
  }
  if (req.method === "PUT") {
    //create list
  }
}

export default handler
