import {
  bibWithSupplementaryContent,
  noParallels,
  parallelsBib,
  yiddishBib,
  bibWithSubjectHeadings,
  bibNoItems,
  princetonRecord,
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

  const bibWithSubjectHeadingsModel = new BibDetailsModel(
    bibWithSubjectHeadings.resource,
    bibWithSubjectHeadings.annotatedMarc
  )
  describe.only("owner", () => {
    it("populates owner when owner is present", () => {
      const partnerBib = new BibDetailsModel(princetonRecord)
      expect(partnerBib.owner).toBe("Princeton University Library")
    })
    it("does not populate owner if item is nypl", () => {
      expect(bibWithRtlParallelsModel.owner).toBe(undefined)
    })
    it("can handle no items", () => {
      const noItemsBib = new BibDetailsModel(bibNoItems.resource)
      expect(noItemsBib.owner).toBe(undefined)
    })
  })
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
          label: "Issued by (note)",
          value: ["Issued by: Narodna biblioteka Kraljevo."],
        },
        {
          label: "Linking entry (note)",
          value: [
            "Has supplement, <2005-> : Preporučeno, ISSN 1452-3531",
            "Has supplement, <2006-> : Види чуда, ISSN 1452-7316",
            "Has supplement, <2006-> : Vidi čuda, ISSN 1452-7316",
          ],
        },
        { label: "Source of description (note)", value: ["G. 46, 3 (2016)."] },
      ])
    })
  })
  describe("subjectHeadings", () => {
    it("correctly formats the subjectHeading urls when the subjectHeadings are present in the bib result", () => {
      const subjectHeadingsObject = {
        label: "Subject",
        value: [
          [
            {
              url: "/subject_headings/cf347108-e1f2-4c0f-808a-ac4ace2f0765?label=Cortanze%2C%20G%C3%A9rard%20de",
              urlLabel: "Cortanze, Gérard de",
            },
            {
              url: "/subject_headings/74746d11-638b-4cfb-a72a-9a2bd296e6fd?label=Cortanze%2C%20G%C3%A9rard%20de%20--%20Childhood%20and%20youth",
              urlLabel: "Childhood and youth",
            },
          ],
          [
            {
              url: "/subject_headings/5fd065df-b4e9-48cb-b13c-ea15f36b96b4?label=Authors%2C%20French",
              urlLabel: "Authors, French",
            },
            {
              url: "/subject_headings/e43674a7-5f02-44f1-95cd-dbcc776331b7?label=Authors%2C%20French%20--%2020th%20century",
              urlLabel: "20th century",
            },
            {
              url: "/subject_headings/9391bc26-e44c-44ac-98cc-e3800da51926?label=Authors%2C%20French%20--%2020th%20century%20--%20Biography",
              urlLabel: "Biography",
            },
          ],
          [
            {
              url: "/subject_headings/3a779ed6-8a07-4d27-80ef-e0c2b10fe78e?label=Autobiographical%20Narrative",
              urlLabel: "Autobiographical Narrative",
            },
          ],
        ],
      }
      expect(bibWithSubjectHeadingsModel.subjectHeadings).toMatchObject(
        subjectHeadingsObject
      )
    })
    it("falls back to subject literals when subject headings are absent in the bib and correctly formats the urls", () => {
      const filterQueryForSubjectLiteral = "/search?filters[subjectLiteral]="
      const subjectHeadingsObject = {
        label: "Subject",
        value: [
          [
            {
              url: `${filterQueryForSubjectLiteral}${encodeURI(
                "Authors, French"
              )}`,
              urlLabel: "Authors, French",
            },
            {
              url: `${filterQueryForSubjectLiteral}${encodeURI(
                "Authors, French -- 20th century"
              )}`,
              urlLabel: "20th century",
            },
            {
              url: `${filterQueryForSubjectLiteral}${encodeURI(
                "Authors, French -- 20th century -- Biography"
              )}`,
              urlLabel: "Biography",
            },
          ],
          [
            {
              url: `${filterQueryForSubjectLiteral}${encodeURI(
                "Autobiographical Narrative"
              )}`,
              urlLabel: "Autobiographical Narrative",
            },
          ],
          [
            {
              url: `${filterQueryForSubjectLiteral}${encodeURI(
                "Cortanze, Gérard de"
              )}`,
              urlLabel: "Cortanze, Gérard de",
            },
            {
              url: `${filterQueryForSubjectLiteral}${encodeURI(
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
          (detail) => detail.label === "Call number"
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
        label: "Supplementary content",
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
          (detail) => detail.label === "Additional author"
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
