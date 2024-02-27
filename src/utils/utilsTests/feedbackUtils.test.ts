import { getFeedbackEmailText } from "../feedbackUtils"

describe("feedbackUtils", () => {
  describe("getFeedbackEmailText", () => {
    it("correctly format the feedback email test given a full url and a fields object", () => {
      expect(
        getFeedbackEmailText("https://www,nypl.org", {
          category: "category",
          comment: "comment",
          id: "b12345678",
          email: "test@nypl.org",
          barcode: "12345678",
        })
      ).toBe(
        "Question/Feedback from Research Catalog (SCC): category: category, comment: comment, id: b12345678, email: test@nypl.org, barcode: 12345678 URL: https://www,nypl.org"
      )
    })
    it("correctly format the feedback email test given a full url and a fields object with just a comment and email", () => {
      expect(
        getFeedbackEmailText("https://www,nypl.org", {
          comment: "comment",
          email: "test@nypl.org",
        })
      ).toBe(
        "Question/Feedback from Research Catalog (SCC): comment: comment, email: test@nypl.org URL: https://www,nypl.org"
      )
    })
  })
})
