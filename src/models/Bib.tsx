import type { ProcessedSearchResult, SearchResult } from "../types/searchTypes"
import type { LinkedBibDetail, BibDetail } from "../types/bibDetail"
import { preProcess } from "../utils/bibModelPreprocessing"

export default class Bib {
  bib: ProcessedSearchResult

  constructor(bib: SearchResult) {
    // Preprocessing includes grouping notes into an object with labels as keys,
    // as well as interleaving parallels into primary fields
    this.bib = preProcess(bib)
    // this.subjectLiteral = "to do investigate  subject heading api fallback scenario"
  }

  buildHoldingDetail(fieldMapping: { label: string; field: string }) {
    const bibFieldValue = this.bib.holdings[fieldMapping.field]
    return this.buildDetail(fieldMapping.label, bibFieldValue)
  }

  buildStandardDetail(fieldMapping: { label: string; field: string }) {
    const bibFieldValue = this.bib[fieldMapping.field]
    return this.buildDetail(fieldMapping.label, bibFieldValue)
  }

  buildDetail(label, value) {
    if (!value?.length) return null
    return { label, value }
  }

  buildInternalLinkedDetail(fieldMapping: {
    label: string
    field: string
  }): LinkedBibDetail {
    const value = this.bib[fieldMapping.field]
    if (!value?.length) return null
    return {
      link: "internal",
      label: fieldMapping.label,
      value: value.map((v: string) => {
        const internalUrl = `/search?filters[${fieldMapping.field}][0]=${v}`
        return { url: internalUrl, urlLabel: v }
      }),
    }
  }

  get extent(): BibDetail {
    let modifiedExtent: string[]
    const { extent, dimensions } = this.bib
    const removeSemiColon = (extent) => [extent[0].replace(/\s*;\s*$/, "")]
    const extentExists = extent && extent[0]
    const dimensionsExists = dimensions && dimensions[0]
    if (!extentExists && !dimensionsExists) return null
    if (!extentExists && dimensionsExists) modifiedExtent = dimensions
    if (extentExists && !dimensionsExists) {
      modifiedExtent = removeSemiColon(extent)
    }
    if (extentExists && dimensionsExists) {
      const parts = removeSemiColon(extent)
      parts.push(dimensions[0])
      modifiedExtent = [parts.join("; ")]
    }
    return {
      label: "Description",
      value: modifiedExtent,
    }
  }

  get supplementaryContent(): LinkedBibDetail {
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
    return [
      { field: "titleDisplay", label: "Title" },
      { field: "publicationStatement", label: "Published By" },
      // external link
      { field: "supplementaryContent", label: "Supplementary Content" },
      // internal link
      { field: "creatorLiteral", label: "Author" },
    ]
      .map((fieldMapping) => {
        let detail
        if (fieldMapping.field === "supplementaryContent")
          detail = this.supplementaryContent
        else if (fieldMapping.field === "creatorLiteral")
          detail = this.buildInternalLinkedDetail(fieldMapping)
        else detail = this.buildStandardDetail(fieldMapping)
        if (!detail) return
        return detail
      })
      .filter((f) => f)
  }

  get holdingsDetails() {
    const holdings = this.bib.holdings
    if (!holdings) return []
    return [
      { label: "Location", field: "location" },
      { label: "Format", field: "format" },
      { label: "Call Number", field: "shelfMark" },
      { label: "Library Has", field: "holdingStatement" },
      { label: "Notes", field: "notes" },
    ]
      .map((fieldMapping) => {
        const detail = this.buildHoldingDetail(fieldMapping)
        return detail
      })
      .filter((f) => f)
  }

  get bottomDetails() {
    return [
      { field: "contributorLiteral", label: "Additional Authors" },
      { field: "partOf", label: "Found In" },
      { field: "serialPublicationDates", label: "Publication Date" },
      { field: "extent", label: "Description" },
      { field: "description", label: "Summary" },
      { field: "donor", label: "Donor/Sponsor" },
      { field: "seriesStatement", label: "Series Statement" },
      { field: "uniformTitle", label: "Uniform Title" },
      { field: "titleAlt", label: "Alternative Title" },
      { field: "formerTitle", label: "Former Title" },
      { field: "subjectLiteral", label: "Subject" },
      { field: "genreForm", label: "Genre/Form" },
      { field: "notes", label: "Notes" },
      { field: "tableOfContents", label: "Contents" },
      { field: "shelfMark", label: "Call Number" },
      { field: "isbn", label: "ISBN" },
      { field: "issn", label: "ISSN" },
      { field: "oclc", label: "OCLC" },
      { field: "lccn", label: "LCCN" },
    ]
      .map((fieldMapping) => {
        let detail
        if (fieldMapping.field === "contributorLiteral")
          detail = this.buildInternalLinkedDetail(fieldMapping)
        // else if (fieldMapping.field === "subjectLiteral")
        //   detail =
        if (fieldMapping.field === "extent") detail = this.extent
        else detail = this.buildStandardDetail(fieldMapping)
        return detail
      })
      .filter((f) => f)
  }
}
