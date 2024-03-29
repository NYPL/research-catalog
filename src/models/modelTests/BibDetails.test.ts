import {
  bibWithSupplementaryContent,
  noParallels,
  parallelsBib,
  yiddishBib,
} from "../../../__test__/fixtures/bibFixtures"
import type { LinkedBibDetail } from "../../types/bibDetailsTypes"
import BibDetailsModel from "../BibDetails"

describe("Bib model", () => {
  const bibWithSupContentModel = new BibDetailsModel(
    bibWithSupplementaryContent.resource,
    bibWithSupplementaryContent.annotatedMarc
  )
  const bibWithParallelsModel = new BibDetailsModel(
    parallelsBib.resource,
    parallelsBib.annotatedMarc
  )
  const bibWithNoParallelsModel = new BibDetailsModel(
    noParallels.resources,
    noParallels.annotatedMarc
  )

  const bibWithRtlParallelsModel = new BibDetailsModel(
    yiddishBib.resource,
    yiddishBib.annotatedMarc
  )
  describe("note", () => {
    it("groups notes into an array of {label, value} details", () => {
      const model = bibWithParallelsModel
      expect(model.groupedNotes).toStrictEqual([
        {
          label: "Supplement (note)",
          value: ["Has supplement, <2012-2016>: Pojedinačno."],
        },
        { label: "Language (note)", value: ["Serbian;"] },
        {
          label: "Issued By (note)",
          value: ["Issued by: Narodna biblioteka Kraljevo."],
        },
        {
          label: "Linking Entry (note)",
          value: [
            "Has supplement, <2005-> : Preporučeno, ISSN 1452-3531",
            "Has supplement, <2006-> : Види чуда, ISSN 1452-7316",
            "Has supplement, <2006-> : Vidi čuda, ISSN 1452-7316",
          ],
        },
        { label: "Source of Description (note)", value: ["G. 46, 3 (2016)."] },
      ])
    })
  })
  describe("subjectHeadings", () => {
    it("maps single subjects to compound heading url", () => {
      const filterQueryForSubjectHeading = "/search?filters[subjectLiteral]="
      const subjectHeadingsObject = {
        label: "Subject",
        value: [
          [
            {
              url: `${filterQueryForSubjectHeading}${encodeURI(
                "Authors, French"
              )}`,
              urlLabel: "Authors, French",
            },
            {
              url: `${filterQueryForSubjectHeading}${encodeURI(
                "Authors, French -- 20th century"
              )}`,
              urlLabel: "20th century",
            },
            {
              url: `${filterQueryForSubjectHeading}${encodeURI(
                "Authors, French -- 20th century -- Biography"
              )}`,
              urlLabel: "Biography",
            },
          ],
          [
            {
              url: `${filterQueryForSubjectHeading}${encodeURI(
                "Autobiographical Narrative"
              )}`,
              urlLabel: "Autobiographical Narrative",
            },
          ],
          [
            {
              url: `${filterQueryForSubjectHeading}${encodeURI(
                "Cortanze, Gérard de"
              )}`,
              urlLabel: "Cortanze, Gérard de",
            },
            {
              url: `${filterQueryForSubjectHeading}${encodeURI(
                "Cortanze, Gérard de -- Childhood and youth"
              )}`,
              urlLabel: "Childhood and youth",
            },
          ],
        ],
      }
      expect(bibWithNoParallelsModel.subjectHeadings).toMatchObject(
        subjectHeadingsObject
      )
    })
  })
  describe("extent", () => {
    it("should add a semicolon after extent if there is not one already", () => {
      const bib = new BibDetailsModel({
        identifier: [{ uri: "123456" }],
        extent: ["99 bottles of beer"],
        dimensions: ["99 x 99 cm"],
      })
      expect(bib.extent.value[0].includes("; "))
    })
    it("should append dimensions to extent", () => {
      const bib = new BibDetailsModel({
        identifier: [{ uri: "123456" }],
        extent: ["99 bottles of beer"],
        dimensions: ["99 x 99 cm"],
      })
      expect(bib.extent.value[0]).toBe("99 bottles of beer; 99 x 99 cm")
    })
    it("should not add semicolon if it already is in extent", () => {
      const bib = new BibDetailsModel({
        identifier: [{ uri: "123456" }],
        extent: ["700 sheets of woven gold; "],
        dimensions: ["1 x 1 in."],
      })
      expect(bib.extent.value[0]).toBe("700 sheets of woven gold; 1 x 1 in.")
    })
    it("should remove semicolon if there is no dimensions", () => {
      const bib = new BibDetailsModel({
        identifier: [{ uri: "123456" }],
        extent: ["700 sheets of woven gold; "],
      })
      const anotherBib = new BibDetailsModel({
        identifier: [{ uri: "123456" }],
        extent: ["700 sheets of woven gold;"],
      })
      expect(bib.extent.value[0]).toBe("700 sheets of woven gold")
      expect(anotherBib.extent.value[0]).toBe("700 sheets of woven gold")
    })
    it("should display dimensions if there are dimensions and no extent", () => {
      const bib = new BibDetailsModel({
        identifier: [{ uri: "123456" }],
        dimensions: ["1,000,000mm x 7ft"],
      })
      expect(bib.extent.value[0]).toBe("1,000,000mm x 7ft")
    })
    it("should do nothing if there are no dimensions or extent", () => {
      const bib = new BibDetailsModel({ identifier: [{ uri: "123456" }] })
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
  describe("combined bottom details", () => {
    it("removes fields with matching labels from bottom details", () => {
      const subject = bibWithSupContentModel.bottomDetails.filter(
        (detail) => detail.label === "Subject"
      )
      expect(subject).toHaveLength(1)
      const genreForm = bibWithSupContentModel.bottomDetails.filter(
        (detail) => detail.label === "Genre/Form"
      )
      expect(genreForm).toHaveLength(1)
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
      const bogusBib = new BibDetailsModel({
        ...parallelsBib.resource,
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
            url: "/search?filters[creatorLiteral][0]=Watson,%20Tom,%201965-",
          },
        ],
      })
    })
  })

  describe("parallels", () => {
    it("combines parallels and primaries with null values", () => {
      const model = bibWithParallelsModel
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
      const model = bibWithRtlParallelsModel
      expect(model.bib.title).toStrictEqual([
        "‏ספר חורוסטוב = Chrostkow book",
        "Sefer Ḥorosṭḳov = Chorostkow book",
      ])
    })
    it("can handle no parallels, and no notes", () => {
      const model = bibWithNoParallelsModel
      expect(model.groupedNotes).toBeUndefined
    })
  })
  describe("annotated marc fields", () => {
    const details = bibWithSupContentModel.annotatedMarcDetails
    it("generates external link detail for Connect To urls", () => {
      const connectTo = details.filter(
        (field) => field.label === "Connect to:"
      )[0] as LinkedBibDetail
      expect(connectTo.link).toBe("external")
    })
    it("builds details for all of the annotated marc fields", () => {
      expect(details).toHaveLength(
        bibWithSupplementaryContent.annotatedMarc.fields.length
      )
    })
  })
})
