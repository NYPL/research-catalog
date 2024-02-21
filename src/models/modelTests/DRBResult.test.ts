import { drbRawData } from "../../../__test__/fixtures/drbResultsFixtures"
import type { DRBWork } from "../../types/drbTypes"

import DRBResult from "../DRBResult"

const works = drbRawData?.data?.works

describe("DRBResult model", () => {
  const model = new DRBResult(works[0] as DRBWork)

  it("get basic DRB information for a work", () => {
    expect(model.id).toEqual("84306f57-3285-403a-bff4-3d8286d98183")
    expect(model.title).toEqual("Anatomy of the cat")
    // Authors still contains all the additional properties but are
    // not used and not defined in the model or Author interface
    expect(model.authors).toEqual([
      { name: "Reighard, Jacob (1861-)", lcnaf: "", primary: "true", viaf: "" },
    ])
  })

  it("has selected editions", () => {
    expect(model.editions).toEqual(works[0].editions)
    expect(model.selectedEdition).toEqual(works[0].editions[0])
    expect(model.selectedEdition.items.length).toEqual(4)
  })

  it("has a read online link but no download link", () => {
    expect(model.readOnlineUrl).toEqual(
      "http://sfr-front-end-development.us-east-1.elasticbeanstalk.com/read/3979504"
    )
    expect(model.downloadLink).toEqual(null)
  })
})
