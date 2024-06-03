import {
  getFeedbackEmailText,
  getFeedbackEmailHTML,
  getEmailParams,
} from "../feedbackUtils"
import { appConfig } from "../../config/config"

describe("feedbackUtils", () => {
  describe("getFeedbackEmailText", () => {
    it("correctly format the feedback email text given a full url and a fields object", () => {
      expect(
        getFeedbackEmailText("https://www.nypl.org", {
          category: "category",
          comment: "comment",
          id: "b12345678",
          email: "test@nypl.org",
          barcode: "12345678",
        })
      ).toBe(
        "Question/Feedback from Research Catalog (SCC): category: category, comment: comment, id: b12345678, email: test@nypl.org, barcode: 12345678 URL: https://www.nypl.org"
      )
    })
    it("correctly format the feedback email text given a full url and a fields object with just a comment and email", () => {
      expect(
        getFeedbackEmailText("https://www.nypl.org", {
          comment: "comment",
          email: "test@nypl.org",
        })
      ).toBe(
        "Question/Feedback from Research Catalog (SCC): comment: comment, email: test@nypl.org URL: https://www.nypl.org"
      )
    })
  })
  describe("getFeedbackEmailHTML", () => {
    it("correctly format the feedback email HTML given a full url and a fields object", () => {
      expect(
        getFeedbackEmailHTML("https://www.nypl.org", {
          category: "category",
          comment: "comment",
          id: "b12345678",
          email: "test@nypl.org",
          barcode: "12345678",
        })
      ).toBe(
        `
      <div>
        <h1>Question/Feedback from Research Catalog (SCC):</h1>
        <dl>
          
            <dt>category:</dt>
            <dd>category</dd>
          
            <dt>comment:</dt>
            <dd>comment</dd>
          
            <dt>id:</dt>
            <dd>b12345678</dd>
          
            <dt>email:</dt>
            <dd>test@nypl.org</dd>
          
            <dt>barcode:</dt>
            <dd>12345678</dd>
          
          <dt>URL:</dt>
          <dd>https://www.nypl.org</dd>
        </dl>
      </div>
    `
      )
    })
  })
  describe("getEmailParams", () => {
    it("correctly returns the email params in the SendEmailRequest type format", () => {
      expect(getEmailParams("https://www.nypl.org", "")).toBe({
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
        ReplyToAddresses: [""],
      })
    })
  })
})
