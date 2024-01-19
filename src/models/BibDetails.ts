import type { Bib, Note } from "../types/bibTypes"
import type {
  LinkedBibDetail,
  BibDetail,
  FieldMapping,
} from "../types/bibDetailsTypes"

interface BibDetails extends Bib {
  groupedNotes: object
}
export default class BibDetailsModel {
  bib: BibDetails
  constructor(bib: Bib) {
    this.bib = this.matchParallels(bib)
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
      .map((fieldMapping) => this.buildHoldingDetail(fieldMapping))
      .filter((f) => f)
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
        if (fieldMapping.field === "supplementaryContent")
          return this.supplementaryContent
        else if (fieldMapping.field === "creatorLiteral")
          return this.buildInternalLinkedDetail(fieldMapping)
        else return this.buildStandardDetail(fieldMapping)
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
      { field: "subjectLiteral", label: "Subjects" },
      { field: "genreForm", label: "Genre/Form" },
      { field: "note", label: "Notes" },
      { field: "tableOfContents", label: "Contents" },
      { field: "shelfMark", label: "Call Number" },
      { field: "isbn", label: "ISBN" },
      { field: "issn", label: "ISSN" },
      { field: "oclc", label: "OCLC" },
      { field: "lccn", label: "LCCN" },
      { field: "owner", label: "Owning Institution" },
    ]
      .map((fieldMapping) => {
        let detail
        if (fieldMapping.field === "contributorLiteral")
          detail = this.buildInternalLinkedDetail(fieldMapping)
        else if (fieldMapping.field === "note") detail = this.groupedNotes
        else if (fieldMapping.field === "subjectLiteral")
          detail = this.subjectHeadings
        else if (fieldMapping.field === "extent") detail = this.extent
        else if (fieldMapping.field === "owner")
          detail = this.bib.owner?.prefLabel
        else detail = this.buildStandardDetail(fieldMapping)
        return detail
      })
      .filter((f) => f)
  }

  buildHoldingDetail(fieldMapping: FieldMapping) {
    const bibFieldValue = this.bib.holdings[fieldMapping.field]
    return this.buildDetail(fieldMapping.label, bibFieldValue)
  }

  buildStandardDetail(fieldMapping: FieldMapping) {
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
        const internalUrl = `/search?filters[${
          fieldMapping.field
        }][0]=${encodeURI(v)}`
        return { url: internalUrl, urlLabel: v }
      }),
    }
  }

  get groupedNotes() {
    const note = this.bib?.note?.length ? this.bib.note : null

    // Make sure we have at least one note
    if (note && Array.isArray(note)) {
      // Group notes by noteType:
      return (
        note
          // Make sure all notes are blanknodes:
          .filter((note) => typeof note === "object")
          .reduce((groups, note) => {
            const noteType = this.getNoteType(note)
            if (!groups[noteType]) {
              groups[noteType] = []
            }
            groups[noteType].push(note.prefLabel)
            return groups
          }, {})
      )
    }
  }

  /**
   * getNoteType(note)
   * Construct label for a note by adding the word 'Note'
   */
  getNoteType = (note: Note) => {
    const type = note.noteType || ""
    return type.toLowerCase().includes("note") ? type : `${type} (note)`
  }

  /**
   * Combines properties from matching (i.e. parallel) elements as necessary
   * Right now, this is only needed to add the 'noteType' in case of parallel notes
   */
  combineMatching(primaryValue: string, parallelValue: string | Note) {
    return parallelValue && parallelValue["noteType"]
      ? {
          noteType: parallelValue["noteType"],
          "@type": parallelValue["@type"],
          prefLabel: primaryValue,
        }
      : primaryValue
  }

  /**
   * Given two arrays, returns the elements interleaved, with falsey elements removed.
   * Also combines data from matching elements when necessary.
   * Example: interleaveParallel ([1, 2, null, 3], [5,6,7,8,9]) =>
   * [1,5,2,6,7,3,8,9].
   * Assumes that arr2 is at least as long as arr1.
   */
  interleaveParallel(primaries: string[], parallels: string[] | Note[]) {
    const interleavedValues = []
    parallels.forEach((parallelValue, i) => {
      if (primaries[i]) {
        interleavedValues.push(
          this.combineMatching(primaries[i], parallelValue)
        )
      }
      if (parallelValue) {
        interleavedValues.push(parallelValue)
      }
    })
    return interleavedValues
  }

  /**
   * matchParallels(bib)
   * Given a bib object returns a new copy of the bib in which fields with parallels have been rewritten
   * The new rewritten field interleaves the parallel field and the paralleled (i.e. original) field together.
   * Skips over subject fields since these require changes to SHEP.
   */
  matchParallels(bib: Bib) {
    const parallelFieldMatches = Object.keys(bib).map((key) => {
      if (key.match(/subject/i)) {
        return null
      }
      const match = key.match(/parallel(.)(.*)/)
      const paralleledField = match && `${match[1].toLowerCase()}${match[2]}`
      const paralleledValues = paralleledField && bib[paralleledField]
      return (
        paralleledValues && {
          [paralleledField]: this.interleaveParallel(
            bib[key],
            paralleledValues
          ),
        }
      )
    })

    return Object.assign({}, bib, ...parallelFieldMatches)
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

  get subjectHeadings() {
    const subjectLiteralUrls = this.bib.subjectLiteral.map(
      (subject: string) => {
        subject = subject.replace(/\.$/, "")
        // stackedSubjectHeadings: ["a", "a -- b", "a -- b -- c"]
        const stackedSubjectHeadings =
          this.constructSubjectHeadingsArray(subject)
        const filterQueryForSubjectHeading = "/search?filters[subjectLiteral]="
        // splitSubjectHeadings: ["a", "b", "c"]
        const splitSubjectHeadings = subject.split(" -- ")
        return splitSubjectHeadings.map((heading, index) => {
          const urlWithFilterQuery = `${filterQueryForSubjectHeading}${encodeURI(
            stackedSubjectHeadings[index]
          )}`
          return {
            url: urlWithFilterQuery,
            urlLabel: heading,
          }
        })
      }
    )
    return {
      label: "Subjects",
      value: subjectLiteralUrls,
    }
  }

  constructSubjectHeadingsArray(subject: string) {
    // subject = "Italian food -- Spaghetti"
    let stackedSubjectHeading = ""

    return subject
      .split(" -- ") // ["Italian food", "spaghetti"]
      .map((urlString, index) => {
        const dashDivided = index !== 0 ? " -- " : ""
        // First iteration "Italian food"
        // Second iteration "Italian food -- spaghetti"
        stackedSubjectHeading = `${stackedSubjectHeading}${dashDivided}${urlString}`

        return stackedSubjectHeading
      })
  }
}
