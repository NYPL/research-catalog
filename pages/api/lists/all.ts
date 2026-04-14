import type { NextApiRequest, NextApiResponse } from "next"

/**
 * Route handler to get all lists on a patron
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    //get all patron lists
    // /patrons/{patronId}/lists?sort={sort}
  }
}

export default handler
