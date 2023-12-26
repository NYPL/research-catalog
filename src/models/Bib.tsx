import { Link as DSLink, List } from "@nypl/design-system-react-components"

import RCLink from "../components/RCLink/RCLink"
import type { ProcessedSearchResult, SearchResult } from "../types/searchTypes"
import { preProcess } from "../utils/bibModelPreprocessing"

export interface BibField {
  // label is the formatted name of the field, such as "Author"
  label: string
  // value is the array of metadata, such as "["Author One", "Author Two"]"
  value: string[]
  // indicates if a linked bib detail is internal, like a link to a creator
  // literal search, or external, like supplementary content
  link?: "internal" | "external"
}

interface LinkedBibField {
  value: ExternalUrl[]
  // label is the formatted name of the field, such as "Author"
  label: string
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
  contributorLiteral: BibField
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
    this.contributorLiteral = this.buildStandardField(
      "contributorLiteral",
      "Additional Author",
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
    field: string,
    label: string,
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

  static buildDetailElement(field: BibField) {
    return (
      <>
        <dt>{field.label}</dt>
        {field.value.map((val: string, i: number) => {
          return <dd key={i}>{val}</dd>
        })}
      </>
    )
  }

  static buildInternalLinkElement(field: BibField, filterField: string) {
    return (
      <>
        <dt>{field.label}</dt>
        {field.value.map((val: string, i: number) => {
          const url = `../../search?filters[${filterField}]=${val}`
          return (
            <RCLink href={url} key={i}>
              {val}
            </RCLink>
          )
        })}
      </>
    )
  }

  static buildExternalLinkElement(field: LinkedBibField) {
    return (
      <>
        <dt>{field.label}</dt>
        {field.value.map((val: ExternalUrl, i: number) => {
          return (
            <DSLink href={val.url} key={i}>
              {val.urlLabel}
            </DSLink>
          )
        })}
      </>
    )
  }

  get supplementaryContent(): LinkedBibField {
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
      link: "external",
      label,
      value: values,
    }
  }

  get topDetails() {
    const elements = [
      "titleDisplay",
      "publicationStatement",
      // external link
      "supplementaryContent",
      // internal link
      "creatorLiteral",
    ]
      .map((apiProperty) => {
        const field = this[apiProperty]
        if (!field) return
        if (!field.link) return Bib.buildDetailElement(field)
        else if (field.link === "internal")
          return Bib.buildInternalLinkElement(field, apiProperty)
        else if (field.link === "external")
          return Bib.buildExternalLinkElement(field)
      })
      .filter((f) => f)
    return <List type="dl">{elements}</List>
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
