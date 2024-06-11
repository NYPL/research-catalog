import {
  getFeedbackEmailText,
  getFeedbackEmailHTML,
  getEmailParams,
} from "../feedbackUtils"

describe("feedbackUtils", () => {
  describe("getFeedbackEmailText", () => {
    it("correctly formats the feedback email text given a full url and a fields object", () => {
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
    it("correctly formats the feedback email HTML given a full url and a fields object", () => {
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
    it("correctly formats the email params based on the required arguments", () => {
      const body = {
        category: "comment",
        comment: "Body text",
        email: "replyTo@email.com",
      }
      const referer = "http://localhost:8080"
      expect(
        getEmailParams(body, referer, "to@email.com", "source@email.com")
      ).toStrictEqual({
        Destination: { ToAddresses: ["to@email.com"] },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: getFeedbackEmailHTML(referer, body),
            },
            Text: {
              Charset: "UTF-8",
              Data: getFeedbackEmailText(referer, body),
            },
          },
          Subject: { Charset: "UTF-8", Data: "SCC Feedback" },
        },
        Source: "source@email.com",
        ReplyToAddresses: ["replyTo@email.com"],
      })
    })
  })
})
