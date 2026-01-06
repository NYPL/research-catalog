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
  it("has expected control fields in ascending order", () => {
    expect(classicMarcModel.controlFields).toStrictEqual([
      { marcTag: "001", content: "2386894" },
      { marcTag: "003", content: "OCoLC" },
      { marcTag: "005", content: "20000629191647.0" },
      {
        marcTag: "008",
        content: "760820m18881906nyuaf         000 0 eng  camI  ",
      },
    ])
  })
})
