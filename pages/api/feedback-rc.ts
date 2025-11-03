import type { NextApiRequest, NextApiResponse } from "next"
import { SES } from "@aws-sdk/client-ses"

import { getEmailParams } from "../../src/utils/feedbackUtils"
import { appConfig } from "../../src/config/config"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!req.body) res.status(400).json({ error: "Malformed request" })
    const emailParams = getEmailParams(
      req.body,
      req.headers.referer,
      appConfig.libAnswersEmail,
      appConfig.sourceEmail
    )
    // Create the promise and SES service object
    const sendPromise = new SES({
      region: "us-east-1",
    }).sendEmail(emailParams)

    return sendPromise
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json({ error }))
  }
}

export default handler
