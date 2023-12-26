import {
  noParallels,
  parallelsBib,
  yiddishBib,
} from "../../../__test__/fixtures/bibFixtures"
import Bib from "../Bib"

describe("Bib model", () => {
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
    it.only("groups notes", () => {
      const model = new Bib(parallelsBib)
      expect(model.bib.groupedNotes).toStrictEqual({
        "Linking Entry (note)": [
          {
            "@type": "bf:Note",
            noteType: "Linking Entry",
            prefLabel: "Has supplement, <2005-> : Preporučeno, ISSN 1452-3531",
          },
          {
            "@type": "bf:Note",
            noteType: "Linking Entry",
            prefLabel: "Has supplement, <2006-> : Види чуда, ISSN 1452-7316",
          },
          {
            "@type": "bf:Note",
            noteType: "Linking Entry",
            prefLabel: "Has supplement, <2006-> : Vidi čuda, ISSN 1452-7316",
          },
        ],
        "Issued By (note)": [
          {
            "@type": "bf:Note",
            noteType: "Issued By",
            prefLabel: "Issued by: Narodna biblioteka Kraljevo.",
          },
        ],
        "Language (note)": [
          { "@type": "bf:Note", noteType: "Language", prefLabel: "Serbian;" },
        ],
        "Source of Description (note)": [
          {
            "@type": "bf:Note",
            noteType: "Source of Description",
            prefLabel: "G. 46, 3 (2016).",
          },
        ],
        "Supplement (note)": [
          {
            "@type": "bf:Note",
            noteType: "Supplement",
            prefLabel: "Has supplement, <2012-2016>: Pojedinačno.",
          },
        ],
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
