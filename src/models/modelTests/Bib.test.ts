import {
  bibWithSupplementaryContent,
  noParallels,
  parallelsBib,
  yiddishBib,
} from "../../../__test__/fixtures/bibFixtures"
import Bib from "../BibDetails"

describe("Bib model", () => {
  const bibWithSupContentModel = new Bib(bibWithSupplementaryContent)
  const bibWithParallelsModel = new Bib(parallelsBib)
  describe("extent", () => {
    it("should add a semicolon after extent if there is not one already", () => {
      const bib = new Bib({
        identifier: [{ uri: "123456" }],
        extent: ["99 bottles of beer"],
        dimensions: ["99 x 99 cm"],
      })
      expect(bib.extent.value[0].includes("; "))
    })
    it("should append dimensions to extent", () => {
      const bib = new Bib({
        identifier: [{ uri: "123456" }],
        extent: ["99 bottles of beer"],
        dimensions: ["99 x 99 cm"],
      })
      expect(bib.extent.value[0]).toBe("99 bottles of beer; 99 x 99 cm")
    })
    it("should not add semicolon if it already is in extent", () => {
      const bib = new Bib({
        identifier: [{ uri: "123456" }],
        extent: ["700 sheets of woven gold; "],
        dimensions: ["1 x 1 in."],
      })
      expect(bib.extent.value[0]).toBe("700 sheets of woven gold; 1 x 1 in.")
    })
    it("should remove semicolon if there is no dimensions", () => {
      const bib = new Bib({
        identifier: [{ uri: "123456" }],
        extent: ["700 sheets of woven gold; "],
      })
      const anotherBib = new Bib({
        identifier: [{ uri: "123456" }],
        extent: ["700 sheets of woven gold;"],
      })
      expect(bib.extent.value[0]).toBe("700 sheets of woven gold")
      expect(anotherBib.extent.value[0]).toBe("700 sheets of woven gold")
    })
    it("should display dimensions if there are dimensions and no extent", () => {
      const bib = new Bib({
        identifier: [{ uri: "123456" }],
        dimensions: ["1,000,000mm x 7ft"],
      })
      expect(bib.extent.value[0]).toBe("1,000,000mm x 7ft")
    })
    it("should do nothing if there are no dimensions or extent", () => {
      const bib = new Bib({ identifier: [{ uri: "123456" }] })
      expect(bib.extent).toBeNull()
    })
  })
  describe("standard fields", () => {
    it("can handle missing field", () => {
      expect(
        bibWithSupContentModel.bottomDetails.find(
          (detail) => detail.label === "Call Number"
        )
      ).not.toBeDefined()
    })
    it("builds standard fields", () => {
      expect(
        bibWithSupContentModel.bottomDetails.find(
          (detail) => detail.label === "Genre/Form"
        )
      ).toStrictEqual({ label: "Genre/Form", value: ["Humorous fiction."] })
    })
  })
  describe("external linking fields", () => {
    it("can handle missing fields", () => {
      expect(bibWithParallelsModel.supplementaryContent).toBeNull()
    })
    it("includes url in the field", () => {
      expect(bibWithSupContentModel.supplementaryContent).toStrictEqual({
        link: "external",
        label: "Supplementary Content",
        value: [
          {
            urlLabel: "Image",
            url: "http://images.contentreserve.com/ImageType-100/0293-1/{C87D2BB9-0E13-4851-A9E2-547643F41A0E}Img100.jpg",
          },
        ],
      })
    })
  })
  describe("internal linking fields", () => {
    it("can handle missing fields", () => {
      const bogusBib = new Bib({
        ...parallelsBib,
        contributorLiteral: undefined,
      })
      expect(
        bogusBib.topDetails.find(
          (detail) => detail.label === "Additional Author"
        )
      ).not.toBeDefined()
    })
    it("includes prebuilt url", () => {
      expect(
        bibWithSupContentModel.topDetails.find(
          (detail) => detail.label === "Author"
        )
      ).toStrictEqual({
        link: "internal",
        label: "Author",
        value: [
          {
            urlLabel: "Watson, Tom, 1965-",
            url: "/search?filters[creatorLiteral][0]=Watson, Tom, 1965-",
          },
        ],
      })
    })
  })

  describe("preprocessing", () => {
    it("compresses the subject literal array, no parallel subject literal", () => {
      const model = new Bib(parallelsBib)
      expect(model.bib.compressedSubjectLiteral).toStrictEqual([
        "Civilization",
        "Serbia > Civilization > Periodicals",
        "Serbia",
        "Serbia and Montenegro",
      ])
    })
    it("combines parallels and primaries with null values", () => {
      const model = new Bib(parallelsBib)
      expect(model.bib.contributorLiteral).toStrictEqual([
        'Народна библиотека "Стефан Првовенчани," issuing body.',
        'Narodna biblioteka "Stefan Prvovenčani", issuing body.',
        "Народна библиотека Краљево, issuing body.",
        "Narodna biblioteka Kraljevo, issuing body.",
        'Народна библиотека "Радослав Веснић Краљево, issuing body.',
        'Narodna biblioteka "Radoslav Vesnić" Kraljevo, issuing body.',
      ])
      expect(model.bib.publicationStatement).toStrictEqual([
        "Kraljevo : Slovo, 1985-",
        'Краљево : Народна библиотека "Стефан Првовенчани"',
        'Kraljevo : Narodna biblioteka "Stefan Prvovenčani"',
      ])
    })
    it("parallels RTL script", () => {
      const model = new Bib(yiddishBib)
      expect(model.bib.title).toStrictEqual([
        "‏ספר חורוסטוב = Chrostkow book",
        "Sefer Ḥorosṭḳov = Chorostkow book",
      ])
    })
    it("groups notes", () => {
      const model = new Bib(parallelsBib)
      expect(model.bib.groupedNotes).toStrictEqual({
        "Linking Entry (note)": [
          "Has supplement, <2005-> : Preporučeno, ISSN 1452-3531",

          "Has supplement, <2006-> : Види чуда, ISSN 1452-7316",

          "Has supplement, <2006-> : Vidi čuda, ISSN 1452-7316",
        ],
        "Issued By (note)": ["Issued by: Narodna biblioteka Kraljevo."],
        "Language (note)": ["Serbian;"],
        "Source of Description (note)": ["G. 46, 3 (2016)."],
        "Supplement (note)": ["Has supplement, <2012-2016>: Pojedinačno."],
      })
    })
    it("can handle no parallels, and no notes", () => {
      const model = new Bib(noParallels)
      expect(model.bib.groupedNotes).toStrictEqual({})
      expect(model.bib.compressedSubjectLiteral).toStrictEqual([
        "Authors, French > 20th century > Biography",
        "Autobiographical Narrative",
        "Cortanze, Gérard de > Childhood and youth",
      ])
    })
  })
})
