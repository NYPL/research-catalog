import {
  bibWithSupplementaryContent,
  bibWithFindingAidAndTOC,
  noParallels,
  parallelsBib,
  yiddishBib,
  bibWithSubjectHeadings,
  bibNoItems,
  princetonRecord,
  bibWithItems,
} from "../../../__test__/fixtures/bibFixtures"
import type { LinkedBibDetail } from "../../types/bibDetailsTypes"
import BibDetailsModel from "../BibDetails"

describe("Bib Details model", () => {
  const bibWithSupContentModel = new BibDetailsModel(
    bibWithSupplementaryContent.resource,
    bibWithSupplementaryContent.annotatedMarc
  )

  const bibWithItemsModel = new BibDetailsModel(
    bibWithItems.resource,
    bibWithItems.annotatedMarc
  )
  const bibWithFindingAid = new BibDetailsModel(
    bibWithFindingAidAndTOC.resource,
    bibWithFindingAidAndTOC.annotatedMarc
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
  describe("owner", () => {
    it("populates owner when owner is present", () => {
      const partnerBib = new BibDetailsModel(princetonRecord)
      expect(partnerBib.owner).toStrictEqual(["Princeton University Library"])
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
  describe("extent", () => {
    it("should add a semicolon after extent if there is not one already", () => {
      const bib = new BibDetailsModel({
        identifier: [{ uri: "123456" }],
        extent: ["99 bottles of beer"],
        dimensions: ["99 x 99 cm"],
      })
      expect(bib.extent[0].includes("; "))
    })
    it("should append dimensions to extent", () => {
      const bib = new BibDetailsModel({
        identifier: [{ uri: "123456" }],
        extent: ["99 bottles of beer"],
        dimensions: ["99 x 99 cm"],
      })
      expect(bib.extent[0]).toBe("99 bottles of beer; 99 x 99 cm")
    })
    it("should not add semicolon if it already is in extent", () => {
      const bib = new BibDetailsModel({
        identifier: [{ uri: "123456" }],
        extent: ["700 sheets of woven gold; "],
        dimensions: ["1 x 1 in."],
      })
      expect(bib.extent[0]).toBe("700 sheets of woven gold; 1 x 1 in.")
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
      expect(bib.extent[0]).toBe("700 sheets of woven gold")
      expect(anotherBib.extent[0]).toBe("700 sheets of woven gold")
    })
    it("should display dimensions if there are dimensions and no extent", () => {
      const bib = new BibDetailsModel({
        identifier: [{ uri: "123456" }],
        dimensions: ["1,000,000mm x 7ft"],
      })
      expect(bib.extent[0]).toBe("1,000,000mm x 7ft")
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
          (detail) => detail.label === "Language"
        )
      ).toStrictEqual({ label: "Language", value: ["English"] })
    })
  })
  describe("combined bottom details", () => {
    it("removes fields with matching labels from bottom details", () => {
      const subject = bibWithSupContentModel.bottomDetails.filter(
        (detail) => detail.label === "Subject"
      )
      expect(subject).toHaveLength(1)
      const genreForm = bibWithSupContentModel.bottomDetails.filter(
        (detail) => detail.label === "Genre/form"
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
    it("drops finding aid and table of contents links when necessary", () => {
      // Bib with finding aid, and a table of contents in its electronic resources
      expect(bibWithFindingAid.supplementaryContent).toStrictEqual({
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
  describe("finding aid", () => {
    it("populates finding aid when finding aid is present in supplementary content", () => {
      const findingAidBibModel = new BibDetailsModel(
        bibWithFindingAidAndTOC.resource
      )
      expect(findingAidBibModel.findingAid).toStrictEqual(
        "http://archives.nypl.org/scm/20601"
      )
    })
    it("sets finding aid to null when there is none", () => {
      const noItemsBib = new BibDetailsModel(bibNoItems.resource)
      expect(noItemsBib.findingAid).toBe(null)
    })
  })
  describe("internal linking fields", () => {
    it("links expected resource fields with search filters", () => {
      const placeOfPublication = bibWithItemsModel.bottomDetails.filter(
        (detail) => detail.label === "Place of publication"
      )
      expect(placeOfPublication).toStrictEqual([
        {
          link: "internal",
          label: "Place of publication",
          value: [
            {
              url: "/search?filters[placeOfPublication][0]=Mansfield%2C%20Ohio",
              urlLabel: "Mansfield, Ohio",
            },
          ],
        },
      ])
      const donor = bibWithItemsModel.bottomDetails.filter(
        (detail) => detail.label === "Donor/sponsor"
      )
      expect(donor).toStrictEqual([
        {
          link: "internal",
          label: "Donor/sponsor",
          value: [
            {
              url: "/search?filters[donor][0]=Gift%20of%20the%20DeWitt%20Wallace%20Endowment%20Fund%2C%20named%20in%20honor%20of%20the%20founder%20of%20Reader's%20Digest",
              urlLabel:
                "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
            },
          ],
        },
      ])
    })
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
            url: "/search?filters[creatorLiteral][0]=Watson%2C%20Tom%2C%201965-",
          },
        ],
      })
    })
    it("renders subjects with correct internal urls", () => {
      const subjects = bibWithSubjectHeadingsModel.bottomDetails.find(
        (d) => d.label === "Subject"
      ) as LinkedBibDetail
      expect(subjects.link).toBe("internal")
      expect(subjects.value[0].url).toContain("/browse/subjects/")
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
