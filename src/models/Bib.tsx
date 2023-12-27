import { Link as DSLink, List } from "@nypl/design-system-react-components"
import ReactElementToJSXString from "react-element-to-jsx-string"

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
  value: Url[]
  // label is the formatted name of the field, such as "Author"
  label: string
  // indicates if a linked bib detail is internal, like a link to a creator
  // literal search, or external, like supplementary content
  link?: "internal" | "external"
}

interface Url {
  url: string
  urlLabel: string
}

export default class Bib {
  bib: ProcessedSearchResult

  constructor(bib: SearchResult) {
    // Preprocessing includes grouping notes into an object with labels as keys,
    // as well as interleaving parallels into primary fields
    this.bib = preProcess(bib)
    // this.subjectLiteral = "to do investigate  subject heading api fallback scenario"
  }

  // field is the discovery-api property that this value is read from. label is
  // the label used to display the field on the front end. link indicates whether
  // a url should be a react router navigation within the app or a full url to
  // leave the catalog.
  buildStandardField(field: string, label: string) {
    const bibFieldValue = this.bib[field]
    if (!bibFieldValue?.length) return null
    return { label, value: bibFieldValue }
  }

  buildInternalLinkField(field: string, label: string): LinkedBibField {
    const value = this.bib[field]
    if (!value?.length) return null
    return {
      link: "internal",
      label,
      value: value.map((v: string) => {
        const internalUrl = `../../search?filters[${field}][0]=${v}`
        return { url: internalUrl, urlLabel: v }
      }),
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
        {field.value.map((val: Url, i: number) => {
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
      !this.bib.supplementaryContent?.length ||
      // This is not for a known edge case, just here as a safeguard to avoid
      // broken a tags.
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
      ["titleDisplay", "Title"],
      ["publicationStatement", "Published By"],
      // external link
      ["supplementaryContent", "Supplementary Content"],
      // internal link
      ["creatorLiteral", "Author"],
    ]
      .map(([apiProperty, label]) => {
        let field
        if (apiProperty === "supplementaryContent")
          field = this.supplementaryContent
        else if (apiProperty === "creatorLiteral")
          field = this.buildInternalLinkField("creatorLiteral", "Author")
        else field = this.buildStandardField(apiProperty, label)
        if (!field) return
        // if (!field.link) return Bib.buildDetailElement(field)
        // else if (field.link === "internal")
        //   return Bib.buildInternalLinkElement(field, apiProperty)
        // else if (field.link === "external")
        //   return Bib.buildExternalLinkElement(field)
        return field
      })
      .filter((f) => f)
    // return <List type="dl">{elements}</List>
    return elements
  }

  get bottomDetails() {
    return [
      ["contributorLiteral", "Additional Authors"],
      ["partOf", "Found In"],
      ["serialPublicationDates", "Publication Date"],
      ["extent", "Description"],
      ["description", "Summary"],
      ["donor", "Donor/Sponsor"],
      ["seriesStatement", "Series Statement"],
      ["uniformTitle", "Uniform Title"],
      ["titleAlt", "Alternative Title"],
      ["formerTitle", "Former Title"],
      ["subjectLiteral", "Subject"],
      ["genreForm", "Genre/Form"],
      ["notes", "Notes"],
      ["tableOfContents", "Contents"],
      ["shelfMark", "Call Number"],
      ["isbn", "ISBN"],
      ["issn", "ISSN"],
      ["oclc", "OCLC"],
      ["lccn", "LCCN"],
    ]
      .map(([apiProperty, label]) => {
        let field
        if (apiProperty === "contributorLiteral")
          field = this.buildInternalLinkField(
            "contributorLiteral",
            "Additional Authors"
          )
        // else if (field === "subjectLiteral")
        //   field =
        else field = this.buildStandardField(apiProperty, label)
        if (!field) return
        return field
      })
      .filter((f) => f)
  }
}
