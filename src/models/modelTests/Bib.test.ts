import { bibWithItems } from "../../../__test__/fixtures/bibFixtures"
import Bib from "../Bib"

describe("Bib model", () => {
  let bib: Bib

  beforeEach(() => {
    bib = new Bib(bibWithItems)
  })

  describe("constructor", () => {
    it("initializes the Bib ID with the with the Bib's @id field", () => {
      expect(bib.id).toBe("b15080796")
    })
  })
})
