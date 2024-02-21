import { locationSlugForLocation } from "../locationUtils"

describe("utils/locations", () => {
  it("returns null if invalid location entity passed in", () => {
    expect(locationSlugForLocation(null)).toEqual(null)
    expect(locationSlugForLocation("hmm")).toEqual(null)
    expect(locationSlugForLocation({})).toEqual(null)
    expect(locationSlugForLocation([])).toEqual(null)
  })

  it("returns relevant slug for locations", () => {
    expect(locationSlugForLocation({ "@id": "loc:lpa" })).toEqual("lpa")
    expect(locationSlugForLocation({ "@id": "loc:lpj0i" })).toEqual("lpa")
    expect(locationSlugForLocation({ "@id": "loc:par" })).toEqual("lpa")
    expect(locationSlugForLocation({ "@id": "loc:pat11" })).toEqual("lpa")
    expect(locationSlugForLocation({ "@id": "loc:mya" })).toEqual("lpa")

    expect(locationSlugForLocation({ "@id": "loc:mab" })).toEqual("schwarzman")
    expect(locationSlugForLocation({ "@id": "loc:maf" })).toEqual("schwarzman")

    expect(locationSlugForLocation({ "@id": "loc:sc" })).toEqual("schomburg")
    expect(locationSlugForLocation({ "@id": "loc:sce" })).toEqual("schomburg")
  })
})
