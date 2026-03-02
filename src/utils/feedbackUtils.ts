import type { FeedbackMetadataAndComment } from "../types/feedbackTypes"
import { type SendEmailRequest } from "@aws-sdk/client-ses"
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
    .filter((label) => fields[label])
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
            .filter((label) => fields[label])
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

export const maskEmail = (email: string) => {
  return email
    .split("@")
    .map((chunk, i) =>
      i == 0
        ? chunk
            .split("")
            .map((char, j) => (j === 0 ? char : "*"))
            .join("")
        : chunk
    )
    .join("@")
}
/**
 * getEmailParams
 * Get the params for Feedback email submission as expected by SES
 */
export const getEmailParams = (
  emailBody: string,
  referer: string,
  toEmail: string,
  sourceEmail: string
): SendEmailRequest => {
  const fields = JSON.parse(emailBody)

  const fullUrl = encodeHTML(referer)

  const emailText = getFeedbackEmailText(fullUrl, fields)
  const emailHTML = getFeedbackEmailHTML(fullUrl, fields)
  return {
    Destination: {
      ToAddresses: [toEmail],
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
    Source: sourceEmail,
    ReplyToAddresses: [fields.email || sourceEmail],
  }
}
