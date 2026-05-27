import { listsResponse } from "../../../__test__/fixtures/listFixtures"
import List from "../List"

describe("List model", () => {
  let list: List

  beforeEach(() => {
    list = new List(listsResponse[0])
  })

  describe("constructor", () => {
    it("initializes the id", () => {
      expect(list.id).toBe("12345000-aabb-bb")
    })

    it("initializes the listName", () => {
      expect(list.listName).toBe("First list")
    })

    it("initializes the description", () => {
      expect(list.description).toBeNull()
    })

    it("initializes the patronId", () => {
      expect(list.patronId).toBe("12345")
    })

    it("initializes the records", () => {
      expect(list.records).toStrictEqual([])
    })

    it("initializes and formats the createdDate", () => {
      expect(list.createdDate).toBe("4/15/2026")
    })

    it("initializes and formats the modifiedDate", () => {
      expect(list.modifiedDate).toBe("4/15/2026")
    })
  })
})
