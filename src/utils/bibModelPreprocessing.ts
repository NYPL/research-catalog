import type { SearchResult, Note } from "../types/searchTypes"

const getGroupedNotes = (bib: SearchResult) => {
  const note = bib?.note?.length ? bib.note : null
  let notesGroupedByNoteType = {}

  /**
   * getNoteType(note)
   * Construct label for a note by adding the word 'Note'
   */
  const getNoteType = (note: Note) => {
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
 */
const interleaveParallel = (arr1: string[], arr2: string[]) =>
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
 * Skips over subject fields since these require changes to SHEP.
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
  return { ...bibWithMatchedParallels, groupedNotes }
}

export { getGroupedNotes, interleaveParallel, matchParallels }
