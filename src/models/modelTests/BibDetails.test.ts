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
  physicalDescriptionBib,
  bibWithSeries,
} from "../../../__test__/fixtures/bibFixtures"
import type {
  LinkedBibDetail,
  LinkingEntryValue,
} from "../../types/bibDetailsTypes"
import type { AnnotatedMarc } from "../../types/marcTypes"
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

  const bibWithSeriesModel = new BibDetailsModel(
    bibWithSeries.resource,
    bibWithSeries.annotatedMarc
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
  describe("Description", () => {
    const physicalDescriptionBibModel = new BibDetailsModel(
      physicalDescriptionBib
    )
    it("populates Description with physicalDescription", () => {
      const description = physicalDescriptionBibModel.bottomDetails.find(
        (detail) => detail.label === "Description"
      ).value
      expect(description).toStrictEqual(
        physicalDescriptionBib.physicalDescription
      )
    })
  })
  describe("Summary", () => {
    const physicalDescriptionBibModel = new BibDetailsModel(
      physicalDescriptionBib
    )
    it("populates summary with summary instead of description", () => {
      const summary = physicalDescriptionBibModel.bottomDetails.find(
        (detail) => detail.label === "Summary"
      ).value
      expect(summary).toStrictEqual(physicalDescriptionBib.description)
    })
    it("populates summary with description when summary is not present", () => {
      const summaryValue = ["summary"]
      const summaryBibModel = new BibDetailsModel({
        ...physicalDescriptionBib,
        summary: summaryValue,
      })
      const summary = summaryBibModel.bottomDetails.find(
        (detail) => detail.label === "Summary"
      ).value
      expect(summary).toStrictEqual(summaryValue)
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
            searchValue: "Image",
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
            searchValue: "Image",
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
              searchValue: "Mansfield, Ohio",
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
              searchValue:
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
    it("creates authors with correct internal urls and role text", () => {
      const additionalAuthors = bibWithNoParallelsModel.bottomDetails.find(
        (d) => d.label === "Additional authors"
      ) as LinkedBibDetail
      expect(additionalAuthors.link).toBe("internal")
      expect(additionalAuthors.value[0].text).toContain("ballet dancer")
      expect(additionalAuthors.value[0].url).toContain("/browse/author-title/")
    })

    it("creates subjects with correct internal urls", () => {
      const subjects = bibWithSubjectHeadingsModel.bottomDetails.find(
        (d) => d.label === "Subject"
      ) as LinkedBibDetail
      expect(subjects.link).toBe("internal")
      expect(subjects.value[0].url).toContain("/browse/subjects/")
    })
    it("sets browseValue on subjects for use in the subject index browse link", () => {
      const subjects = bibWithSubjectHeadingsModel.bottomDetails.find(
        (d) => d.label === "Subject"
      ) as LinkedBibDetail
      expect(subjects.value[0].browseValue).toEqual(
        subjects.value[0].searchValue
      )
    })
    it("creates series fields and merges series uniform title into series added entry", () => {
      const series = bibWithSeriesModel.bottomDetails.find(
        (d) => d.label === "Series"
      ) as LinkedBibDetail
      expect(series.link).toBe("internal")
      expect(series.value[0].url).toContain("search?filters[series][0]")
      expect(series.value[0].searchValue).toEqual(
        "Inediti e rarità rossiniane ;"
      )
      expect(series.value[0].text).toEqual("Inediti e rarità rossiniane ; 12")
      const seriesAddedEntry = bibWithSeriesModel.bottomDetails.find(
        (d) => d.label === "Series added entry"
      ) as LinkedBibDetail
      // Value is from seriesUniformTitle
      expect(seriesAddedEntry.value[0].searchValue).toEqual(
        "Rossini, Gioacchino 1792-1868. Works. Selections (Boccaccini & Spada editore) ;"
      )
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
    it("combines parallel author display text with the primary display object", () => {
      const model = new BibDetailsModel({
        ...parallelsBib.resource,
        creatorLiteral: ["Tolstoy, Leo, 1828-1910"],
        creatorDisplay: [
          {
            displayLabel: "Tolstoy, Leo, 1828-1910",
            name: "Tolstoy, Leo, 1828-1910",
            nameTitle: "Tolstoy, Leo, 1828-1910",
          },
        ],
        // @ts-ignore
        parallelCreatorsDisplay: [
          {
            displayLabel: "Толстой, Лев Николаевич, 1828-1910",
            name: "Толстой, Лев Николаевич, 1828-1910",
            nameTitle: "Толстой, Лев Николаевич, 1828-1910",
          },
        ],
      })
      const author = model.topDetails.find(
        (detail) => detail.label === "Author"
      ) as LinkedBibDetail
      expect(author.value.map((v) => v.text)).toEqual([
        "Толстой, Лев Николаевич, 1828-1910",
        "Tolstoy, Leo, 1828-1910",
      ])
    })
    it("excludes the creator's duplicate entry from contributorDisplay so parallels stay aligned", () => {
      const model = new BibDetailsModel({
        ...parallelsBib.resource,
        creatorLiteral: ["Liu, Li, 1953 December 12-", "Liu, Li, 2"],
        creatorDisplay: [
          {
            displayLabel: "Liu, Li, 1953 December 12-, author",
            name: "Liu, Li, 1953 December 12-",
            nameTitle: "Liu, Li, 1953 December 12-",
          },
          {
            displayLabel: "Liu, Li, 2",
            name: "Liu, Li, 2",
            nameTitle: "Liu, Li, 2",
          },
        ],
        // @ts-ignore
        parallelCreatorsDisplay: [
          {
            displayLabel: "刘莉, 1953 December 12-, author",
            name: "刘莉, 1953 December 12-",
            nameTitle: "刘莉, 1953 December 12-",
          },
        ],
        contributorLiteral: ["Chen, Xingcan"],
        // Contributor list redundantly repeats the creator, but its parallel
        // (translated) value is never repeated in parallelContributorsDisplay
        contributorDisplay: [
          {
            displayLabel: "Liu, Li, 1953 December 12-, author",
            name: "Liu, Li, 1953 December 12-",
            nameTitle: "Liu, Li, 1953 December 12-",
          },
          {
            displayLabel: "Liu, Li, 2",
            name: "Liu, Li, 2",
            nameTitle: "Liu, Li, 2",
          },
          {
            displayLabel: "Chen, Xingcan, author",
            name: "Chen, Xingcan",
            nameTitle: "Chen, Xingcan",
          },
        ],
        // @ts-ignore
        parallelContributorsDisplay: [
          {
            displayLabel: "陈星灿, author",
            name: "陈星灿",
            nameTitle: "陈星灿",
          },
        ],
      })
      const additionalAuthors = model.bottomDetails.find(
        (detail) => detail.label === "Additional authors"
      ) as LinkedBibDetail
      expect(additionalAuthors.value.map((v) => v.text)).toEqual([
        "陈星灿, author",
        "Chen, Xingcan, author",
      ])
    })
    it("excludes the creator duplicate entry from parallelContributorsDisplay too", () => {
      const model = new BibDetailsModel({
        ...parallelsBib.resource,
        creatorLiteral: ["Liu, Li, 1953 December 12-"],
        creatorDisplay: [
          {
            displayLabel: "Liu, Li, 1953 December 12-, author",
            name: "Liu, Li, 1953 December 12-",
            nameTitle: "Liu, Li, 1953 December 12-",
          },
        ],
        // @ts-ignore
        parallelCreatorsDisplay: [
          {
            displayLabel: "刘莉, 1953 December 12-, author",
            name: "刘莉, 1953 December 12-",
            nameTitle: "刘莉, 1953 December 12-",
          },
        ],
        contributorLiteral: ["Chen, Xingcan"],
        // Creator is repeated on both the primary and parallel
        // contributor sides
        contributorDisplay: [
          {
            displayLabel: "Liu, Li, 1953 December 12-, author",
            name: "Liu, Li, 1953 December 12-",
            nameTitle: "Liu, Li, 1953 December 12-",
          },
          {
            displayLabel: "Chen, Xingcan, author",
            name: "Chen, Xingcan",
            nameTitle: "Chen, Xingcan",
          },
        ],
        // @ts-ignore
        parallelContributorsDisplay: [
          {
            displayLabel: "刘莉, 1953 December 12-, author",
            name: "刘莉, 1953 December 12-",
            nameTitle: "刘莉, 1953 December 12-",
          },
          {
            displayLabel: "陈星灿, author",
            name: "陈星灿",
            nameTitle: "陈星灿",
          },
        ],
      })
      const additionalAuthors = model.bottomDetails.find(
        (detail) => detail.label === "Additional authors"
      ) as LinkedBibDetail
      expect(additionalAuthors.value.map((v) => v.text)).toEqual([
        "陈星灿, author",
        "Chen, Xingcan, author",
      ])
    })
    it("excludes the creator from contributorDisplay even when there are no parallels", () => {
      const model = new BibDetailsModel({
        ...noParallels.resources,
        creatorLiteral: ["Copley, Richard"],
        creatorDisplay: [
          {
            displayLabel: "Copley, Richard, author",
            name: "Copley, Richard",
            nameTitle: "Copley, Richard",
          },
        ],
        contributorLiteral: ["Copley, Richard", "Kavenoki, Severin"],
        contributorDisplay: [
          {
            displayLabel: "Copley, Richard, author",
            name: "Copley, Richard",
            nameTitle: "Copley, Richard",
          },
          {
            displayLabel: "Kavenoki, Severin, translator",
            name: "Kavenoki, Severin",
            nameTitle: "Kavenoki, Severin",
          },
        ],
      })
      const additionalAuthors = model.bottomDetails.find(
        (detail) => detail.label === "Additional authors"
      ) as LinkedBibDetail
      expect(additionalAuthors.value.map((v) => v.text)).toEqual([
        "Kavenoki, Severin, translator",
      ])
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

  describe("linking entries", () => {
    const model = new BibDetailsModel(
      parallelsBib.resource,
      parallelsBib.annotatedMarc as AnnotatedMarc
    )

    it("builds a linking entry detail for every distinct, consecutive label", () => {
      const labels = parallelsBib.resource.linkingEntry.map((e) => e.label)
      const distinctConsecutiveLabels = labels.filter(
        (label, i) => label !== labels[i - 1]
      )
      distinctConsecutiveLabels.forEach((label) => {
        expect(
          model.bottomDetails.find((detail) => detail.label === label)
        ).toBeDefined()
      })
    })

    it("groups consecutive linking entries with the same label into a single bottom detail", () => {
      const supplementDetail = model.bottomDetails.find(
        (detail) => detail.label === "Has supplement"
      )
      expect(supplementDetail.value).toHaveLength(2)
    })

    it("builds each grouped value with display, url, and parallelDisplay", () => {
      const supplementDetail = model.bottomDetails.find(
        (detail) => detail.label === "Has supplement"
      )
      expect(supplementDetail.value).toEqual([
        {
          display: "Preporučeno 2005- 1452-3531",
          url: "/search/linking-entry/b15349955/770/0/7416253458",
          parallelDisplay: "Препоручено 2005- 1452-3531",
        },
        {
          display: "Vidi čuda 2006- 1452-7316",
          url: "/search/linking-entry/b15349955/770/1/4848864099",
          parallelDisplay: "Види чуда 2006- 1452-7316",
        },
      ])
    })

    it("builds the linking entry detail with correct display, url, and parallel", () => {
      const continuesDetail = model.bottomDetails.find(
        (detail) => detail.label === "Continues"
      )
      expect(continuesDetail.value).toEqual([
        {
          display: "Povelja oktobra 0350-1469 (OCoLC)220384499",
          url: "/search/linking-entry/b15349955/780/0/10305113855",
          parallelDisplay: "Повеља октобра 0350-1469 (OCoLC)220384499",
        },
      ])
    })

    it("does not set parallelDisplay when there is no corresponding parallel linking entry", () => {
      const otherFormsDetail = model.bottomDetails.find(
        (detail) => detail.label === "Other forms"
      )
      expect(otherFormsDetail.value).toEqual([
        {
          display: "Online version: Povelja (OCoLC)760047199",
          url: "/search/linking-entry/b15349955/776/0/2667508392",
          parallelDisplay: null,
        },
      ])
    })

    it("does not keep a duplicate 'Alternate script for' annotated MARC field that's covered by the linking entry's parallelDisplay", () => {
      const alternateScriptDetail = model.bottomDetails.find(
        (detail) => detail.label === "Alternate script for continues"
      )
      expect(alternateScriptDetail).toBeUndefined()
    })

    describe("label switching behavior", () => {
      it("creates a separate detail for each distinct consecutive label", () => {
        const linkingEntryLabels = [
          "Has supplement",
          "Has supplement",
          "Other forms",
          "Continues",
        ]
        const distinctConsecutiveLabels = linkingEntryLabels.filter(
          (label, i) => label !== linkingEntryLabels[i - 1]
        )

        expect(distinctConsecutiveLabels).toEqual([
          "Has supplement",
          "Other forms",
          "Continues",
        ])

        const bottomDetailLabels = model.bottomDetails
          .filter((detail) => distinctConsecutiveLabels.includes(detail.label))
          .map((detail) => detail.label)

        expect(bottomDetailLabels).toEqual(distinctConsecutiveLabels)
      })

      it("groups consecutive entries with the same label into a single value array", () => {
        const supplementDetail = model.bottomDetails.find(
          (detail) => detail.label === "Has supplement"
        )
        expect(supplementDetail).toBeDefined()
        const values = supplementDetail.value as LinkingEntryValue[]
        expect(values).toHaveLength(2)
        expect(values[0].display).toBe("Preporučeno 2005- 1452-3531")
        expect(values[1].display).toBe("Vidi čuda 2006- 1452-7316")
      })

      it("starts a new detail when label changes from 'Has supplement' to 'Other forms'", () => {
        const otherFormsDetail = model.bottomDetails.find(
          (detail) => detail.label === "Other forms"
        )
        expect(otherFormsDetail).toBeDefined()
        const values = otherFormsDetail.value as LinkingEntryValue[]
        expect(values).toHaveLength(1)
        expect(values[0].display).toBe(
          "Online version: Povelja (OCoLC)760047199"
        )
      })

      it("captures final label after last label switch", () => {
        const continuesDetail = model.bottomDetails.find(
          (detail) => detail.label === "Continues"
        )
        expect(continuesDetail).toBeDefined()
        const values = continuesDetail.value as LinkingEntryValue[]
        expect(values).toHaveLength(1)
        expect(values[0].display).toBe(
          "Povelja oktobra 0350-1469 (OCoLC)220384499"
        )
      })

      it("preserves correct order of grouped labels and their values", () => {
        const linkingLabels = model.bottomDetails
          .filter((detail) =>
            ["Has supplement", "Other forms", "Continues"].includes(
              detail.label
            )
          )
          .map((detail) => ({
            label: detail.label,
            valueCount: (detail.value as LinkingEntryValue[]).length,
          }))

        expect(linkingLabels).toEqual([
          { label: "Has supplement", valueCount: 2 },
          { label: "Other forms", valueCount: 1 },
          { label: "Continues", valueCount: 1 },
        ])
      })
    })

    describe("parallelDisplay handling", () => {
      it("includes parallelDisplay values for entries with parallel data", () => {
        const supplementDetail = model.bottomDetails.find(
          (detail) => detail.label === "Has supplement"
        )
        const values = supplementDetail.value as LinkingEntryValue[]
        expect(values[0].parallelDisplay).toBe("Препоручено 2005- 1452-3531")
        expect(values[1].parallelDisplay).toBe("Види чуда 2006- 1452-7316")
      })

      it("sets parallelDisplay to null when no corresponding parallel entry exists", () => {
        const otherFormsDetail = model.bottomDetails.find(
          (detail) => detail.label === "Other forms"
        )
        const values = otherFormsDetail.value as LinkingEntryValue[]
        expect(values[0].parallelDisplay).toBeNull()
      })
    })
  })
})
