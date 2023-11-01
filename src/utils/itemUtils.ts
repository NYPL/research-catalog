import type {
  ItemLocation,
  ItemLocationEndpoint,
  ItemLocationKey,
} from "../types/itemTypes"

export const itemAvailabilityKeys = ["available", "useinlibrary"]

// Default delivery location for an item.
export const defaultNYPLLocation: ItemLocation = {
  "@id": "",
  prefLabel: "Check with Staff",
  customerCode: "",
}

// Default delivery location for a nonNyplRecap item.
export const nonNYPLReCAPLocation: ItemLocation = {
  "@id": "",
  prefLabel: "Off-site",
  customerCode: "",
}

export const locationEndpointsMap: Record<
  ItemLocationKey,
  ItemLocationEndpoint
> = {
  Schwarzman: "schwarzman",
  Performing: "lpa",
  Schomburg: "schomburg",
}

// Extract location key from the location label in the API response
export function locationLabelToKey(label: string): ItemLocationKey {
  return label.replace(/SASB/, "Schwarzman").split(" ")[0] as ItemLocationKey
}

export const barcodeIdentifiers = [{ name: "barcode", value: "bf:Barcode" }]

// Map local identifier names to their @type and urn: indicators:
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

export function ensureLegacyIdentifierIsEntity(identifier) {
  // If API has given us urn: prefixed identifiers..
  if (typeof identifier === "string") {
    // Convert them to entities:
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

function getIdentifierEntitiesByType(identifiersArray, type) {
  return identifiersArray
    .map(ensureLegacyIdentifierIsEntity)
    .filter((identifier) => identifier && identifier["@type"] === type)
}

export function getBibIdentifiers(identifiers, neededTagsArray) {
  if (!Array.isArray(identifiers)) return {}
  return neededTagsArray.reduce((identifierMap, neededTag) => {
    const matches = getIdentifierEntitiesByType(identifiers, neededTag.value)
    if (matches && matches.length > 0)
      return Object.assign(identifierMap, {
        [neededTag.name]: matches[0]["@value"],
      })
    return identifierMap
  }, {})
}
