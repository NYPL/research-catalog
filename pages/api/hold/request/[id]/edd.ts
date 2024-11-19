import type { NextApiRequest, NextApiResponse } from "next"

/**
 * Default API route handler for EDD requests
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({
      error: "Please use a POST request for the EDD Request API endpoint",
    })
  }

  // TODO: Add success state when EDD server-side post function is ready
  res.status(500).json({
    error: "Fake error to mock EDD request failure",
  })
}

export default handler
