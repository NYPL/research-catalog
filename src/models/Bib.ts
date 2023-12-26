import type { ProcessedSearchResult, SearchResult } from "../types/searchTypes"
import { preProcess } from "../utils/bibModelPreprocessing"

export interface BibField {
  // label is the formatted name of the field, such as "Author"
  label: string
  // value is the array of metadata, such as "["Author One", "Author Two"]"
  value: string[] | ExternalUrl[]
  // indicates if a linked bib detail is internal, like a link to a creator
  // literal search, or external, like supplementary content
  link?: "internal" | "external"
}

interface ExternalUrl {
  url: string
  urlLabel: string
}

export default class Bib {
  bib: ProcessedSearchResult
  creatorLiteral: BibField
  issn: BibField
  isbn: BibField
  oclc: BibField
  lccn: BibField
  shelfMark: BibField
  publicationStatement: BibField
  titleDisplay: BibField
  partOf: BibField
  serialPublicationDates: BibField
  extent: BibField
  description: BibField
  donor: BibField
  seriesStatement: BibField
  uniformTitle: BibField
  tableOfContents: BibField
  genreForm: BibField
  titleAlt: BibField
  formerTitle: BibField

  constructor(bib: SearchResult) {
    // Preprocessing includes grouping notes into an object with labels as keys,
    // as well as interleaving parallels into primary fields
    this.bib = preProcess(bib)
    // this.subjectLiteral = "to do investigate  subject heading api fallback scenario"
    this.creatorLiteral = this.buildStandardField(
      "creatorLiteral",
      "Author",
      "internal"
    )
    this.issn = this.buildStandardField("idIssn", "ISSN")
    this.isbn = this.buildStandardField("idIsbn", "ISBN")
    this.oclc = this.buildStandardField("idOclc", "OCLC")
    this.lccn = this.buildStandardField("idLccn", "LCCN")
    this.shelfMark = this.buildStandardField("shelfMark", "Call Number")
    this.publicationStatement = this.buildStandardField(
      "publicationStatement",
      "Publication Statement"
    )
    this.titleDisplay = this.buildStandardField("titleDisplay", "Title")
    this.partOf = this.buildStandardField("Found In", "partOf")
    this.serialPublicationDates = this.buildStandardField(
      "Publication Date",
      "serialPublicationDates"
    )
    this.extent = this.buildStandardField("Description", "extent")
    this.description = this.buildStandardField("Summary", "description")
    this.donor = this.buildStandardField("Donor/Sponsor", "donor")
    this.seriesStatement = this.buildStandardField(
      "Series Statement",
      "seriesStatement"
    )
    this.uniformTitle = this.buildStandardField("Uniform Title", "uniformTitle")
    this.tableOfContents = this.buildStandardField(
      "Contents",
      "tableOfContents"
    )
    this.genreForm = this.buildStandardField("Genre/Form", "genreForm")
    this.titleAlt = this.buildStandardField("Alternative Title", "titleAlt")
    this.formerTitle = this.buildStandardField("Former Title", "formerTitle")
  }

  // field is the discovery-api property that this value is read from. label is
  // the label used to display the field on the front end. link indicates whether
  // a url should be a react router navigation within the app or a full url to
  // leave the catalog.
  buildStandardField(
    label: string,
    field: string,
    link?: "internal" | "external"
  ) {
    const bibFieldValue = this.bib[field]
    if (!bibFieldValue?.length) return null
    else {
      const field = { label, value: bibFieldValue }
      if (link) field["link"] = link
      return field
    }
  }

  get supplementaryContent() {
    if (
      !this.bib.supplementaryContent?.length &&
      !this.bib.supplementaryContent[0]?.url
    ) {
      return null
    }
    const label = "Supplementary Content"
    const values = this.bib.supplementaryContent.map((sc) => {
      return {
        url: sc.url,
        urlLabel: sc.label,
      }
    })
    return {
      label,
      value: values,
    }
  }

  get topDetails() {
    return [
      "titleDisplay",
      "publicationStatement",
      // external link
      "supplementaryContent",
      // internal link
      "creatorLiteral",
    ]
      .map((field) => this[field])
      .filter((f) => f)
  }

  get bottomDetails() {
    return [
      "contributorLiteral",
      "partOf",
      "serialPublicationDates",
      "extent",
      "description",
      "donor",
      "seriesStatement",
      "uniformTitle",
      "titleAlt",
      "formerTitle",
      "subjectLiteral",
      "genreForm",
      "notes",
      "tableOfContents",
      "shelfMark",
      "isbn",
      "issn",
      "oclc",
      "lccn",
    ].map((field) => this[field])
  }
}
