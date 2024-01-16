/**
 * standardizeBibId
 * Transforms bib id to have lower case prefix (b, hb, cb, pb) and trim check digit
 */
export function standardizeBibId(bibId: string): string {
  // nypl bib ids could have a 9th digit, a check digit which can be 0-9 or x.
  const nypl = bibId.match(/^([bB])(\d{8})[\dxX]?$/)
  const princeton = bibId.match(/^([pP][bB])(\d{6,16})$/)
  const columbia = bibId.match(/^([cC][bB])(\d{6,9})$/)
  const harvard = bibId.match(/^([hH][bB])(\d{6,18})$/)
  const matches = [nypl, princeton, columbia, harvard].find(
    (match) => match?.length === 3
  )
  if (matches) {
    const prefix = matches[1].toLowerCase()
    const number = matches[2]
    return prefix + number
  }
  return bibId
}

export const rtlOrLtr = (value: string) => {
  return isRtl(value) ? "rtl" : "ltr"
}

// The "\u200F" right-to-left mark is found at the beginning of fields known
// to be written in a script that reads from right to left
const isRtl = (value: string) => value.substring(0, 1) === "\u200F"

export const isItTheLastElement = (i, array) => !(i < array.length - 1)
