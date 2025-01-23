import type { ItemLocationKey, ItemLocation } from "../types/itemTypes"

export const itemAvailableIds = ["status:a", "status:o"]

// Default delivery location for an item.
export const defaultNYPLLocation: ItemLocation = {
  "@id": "",
  prefLabel: "Check with Staff",
  customerCode: "",
}

// Default delivery location for a partner Recap item.
export const partnerDefaultLocation: ItemLocation = {
  "@id": "",
  prefLabel: "Off-site",
  customerCode: "",
}

export const locationEndpointsMap: Record<ItemLocationKey, string> = {
  Schwarzman: "schwarzman",
  Performing: "lpa",
  Schomburg: "schomburg",
}

// Extract location key from the location label in the API response
export function locationLabelToKey(label: string): ItemLocationKey {
  return label.replace(/SASB/, "Schwarzman").split(" ")[0] as ItemLocationKey
}

// Copied from DFE as part of a hotfix (delivery locations not loading for some off-site partner items)
// TODO: Refactor this as a follow-up if necessary
const itemIdentifierTypeMappings = {
  barcode: {
    type: "bf:Barcode",
    legacyUrnPrefix: "urn:barcode:",
  },
  bnum: {
    type: "nypl:Bnumber",
    legacyUrnPrefix: "urn:bnum:",
  },
  callnumber: {
    type: "bf:ShelfMark",
    legacyUrnPrefix: "urn:callnumber:",
  },
  isbn: {
    type: "bf:Isbn",
    legacyUrnPrefix: "urn:isbn:",
  },
  issn: {
    type: "bf:Issn",
    legacyUrnPrefix: "urn:issn:",
  },
  lccn: {
    type: "bf:Lccn",
    legacyUrnPrefix: "urn:lccn:",
  },
  oclc: {
    type: "nypl:Oclc",
    legacyUrnPrefix: "urn:oclc:",
  },
}

// Copied from DFE as part of a hotfix (delivery locations not loading for some off-site partner items)
// TODO: Refactor this as a follow-up if necessary
export const identifiersArray = [{ name: "barcode", value: "bf:Barcode" }]

/**
 * Given an identifier value, returns same identifier transformed to entity representation.
 *
 * Copied from DFE as part of a hotfix (delivery locations not loading for some off-site partner items)
 * TODO: Refactor this as a follow-up if necessary
 */
export const ensureLegacyIdentifierIsEntity = (identifier) => {
  // If API has given us urn: prefixed identifiers..
  if (typeof identifier === "string") {
    // Convert them to entitys:
    return Object.keys(itemIdentifierTypeMappings)
      .filter(
        (name) =>
          identifier.indexOf(
            itemIdentifierTypeMappings[name].legacyUrnPrefix
          ) === 0
      )
      .map((name) => ({
        "@type": itemIdentifierTypeMappings[name].type,
        "@value": identifier.replace(
          itemIdentifierTypeMappings[name].legacyUrnPrefix,
          ""
        ),
      }))
      .pop()
  }

  // Otherwise we assume it's already an entity:
  return identifier
}

/**
 * Given an array of identifier entries (either serialized as entities or
 * string literals), returns the identifers (as entities) that match the
 * given rdf:type
 *
 * Copied from DFE as part of a hotfix (delivery locations not loading for some off-site partner items)
 * TODO: Refactor this as a follow-up if necessary
 */
const getIdentifierEntitiesByType = (identifiersArray, type) => {
  return identifiersArray
    .map(ensureLegacyIdentifierIsEntity)
    .filter((identifier) => identifier && identifier["@type"] === type)
}

/**
 * Gets into the array of the identifiers of an item. And then targets the identifiers we need
 * by the prefixes in neededTagsArray. At last, extracts the identifiers and returns them.
 *
 * Copied from DFE as part of a hotfix (delivery locations not loading for some off-site partner items)
 * TODO: Refactor this as a follow-up if necessary
 */
export const getIdentifiers = (identifiersArray, neededTagsArray) => {
  if (!Array.isArray(identifiersArray)) return {}
  return neededTagsArray.reduce((identifierMap, neededTag) => {
    const matches = getIdentifierEntitiesByType(
      identifiersArray,
      neededTag.value
    )
    if (matches && matches.length > 0)
      return Object.assign(identifierMap, {
        [neededTag.name]: matches[0]["@value"],
      })
    return identifierMap
  }, {})
}
