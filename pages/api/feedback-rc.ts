import type { NextApiRequest, NextApiResponse } from "next"
import { SES } from "@aws-sdk/client-ses"

import { getEmailParams, maskEmail } from "../../src/utils/feedbackUtils"
import { appConfig } from "../../src/config/config"
import logger from "../../logger"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!req.body) res.status(400).json({ error: "Malformed request" })
    const emailParams = getEmailParams(
      req.body,
      req.headers.referer,
      appConfig.libAnswersEmail,
      appConfig.sourceEmail
    )
    try {
      // Create the promise and SES service object
      const data = await new SES({
        region: "us-east-1",
      }).sendEmail(emailParams)
      const maskedEmail = maskEmail(JSON.parse(req.body).email)
      logger.info(
        `Posting email from ${maskedEmail} to lib answers email ${appConfig.libAnswersEmail}`
      )
      return res.status(200).json(data)
    } catch (error) {
      logger.error("feedback-rc handler error: " + error.message)
      return res.status(400).json({ error: error.message })
    }
  }
}

export default handler
