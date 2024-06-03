import type { FeedbackMetadataAndComment } from "../types/feedbackTypes"
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
