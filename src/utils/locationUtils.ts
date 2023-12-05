/**
 * Given a location entity (e.g. { '@id': 'loc:ma1234', ... })
 * Returns a "slug" identifying the relevant research center
 * (e.g. 'lpa', 'schwarzman', 'schomburg')
 */
export function locationSlugForLocation(locationEntity) {
  if (!locationEntity || !locationEntity["@id"]) return null

  const sierraId = locationEntity["@id"].replace("loc:", "")
  switch (sierraId.slice(0, 2)) {
    case "my":
    case "lp":
    case "pa":
      return "lpa"
    case "ma":
      return "schwarzman"
    case "sc":
      return "schomburg"
    default:
      return null
  }
}
