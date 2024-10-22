import type { NextApiRequest, NextApiResponse } from "next"

/**
 * Default API route handler for Hold requests
 * Calls a helper function that maps the query params object to a SearchParams object
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({
      error: "Please use a POST request for the Hold Request API endpoint",
    })
  }

  try {
    return res.status(404).json({
      title: "Error posting Hold request",
      status: 404,
    }) // Placeholder response
  } catch (error) {
    return res.status(500).json({
      title: "Error fetching DRB results",
      status: 500,
      detail: error.message,
    })
  }
}

export default handler
