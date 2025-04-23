import type { DiscoveryBibResult, Note } from "../types/bibTypes"
import type {
  LinkedBibDetail,
  BibDetail,
  FieldMapping,
  AnnotatedMarcField,
  BibDetailURL,
  AnnotatedMarc,
  AnyBibDetail,
} from "../types/bibDetailsTypes"
import { convertToSentenceCase } from "../utils/appUtils"

export default class BibDetails {
  bib: DiscoveryBibResult
  annotatedMarcDetails: AnyBibDetail[]
  holdingsDetails: AnyBibDetail[]
  topDetails: AnyBibDetail[]
  bottomDetails: AnyBibDetail[]
  groupedNotes: AnyBibDetail[]
  supplementaryContent: LinkedBibDetail
  extent: string[]
  subjectLiteral: BibDetailURL[][]
  owner: string[]
  findingAid?: BibDetailURL

  constructor(
    discoveryBibResult: DiscoveryBibResult,
    annotatedMarc?: AnnotatedMarc
  ) {
    this.bib = this.matchParallelToPrimaryValues(discoveryBibResult)
    // these properties are not string[] so they require separate processing
    this.supplementaryContent = this.buildSupplementaryContent()
    this.findingAid = this.buildFindingAid()
    this.groupedNotes = this.buildGroupedNotes()
    this.extent = this.buildExtent()
    this.owner = this.buildOwner()
    // If we can't retreive subject headings from the SHEP API, we'll use the subjectLiteral
    this.subjectLiteral =
      this.buildSubjectHeadings() || this.buildSubjectLiterals()
    // these are the actual arrays of details that will be displayed
    this.annotatedMarcDetails = this.buildAnnotatedMarcDetails(
      annotatedMarc?.fields
    )
    this.holdingsDetails = this.buildHoldingsDetails(this.bib.holdings)
    this.topDetails = this.buildTopDetails()
    this.bottomDetails = this.buildBottomDetails()
  }

  buildOwner(): string[] {
    if (!this.bib.items) return null

    const firstRecapItem = this.bib.items
      // Only consider items with a Recap source id
      .find((item) => /^Recap/.test(item?.idNyplSourceId?.["@type"]))
    // Only consider items with an `owner` (should be all, in practice)
    const owner = firstRecapItem?.owner?.[0]?.prefLabel
    if (owner) return [owner]
  }

  buildAnnotatedMarcDetails(
    annotatedMarc: AnnotatedMarcField[]
  ): AnyBibDetail[] {
    if (!annotatedMarc) return []
    return annotatedMarc.map(({ label, values }: AnnotatedMarcField) => {
      if (label === "Connect to:") {
        const urlValues = values.map(({ label, content }) => ({
          url: content,
          urlLabel: label,
        }))
        return this.buildExternalLinkedDetail("Connect to:", urlValues)
      } else {
        const fieldValues = values.map((val) => val.content)
        return this.buildDetail(label, fieldValues)
      }
    })
  }

  buildHoldingsDetails(holdings): BibDetail[] {
    if (!holdings) return []
    return holdings
      ?.map((holding) => {
        return [
          { label: "Location", field: "location" },
          { label: "Format", field: "format" },
          { label: "Call number", field: "shelfMark" },
          { label: "Library has", field: "holdingStatement" },
          { label: "Notes", field: "notes" },
        ]
          .map((fieldMapping) => this.buildHoldingDetail(holding, fieldMapping))
          .filter((f) => f)
      })
      .flat()
  }

  buildTopDetails(): AnyBibDetail[] {
    return [
      { field: "titleDisplay", label: "Title" },
      { field: "publicationStatement", label: "Published by" },
      // external link
      { field: "supplementaryContent", label: "Supplementary content" },
      // internal link
      { field: "creatorLiteral", label: "Author" },
    ]
      .map((fieldMapping) => {
        switch (fieldMapping.field) {
          case "supplementaryContent":
            return this.supplementaryContent
          case "creatorLiteral":
            return this.buildSearchFilterUrl(fieldMapping)
          default:
            return this.buildStandardDetail(fieldMapping)
        }
      })
      .filter((f) => f)
  }
  buildBottomDetails(): AnyBibDetail[] {
    const resourceFields = [
      { field: "contributorLiteral", label: "Additional authors" },
      { field: "partOf", label: "Found in" },
      { field: "serialPublicationDates", label: "Publication date" },
      { field: "extent", label: "Description" },
      { field: "description", label: "Summary" },
      { field: "donor", label: "Donor/Sponsor" },
      { field: "seriesStatement", label: "Series statement" },
      { field: "uniformTitle", label: "Uniform title" },
      { field: "titleAlt", label: "Alternative title" },
      { field: "formerTitle", label: "Former title" },
      { field: "subjectLiteral", label: "Subject" },
      { field: "genreForm", label: "Genre/Form" },
      { field: "tableOfContents", label: "Contents" },
      { field: "shelfMark", label: "Call number" },
      { field: "isbn", label: "ISBN" },
      { field: "issn", label: "ISSN" },
      { field: "oclc", label: "OCLC" },
      { field: "lccn", label: "LCCN" },
      { field: "owner", label: "Owning institution" },
    ]
      .map((fieldMapping: FieldMapping): AnyBibDetail => {
        let detail: AnyBibDetail
        if (fieldMapping.field === "contributorLiteral")
          detail = this.buildSearchFilterUrl(fieldMapping)
        else detail = this.buildStandardDetail(fieldMapping)
        return detail
      })
      .filter((f) => f)
    const fieldsWithNotes = this.addNotes(resourceFields)
    const combinedFields = this.combineBibDetailsData(
      fieldsWithNotes,
      this.annotatedMarcDetails
    )
    return combinedFields.filter((f) => f)
  }

  combineBibDetailsData = (
    resourceEndpointDetails: AnyBibDetail[],
    annotatedMarcDetails: AnyBibDetail[]
  ) => {
    const resourceEndpointDetailsLabels = new Set(
      resourceEndpointDetails.map((detail: { label: string }) => {
        return detail.label
      })
    )
    const filteredAnnotatedMarcDetails = annotatedMarcDetails.filter(
      (detail: AnyBibDetail) => !resourceEndpointDetailsLabels.has(detail.label)
    )
    return resourceEndpointDetails.concat(filteredAnnotatedMarcDetails)
  }

  buildHoldingDetail(holding, fieldMapping: FieldMapping) {
    if (!holding[fieldMapping.field]) return null
    const bibFieldValue =
      fieldMapping.field === "location"
        ? // "location" is the only holding field that is an array of
          // objects shaped like { code: "loc:...", label: "..." }
          // Getting the first object in the array.
          [holding[fieldMapping.field][0].label]
        : holding[fieldMapping.field]
    return this.buildDetail(
      convertToSentenceCase(fieldMapping.label),
      bibFieldValue
    )
  }

  buildStandardDetail(fieldMapping: FieldMapping) {
    const bibFieldValue =
      this[fieldMapping.field] || this.bib[fieldMapping.field]
    if (!bibFieldValue) return
    return this.buildDetail(
      convertToSentenceCase(fieldMapping.label),
      bibFieldValue
    )
  }

  buildDetail(label: string, value: string[]): BibDetail {
    if (!value?.length) return null

    return {
      label: convertToSentenceCase(label),
      value,
    }
  }

  buildSearchFilterUrl(fieldMapping: {
    label: string
    field: string
  }): LinkedBibDetail {
    const value = this.bib[fieldMapping.field]
    if (!value?.length) return null
    return {
      link: "internal",
      label: convertToSentenceCase(fieldMapping.label),
      value: value.map((v: string) => {
        const internalUrl = `/search?filters[${
          fieldMapping.field
        }][0]=${encodeURI(v)}`
        return { url: internalUrl, urlLabel: v }
      }),
    }
  }

  buildExternalLinkedDetail(
    label: string,
    values: BibDetailURL[]
  ): LinkedBibDetail {
    if (!values.length) return null
    return {
      link: "external",
      value: values,
      label: convertToSentenceCase(label),
    }
  }

  addNotes(details: AnyBibDetail[]) {
    if (!this.groupedNotes) return details
    else return [...details, ...this.groupedNotes]
  }

  buildGroupedNotes(): BibDetail[] {
    const note = this.bib?.note?.length ? this.bib.note : null

    // Make sure we have at least one note
    if (note && Array.isArray(note)) {
      const notesGroupedByNoteType = note
        .filter((note) => typeof note === "object")
        .reduce((noteGroups, note) => {
          const noteType = this.getNoteType(note)
          if (!noteGroups[noteType]) {
            noteGroups[noteType] = []
          }
          noteGroups[noteType].push(note.prefLabel)
          return noteGroups
        }, {})
      const notesAsDetails = []
      Object.keys(notesGroupedByNoteType).forEach((key: string) => {
        notesAsDetails.push({
          label: convertToSentenceCase(key),
          value: notesGroupedByNoteType[key],
        })
      })
      return notesAsDetails
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
  combineMatchingNotes(primaryValue: string, parallelValue: string | Note) {
    return {
      noteType: parallelValue["noteType"],
      "@type": parallelValue["@type"],
      prefLabel: primaryValue,
    }
  }

  /**
   * Given two arrays, returns the elements interleaved, with falsey elements removed.
   * Also combines data from matching elements when necessary.
   * Example: interleaveParallel ([1, 2, null, 3], [5,6,7,8,9]) =>
   * [1,5,2,6,7,3,8,9].
   * Assumes that arr2 is at least as long as arr1.
   */
  interleaveParallelAndPrimaryValues(
    primaries: string[],
    parallels: string[] | Note[]
  ) {
    const interleavedValues = []
    parallels.forEach((parallelValue, i) => {
      if (primaries[i]) {
        const value =
          parallelValue && parallelValue["noteType"]
            ? this.combineMatchingNotes(primaries[i], parallelValue)
            : primaries[i]
        interleavedValues.push(value)
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
  matchParallelToPrimaryValues(bib: DiscoveryBibResult) {
    const parallelFieldMatches = Object.keys(bib).map((key) => {
      if (key.match(/subject/i)) {
        return null
      }
      const match = key.match(/parallel(.)(.*)/)
      const paralleledField = match && `${match[1].toLowerCase()}${match[2]}`
      const paralleledValues = paralleledField && bib[paralleledField]
      return (
        paralleledValues && {
          [paralleledField]: this.interleaveParallelAndPrimaryValues(
            bib[key],
            paralleledValues
          ),
        }
      )
    })

    return Object.assign({}, bib, ...parallelFieldMatches)
  }

  buildExtent(): string[] {
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
    return modifiedExtent
  }

  buildSupplementaryContent(): LinkedBibDetail {
    if (
      !this.bib.supplementaryContent?.length ||
      // This is not for a known edge case, just here as a safeguard to avoid
      // broken a tags.
      !this.bib.supplementaryContent[0]?.url
    ) {
      return null
    }
    const label = "Supplementary content"
    const values = this.bib.supplementaryContent
      .filter((sc) => !sc.label.toLowerCase().includes("finding aid"))
      .map((sc) => ({
        url: sc.url,
        urlLabel: sc.label,
      }))
    return this.buildExternalLinkedDetail(convertToSentenceCase(label), values)
  }

  buildFindingAid() {
    if (!this.bib.supplementaryContent?.length) {
      return null
    }
    const findingAid = this.bib.supplementaryContent.find(
      (sc) => sc.label.toLowerCase().includes("finding aid") && !!sc.url
    )
    return findingAid || null
  }

  buildSubjectHeadings(): BibDetailURL[][] {
    if (!this.bib.subjectHeadings) return
    const subjectHeadingsUrls = this.bib.subjectHeadings.map((heading) =>
      this.flattenSubjectHeadingUrls(heading)
    )

    return subjectHeadingsUrls?.length && subjectHeadingsUrls
  }

  buildSubjectLiterals(): BibDetailURL[][] {
    if (!this.bib.subjectLiteral) return
    const subjectLiteralUrls = this.bib.subjectLiteral.map(
      (subject: string) => {
        subject = subject.replace(/\.$/, "")
        // stackedSubjectHeadings: ["a", "a -- b", "a -- b -- c"]
        const stackedSubjectHeadings =
          this.constructSubjectLiteralsArray(subject)
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
    return subjectLiteralUrls
  }

  constructSubjectLiteralsArray(subject: string) {
    // subject = "Italian food -- Spaghetti"
    let stackedSubjectLiteral = ""

    return subject
      .split(" -- ") // ["Italian food", "spaghetti"]
      .map((urlString, index) => {
        const dashDivided = index !== 0 ? " -- " : ""
        // First iteration "Italian food"
        // Second iteration "Italian food -- spaghetti"
        stackedSubjectLiteral = `${stackedSubjectLiteral}${dashDivided}${urlString}`

        return stackedSubjectLiteral
      })
  }

  /**
   * Flatten subject headings into a list of objects with a url and a label
   */
  flattenSubjectHeadingUrls(heading): BibDetailURL[] | null {
    if (!heading.label || !heading.uuid) return null
    const subjectHeadingsArray = []

    // iterate through each nested subject until there's no parent element
    let currentHeading = heading

    while (currentHeading.parent) {
      subjectHeadingsArray.unshift(
        this.getSubjectHeadingUrl(currentHeading.uuid, currentHeading.label)
      )
      currentHeading = currentHeading.parent
    }
    // add the top level subject heading
    subjectHeadingsArray.unshift(
      this.getSubjectHeadingUrl(currentHeading.uuid, currentHeading.label)
    )
    return subjectHeadingsArray
  }

  getSubjectHeadingUrl(uuid: string, label: string): BibDetailURL {
    return {
      url: `/subject_headings/${uuid}?label=${encodeURIComponent(label)}`,
      urlLabel: label.split(" -- ").pop(),
    }
  }
}
