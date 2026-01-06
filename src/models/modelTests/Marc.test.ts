import {
  classicMarcResult,
  everythingMarcResult,
} from "../../../__test__/fixtures/marcFixtures"
import MarcModel from "../Marc"

describe("Marc model", () => {
  const everythingMarcModel = new MarcModel(everythingMarcResult)
  const classicMarcModel = new MarcModel(classicMarcResult)

  it("has expected leader", () => {
    expect(everythingMarcModel.leader).toStrictEqual({
      fieldTag: "_",
      content: "00000nam  2200109 a 4500",
    })
  })
  it("has expected control fields", () => {
    expect(everythingMarcModel.controlFields).toStrictEqual([
      {
        content: "      cyyyy2011nyua   f      000 faeng dnam a ",
        marcTag: "008",
      },
    ])
  })
})
