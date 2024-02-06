/**
 * getRecordId
 * Trims actual id number off of record (checkout or hold)
 */
export function getRecordId(recordLink) {
  const match = recordLink.match(/\/(\d+)$/)
  return match ? match[1] : null
}
