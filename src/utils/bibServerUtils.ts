import { NyplSourceMapper } from "@nypl/node-utils"

export async function isValidBibId(bibId: string): Promise<boolean> {
  try {
    const nyplSourceMapperInstance = await NyplSourceMapper.instance()
    const { type, nyplSource, id } =
      nyplSourceMapperInstance.splitIdentifier(bibId)
    return !!type && !!nyplSource && !!id
  } catch (e) {
    // if some invalid input causes an explosion, we will assume the id is invalid
    return false
  }
}

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
