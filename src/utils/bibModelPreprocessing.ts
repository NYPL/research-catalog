import type { AnnotatedMarc, SearchResult } from "../types/searchTypes"

const getGroupedNotes = (bib: SearchResult) => {
  const note = bib?.note?.length ? bib.note : null
  let notesGroupedByNoteType = {}

  /**
   * getNoteType(note)
   * Construct label for a note by adding the word 'Note'
   *
   * @param {object} note
   * @return {string}
   */
  const getNoteType = (note) => {
    const type = note.noteType || ""
    return type.toLowerCase().includes("note") ? type : `${type} (note)`
  }

  if (!note) {
    return notesGroupedByNoteType
  }
  // Make sure we have at least one note
  if (note && Array.isArray(note)) {
    // Group notes by noteType:
    notesGroupedByNoteType = note
      // Make sure all notes are blanknodes:
      .filter((note) => typeof note === "object")
      .reduce((groups, note) => {
        const noteType = getNoteType(note)
        if (!groups[noteType]) {
          groups[noteType] = []
        }
        groups[noteType].push(note.prefLabel)
        return groups
      }, {})
  }

  return notesGroupedByNoteType
}

/**
 * * Given an array of identifier entities and an rdf:type, returns markup to
 * render the values - if any - for the requested type.
 *
 * @param {*} bib
 * @param {*} detailsFields
 * @returns
 */
// const getIdentifiers = (bib: SearchResult, detailsFields = []) => {
//   const bibValues = bib?.identifier
//   const newIdentifiers = {}
//   bibValues &&
//     detailsFields.forEach((fieldObject) => {
//       if (fieldObject.value === "identifier") {
//         const entities = LibraryItem.getIdentifierEntitiesByType(
//           [...bibValues],
//           fieldObject.identifier
//         )
//         if (Array.isArray(entities) && entities.length > 0) {
//           const markup = entities.map((ent, index) => (
//             <span key={index}>
//               {ent["@value"]}
//               {ent.identifierStatus ? <em> ({ent.identifierStatus})</em> : null}
//             </span>
//           ))
//           newIdentifiers[fieldObject.label] = markup
//         }
//       }
//     })

//   return newIdentifiers
// }

/**
 * compressSubjectLiteral(bib)
 * Updates the string structure of subject literals in the bib.
 *
 * @param {object} Bib object
 * @return {array}
 */
const compressSubjectLiteral = (bib: SearchResult) => {
  const subjectLiteral = bib.subjectLiteral
  if (
    subjectLiteral &&
    Array.isArray(subjectLiteral) &&
    subjectLiteral.length
  ) {
    return subjectLiteral.map((item) =>
      item.replace(/\.$/, "").replace(/--/g, ">")
    )
  }
  return undefined
}

/**
 * constructSubjectHeadingsArray(url)
 * Creates an array of subject headings from a URL string, broken up
 * by `>` and divided by `--`.
 *
 * @param {string} url
 * @returns {string[]}
 */
const constructSubjectHeadingsArray = (url = "") => {
  let currentArrayString = ""

  if (!url) {
    return []
  }

  return url
    .replace("filters[subjectLiteral]=", "")
    .split(" > ")
    .map((urlString, index) => {
      const dashDivided = index !== 0 ? " -- " : ""
      currentArrayString = `${currentArrayString}${dashDivided}${urlString}`

      return currentArrayString
    })
}

/**
 * combineMatching(el1, el2)
 * Combines properties from matching (i.e. parallel) elements as necessary
 * Right now, this is only needed to add the 'noteType' in case of parallel notes
 * @param {string} el1
 * @param {object} el2
 * @return {object}
 */

const combineMatching = (el1, el2) =>
  el2 && el2.noteType
    ? { noteType: el2.noteType, "@type": el2["@type"], prefLabel: el1 }
    : el1

/**
 * interleaveParallel(arr1, arr2)
 * Given two arrays, returns the elements interleaved, with falsey elements removed.
 * Also combines data from matching elements when necessary.
 * Example: interleaveParallel ([1, 2, null, 3], [5,6,7,8,9]) =>
 * [1,5,2,6,7,3,8,9].
 * Assumes that arr2 is at least as long as arr1.
 *
 * @param {array} arr1
 * @param {array} arr2
 * @return {array}
 */
const interleaveParallel = (arr1, arr2) =>
  arr2.reduce((acc, el, id) => {
    if (arr1[id]) {
      acc.push(combineMatching(arr1[id], el))
    }
    if (el) {
      acc.push(el)
    }
    return acc
  }, [])

/**
 * matchParallels(bib)
 * Given a bib object returns a new copy of the bib in which fields with parallels have been rewritten
 * The new rewritten field interleaves the parallel field and the paralleled (i.e. original) field together.
 * Skips over subject fields since these require changes to SHEP
 * @param {object} bib
 * @return {object}
 */
const matchParallels = (bib: SearchResult) => {
  const parallelFieldMatches = Object.keys(bib).map((key) => {
    if (key.match(/subject/i)) {
      return null
    }
    const match = key.match(/parallel(.)(.*)/)
    const paralleledField = match && `${match[1].toLowerCase()}${match[2]}`
    const paralleledValues = paralleledField && bib[paralleledField]
    return (
      paralleledValues && {
        [paralleledField]: interleaveParallel(bib[key], paralleledValues),
      }
    )
  })

  return Object.assign({}, bib, ...parallelFieldMatches)
}

export const preProcess = (bib: SearchResult) => {
  const bibWithMatchedParallels = matchParallels(bib)
  const groupedNotes = getGroupedNotes(bibWithMatchedParallels)
  console.log(bib.subjectLiteral)
  const compressedSubjectLiteral = compressSubjectLiteral(bib)
  return { ...bibWithMatchedParallels, groupedNotes, compressedSubjectLiteral }
}

export {
  compressSubjectLiteral,
  constructSubjectHeadingsArray,
  getGroupedNotes,
  interleaveParallel,
  matchParallels,
}
