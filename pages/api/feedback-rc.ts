import type { NextApiRequest, NextApiResponse } from "next"
import aws from "aws-sdk"

import { appConfig } from "../../src/config/config"
import { getEmailParams } from "../../src/utils/feedbackUtils"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!req.body) res.status(400).json({ error: "Malformed request" })
    aws.config.update({ region: "us-east-1" })

    const emailParams = getEmailParams(
      req.body,
      req.headers.referer,
      appConfig.libAnswersEmail,
      appConfig.sourceEmail
    )

    // Create the promise and SES service object
    const sendPromise = new aws.SES({ apiVersion: "2010-12-01" })
      .sendEmail(emailParams)
      .promise()

    return sendPromise
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json({ error }))
  }
}

export default handler
