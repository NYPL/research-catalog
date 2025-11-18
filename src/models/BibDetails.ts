import type { DiscoveryBibResult, Note } from "../types/bibTypes"
import type {
  LinkedBibDetail,
  BibDetail,
  FieldMapping,
  AnnotatedMarcField,
  BibDetailURL,
  AnnotatedMarc,
  AnyBibDetail,
  MarcLinkedDetail,
  MarcDetail,
  AnyMarcDetail,
} from "../types/bibDetailsTypes"
import { convertToSentenceCase } from "../utils/appUtils"
import { getFindingAidFromSupplementaryContent } from "../utils/bibUtils"
import logger from "../../logger"

export default class BibDetails {
  bib: DiscoveryBibResult
  annotatedMarcDetails: AnyMarcDetail[]
  holdingsDetails: AnyBibDetail[]
  topDetails: AnyBibDetail[]
  bottomDetails: AnyBibDetail[]
  groupedNotes: AnyBibDetail[]
  supplementaryContent: LinkedBibDetail
  extent: string[]
  owner: string[]
  findingAid?: string

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
  ): AnyMarcDetail[] {
    if (!annotatedMarc) return []
    return annotatedMarc.map(({ label, values }: AnnotatedMarcField) => {
      const fieldMarcTags = values.map((val) => val.source?.marcTag)
      if (label === "Connect to:") {
        const urlValues = values.map(({ label, content }) => ({
          url: content,
          urlLabel: label,
        }))
        const detail = this.buildExternalLinkedDetail(
          "Connect to:",
          urlValues,
          fieldMarcTags
        )
        return detail as MarcLinkedDetail
      } else {
        const fieldValues = values.map((val) => val.content)
        return this.buildDetail(label, fieldValues, fieldMarcTags) as MarcDetail
      }
    })
  }

  buildDetail(
    label: string,
    value: string[],
    fieldMarcTags?: string[]
  ): BibDetail | MarcDetail {
    if (!value?.length) return null

    const base = { label: convertToSentenceCase(label), value }

    return fieldMarcTags ? { ...base, marcTags: fieldMarcTags } : base
  }

  buildExternalLinkedDetail(
    label: string,
    value: BibDetailURL[],
    fieldMarcTags?: string[]
  ): LinkedBibDetail | MarcLinkedDetail {
    if (!value.length) return null

    const base: LinkedBibDetail = {
      label: convertToSentenceCase(label),
      value,
      link: "external",
    }
    return fieldMarcTags ? { ...base, marcTags: fieldMarcTags } : base
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
      // internal link
      { field: "creatorLiteral", label: "Author" },
      { field: "publicationStatement", label: "Published by" },
      { field: "format", label: "Format" },
      // external link
      { field: "supplementaryContent", label: "Supplementary content" },
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
    const linkedFields = [
      "contributorLiteral",
      "addedAuthorTitle",
      "placeOfPublication",
      "seriesStatement",
      "uniformTitle",
      "subjectLiteral",
      "titleAlt",
      "donor",
    ]
    const resourceFields = [
      { field: "contributorLiteral", label: "Additional authors" },
      { field: "addedAuthorTitle", label: "Author added title" },
      { field: "placeOfPublication", label: "Place of publication" },
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
      { field: "language", label: "Language" },
    ]
      .map((fieldMapping: FieldMapping): AnyBibDetail => {
        const isLinked = linkedFields.includes(fieldMapping.field)
        const detail = isLinked
          ? this.buildSearchFilterUrl(fieldMapping)
          : this.buildStandardDetail(fieldMapping)
        return detail
      })
      .filter((f) => f)

    const fieldsWithNotes = this.addNotes(resourceFields)
    return this.combineBibDetailsData(
      fieldsWithNotes,
      this.annotatedMarcDetails
    )
  }

  combineBibDetailsData(
    resourceEndpointDetails: AnyBibDetail[],
    annotatedMarcDetails: AnyMarcDetail[]
  ): AnyBibDetail[] {
    const normalizeValues = (val: any) => {
      if (!val) return []
      if (Array.isArray(val)) {
        return val
          .flat()
          .map((v) =>
            typeof v === "string"
              ? v.trim()
              : v?.content?.trim() || v?.urlLabel?.trim()
          )
      }
      if (typeof val === "string") return [val.trim()]
      if (val?.content) return [val.content.trim()]
      return [val?.urlLabel?.trim()]
    }

    const labelsSet = new Set(resourceEndpointDetails.map((d) => d.label))
    const resourceValuesSet = new Set<string>()
    const allDetails = [...resourceEndpointDetails, ...(this.topDetails || [])]

    allDetails.forEach((detail) => {
      normalizeValues(detail.value).forEach(
        (v) => v && resourceValuesSet.add(v)
      )
    })

    const filteredMarc: AnyBibDetail[] = []
    const keptByLabel = {}

    annotatedMarcDetails.forEach((detail) => {
      if (labelsSet.has(detail.label)) return
      if (
        detail.label === "Subject" &&
        (!this.bib.subjectLiteral || !this.bib.subjectLiteral.length)
      ) {
        return
      }
      const detailValues = normalizeValues(detail.value)
      const detailMarcTags = detail.marcTags
      // include subjects, which will be displayed but not linked
      const overlap = detailValues.some((v) => resourceValuesSet.has(v))
      if (!overlap) {
        filteredMarc.push(detail)
        // store both values and marc tags in one object per AM label
        keptByLabel[detail.label] = {
          values: detailValues.filter(Boolean),
          marcTags: detailMarcTags,
        }
      }
    })

    if (Object.keys(keptByLabel).length > 0) {
      logger.info(
        `Bib details: Keeping annotated MARC fields on ${this.bib["@id"]}`,
        {
          keptMarcFields: keptByLabel,
        }
      )
    }

    return resourceEndpointDetails.concat(filteredMarc)
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
    let bibFieldValue = this[fieldMapping.field] || this.bib[fieldMapping.field]
    if (!bibFieldValue) return
    // "language" and "format" use JSON-LD format
    if (fieldMapping.field === "language" || fieldMapping.field === "format") {
      bibFieldValue = [bibFieldValue[0]?.prefLabel]
    }
    return this.buildDetail(
      convertToSentenceCase(fieldMapping.label),
      bibFieldValue
    )
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
        const { field } = fieldMapping
        let internalUrl: string
        switch (field) {
          case "subjectLiteral":
            internalUrl = `/browse/subjects/${encodeURIComponent(v)}`
            break
          case "seriesStatement":
            internalUrl = `/search?filters[series][0]=${encodeURIComponent(v)}`
            break
          default:
            internalUrl = `/search?filters[${field}][0]=${encodeURIComponent(
              v
            )}`
        }
        return { url: internalUrl, urlLabel: v }
      }),
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
   * Skips over subject fields.
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

    const isFindingAid = (label: string) => label.includes("finding aid")

    const values = this.bib.supplementaryContent
      // If supplementary content contains a finding aid, don't display it
      .filter((sc) => {
        const scLabel = sc.label?.toLowerCase() || ""
        return !isFindingAid(scLabel)
      })
      .map((sc) => ({
        url: sc.url,
        urlLabel: sc.label,
      }))
    return this.buildExternalLinkedDetail(convertToSentenceCase(label), values)
  }

  buildFindingAid() {
    return getFindingAidFromSupplementaryContent(this.bib.supplementaryContent)
  }
}
