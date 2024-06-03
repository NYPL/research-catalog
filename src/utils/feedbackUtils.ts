import type { FeedbackMetadataAndComment } from "../types/feedbackTypes"
import { type SendEmailRequest } from "aws-sdk/clients/ses"
import { encodeHTML } from "./appUtils"

/**
 * getFeedbackEmailText
 * Build the Feedback submission email text based with the submitted fields and the full referer url.
 */
export const getFeedbackEmailText = (
  fullUrl: string,
  fields: FeedbackMetadataAndComment
) => {
  const submissionText = Object.keys(fields)
    .map((label) => `${label}: ${encodeHTML(fields[label])}`)
    .join(", ")
  return `Question/Feedback from Research Catalog (SCC): ${submissionText} URL: ${fullUrl}`
}

/**
 * getFeedbackEmailHTML
 * Build the Feedback submission email HTML based with the submitted fields and the full referer url.
 */
export const getFeedbackEmailHTML = (
  fullUrl: string,
  fields: FeedbackMetadataAndComment
) => `
      <div>
        <h1>Question/Feedback from Research Catalog (SCC):</h1>
        <dl>
          ${Object.keys(fields)
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
/**
 * getEmailParams
 * Get the params for Feedback email submission as expected by SES
 */
export const getEmailParams = (
  body: string,
  referer: string,
  toAddress: string,
  sourceAddress: string
): SendEmailRequest => {
  const fields = JSON.parse(body)

  const fullUrl = encodeHTML(referer)

  const emailText = getFeedbackEmailText(fullUrl, fields)
  const emailHTML = getFeedbackEmailHTML(fullUrl, fields)

  return {
    Destination: {
      ToAddresses: [toAddress],
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
    Source: sourceAddress,
    ReplyToAddresses: [fields.email || sourceAddress],
  }
}
