import type { NextApiRequest, NextApiResponse } from "next"
import aws from "aws-sdk"

import { encodeHTML } from "../../src/utils/appUtils"
import { appConfig } from "../../src/config/config"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!req.body) res.status(400).json({ error: "Malformed request" })
    aws.config.update({ region: "us-east-1" })

    const fields = JSON.parse(req.body)
    const fieldLabels = Object.keys(fields)

    const fullUrl = encodeHTML(req.headers.referer)
    const submissionText = fieldLabels
      .map((label) => `${label}: ${encodeHTML(fields[label])}`)
      .join(", ")
    const emailText = `Question/Feedback from Research Catalog (SCC): ${submissionText} URL: ${fullUrl}`

    const emailHtml = `
      <div>
        <h1>Question/Feedback from Research Catalog (SCC):</h1>
        <dl>
          ${fieldLabels
            .map(
              (label) => `
            <dt>${label}:</dt>
            <dd>${encodeHTML(fields[label]).replace(/\\n/g, "<br/>")}</dd>
          `
            )
            .join("")}
          <dt>URL:</dt>
          <dd>${fullUrl}</dd>
        </dl>
      </div>
    `

    // Create sendEmail params
    const params = {
      Destination: {
        /* required */ ToAddresses: [appConfig.libAnswersEmail],
      },
      Message: {
        /* required */
        Body: {
          /* required */
          Html: {
            Charset: "UTF-8",
            Data: emailHtml,
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
      Source: appConfig.sourceEmail /* required */,
      ReplyToAddresses: [fields.email || appConfig.sourceEmail],
    }

    // Create the promise and SES service object
    const sendPromise = new aws.SES({ apiVersion: "2010-12-01" })
      .sendEmail(params)
      .promise()

    return sendPromise
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json({ error }))
  }
}

export default handler
