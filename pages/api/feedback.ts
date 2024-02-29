import type { NextApiRequest, NextApiResponse } from "next"
import aws from "aws-sdk"
import { type SendEmailRequest } from "aws-sdk/clients/ses"

import { appConfig } from "../../src/config/config"
import {
  getFeedbackEmailText,
  getFeedbackEmailHTML,
} from "../../src/utils/feedbackUtils"
import { encodeHTML } from "../../src/utils/appUtils"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!req.body) res.status(400).json({ error: "Malformed request" })
    aws.config.update({ region: "us-east-1" })

    const fields = JSON.parse(req.body)

    const fullUrl = encodeHTML(req.headers.referer)

    const emailText = getFeedbackEmailText(fullUrl, fields)
    const emailHTML = getFeedbackEmailHTML(fullUrl, fields)

    console.log("appConfig.libAnswersEmail", appConfig.libAnswersEmail)
    console.log("appConfig.sourceEmail", appConfig.sourceEmail)
    console.log("fields.email", fields.email)

    const emailParams: SendEmailRequest = {
      Destination: {
        ToAddresses: [appConfig.libAnswersEmail],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: emailHTML,
          },
          Text: {
            Charset: "UTF-8",
            Data: emailText,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "SCC Feedback",
        },
      },
      Source: appConfig.sourceEmail,
      ReplyToAddresses: [fields.email || appConfig.sourceEmail],
    }

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
