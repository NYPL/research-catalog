import sierraClient from "../server/sierraClient"
import type { MarcSubfield } from "../types/bibDetailsTypes"
import type {
  Checkout,
  Hold,
  Patron,
  Fine,
  SierraAccountData,
  SierraCheckout,
  SierraHold,
  SierraCodeName,
  SierraPatron,
  SierraFine,
  SierraFineEntry,
  SierraBibEntry,
  BibDataMapType,
} from "../types/myAccountTypes"
import { notificationPreferenceMap } from "../utils/myAccountData"

let client

class MyAccountModelError extends Error {
  constructor(errorDetail: string, error: Error) {
    super()
    this.message = `Error ${errorDetail}: ${error.message}`
  }
}

export default class MyAccount {
  checkouts: Checkout[]
  holds: Hold[]
  patron: Patron
  fines: Fine
  constructor({
    checkouts,
    holds,
    patron,
    fines,
    checkoutBibData,
    holdBibData,
  }: SierraAccountData) {
    this.checkouts = this.buildCheckouts(checkouts, checkoutBibData)
    this.holds = this.buildHolds(holds, holdBibData)
    this.patron = this.buildPatron(patron)
    this.fines = this.buildFines(fines)
  }

  static async fetchCheckouts(baseQuery: string) {
    const checkoutQuery = "/checkouts?expand=item"
    return await client.get(`${baseQuery}${checkoutQuery}`)
  }

  static async fetchHolds(baseQuery: string) {
    const holdsQuery =
      "/holds?expand=record&fields=canFreeze,record,status,pickupLocation,frozen,patron,pickupByDate,recordType"
    return await client.get(`${baseQuery}${holdsQuery}`)
  }

  static async fetchPatron(baseQuery: string) {
    const patronQuery =
      "?fields=names,barcodes,expirationDate,homeLibrary,emails,phones,fixedFields"
    return await client.get(`${baseQuery}${patronQuery}`)
  }

  static async fetchFines(baseQuery: string) {
    const finesQuery = "/fines"
    return await client.get(`${baseQuery}${finesQuery}`)
  }

  static async fetchBibData(
    holdsOrCheckouts,
    itemOrRecord: string
  ): Promise<{
    total?: number
    start?: number
    entries: SierraBibEntry[]
  }> {
    console.log(holdsOrCheckouts)
    if (!holdsOrCheckouts?.length) return { entries: [] }
    const itemLevelHoldsorCheckouts = []
    const bibLevelHolds = []

    // Separating bib level and item level records so we only fetch bib data for item level holds/checkouts.
    holdsOrCheckouts.forEach((holdOrCheckout) => {
      if (holdOrCheckout[itemOrRecord].bibIds) {
        itemLevelHoldsorCheckouts.push(holdOrCheckout[itemOrRecord].bibIds[0])
      } else {
        bibLevelHolds.push(holdOrCheckout.record)
      }
    })
    console.log(`bibs?id=${itemLevelHoldsorCheckouts}&fields=default,varFields`)
    const bibData = await client.get(
      `bibs?id=${itemLevelHoldsorCheckouts}&fields=default,varFields`
    )
    bibData.entries = bibData.entries.concat(bibLevelHolds)
    return bibData
  }

  /**
   * getBibVarFields
   * Reads varFields of a item-level hold's bib data to return if it is a research item,
   * and if it is owned by NYPL.
   */

  static getResearchAndOwnership(bibFields) {
    // We don't fetch varfields for bib level holds. Bib level holds only happen
    // on circ, and therefore NYPL records.
    if (!bibFields.varFields) {
      return { isResearch: false, isNyplOwned: true }
    }
    const nineTen = bibFields.varFields.find((field) => field.marcTag === "910")
    if (nineTen) {
      const nineTenContent = nineTen.subfields.find(
        (subfield: MarcSubfield) => subfield.tag === "a"
      ).content
      const isResearch = nineTenContent.startsWith("RL")
      // RLOTF: "Research Library On The Fly", a code we add to OTF (aka
      // "virtual") records, to tag them as being Research OTF records
      const isPartnerRecord = nineTenContent === "RLOTF"
      // Non-research means circ, circ records are NYPL owned
      const isNyplOwned = !isResearch || !isPartnerRecord
      return { isResearch, isNyplOwned }
    }
    // Default to most restrictive values
    return { isResearch: true, isNyplOwned: false }
  }

  static buildBibData(bibs: SierraBibEntry[]): BibDataMapType {
    return bibs.reduce((bibDataMap: BibDataMapType, bibFields) => {
      const { isResearch, isNyplOwned } =
        this.getResearchAndOwnership(bibFields)
      const title = bibFields.title
      bibDataMap[bibFields.id] = { title, isResearch, isNyplOwned }
      return bibDataMap
    }, {})
  }

  buildHolds(holds: SierraHold[], bibData: SierraBibEntry[]): Hold[] {
    let bibDataMap
    try {
      bibDataMap = MyAccount.buildBibData(bibData)
    } catch (e) {
      throw new MyAccountModelError("building bibData for holds", e)
    }
    try {
      return holds.map((hold: SierraHold) => {
        const bibId =
          hold.recordType === "i" ? hold.record.bibIds[0] : hold.record.id
        const bibForHold = bibDataMap[bibId]
        return {
          patron: MyAccount.getRecordId(hold.patron),
          id: MyAccount.getRecordId(hold.id),
          pickupByDate: MyAccount.formatDate(hold.pickupByDate) || null,
          canFreeze: hold.canFreeze,
          frozen: hold.frozen,
          status: MyAccount.getHoldStatus(hold.status),
          pickupLocation: hold.pickupLocation,
          title: bibForHold.title,
          isResearch: bibForHold.isResearch,
          bibId,
          isNyplOwned: bibForHold.isNyplOwned,
          catalogHref: bibForHold.isNyplOwned
            ? bibForHold.isResearch
              ? `https://nypl.org/research/research-catalog/bib/b${bibId}`
              : `https://nypl.na2.iiivega.com/search/card?recordId=${bibId}`
            : null,
        }
      })
    } catch (e) {
      throw new MyAccountModelError("building holds", e)
    }
  }

  buildCheckouts(
    checkouts: SierraCheckout[],
    bibData: SierraBibEntry[]
  ): Checkout[] {
    let bibDataMap
    try {
      bibDataMap = MyAccount.buildBibData(bibData)
    } catch (e) {
      throw new MyAccountModelError("building bibData for checkouts", e)
    }
    try {
      return checkouts.map((checkout: SierraCheckout) => {
        const bibId = checkout.item.bibIds[0]
        const bibForCheckout = bibDataMap[bibId]
        return {
          id: MyAccount.getRecordId(checkout.id),
          // Partner items do not have call numbers. Null has to be explicitly
          // returned for JSON serialization in getServerSideProps
          callNumber: checkout.item.callNumber || null,
          barcode: checkout.item.barcode,
          dueDate: MyAccount.formatDate(checkout.dueDate),
          patron: MyAccount.getRecordId(checkout.patron),
          title: bibForCheckout.title,
          isResearch: bibForCheckout.isResearch,
          bibId: bibId,
          isNyplOwned: bibForCheckout.isNyplOwned,
          catalogHref: bibForCheckout.isNyplOwned
            ? bibForCheckout.isResearch
              ? `https://nypl.org/research/research-catalog/bib/b${bibId}`
              : `https://nypl.na2.iiivega.com/search/card?recordId=${bibId}`
            : null,
        }
      })
    } catch (e) {
      throw new MyAccountModelError("building checkouts", e)
    }
  }

  buildPatron(patron: SierraPatron): Patron {
    const notificationPreference =
      notificationPreferenceMap[patron.fixedFields["268"].value]
    try {
      return {
        notificationPreference,
        name: patron.names[0],
        barcode: patron.barcodes[0],
        expirationDate: patron.expirationDate,
        primaryEmail: patron.emails?.length > 0 ? patron.emails[0] : "",
        emails: patron.emails || [],
        primaryPhone: patron.phones?.length > 0 ? patron.phones[0].number : "",
        phones: patron.phones || [],
        homeLibrary: patron.homeLibrary?.name ? patron.homeLibrary.name : "",
        id: patron.id,
      }
    } catch (e) {
      throw new MyAccountModelError("building patron", e)
    }
  }

  buildFines(fines: SierraFine): Fine {
    try {
      return {
        total: fines.entries.reduce((acc, entry) => {
          acc += entry.itemCharge
          return acc
        }, 0),
        entries: fines.entries.map((entry: SierraFineEntry) => {
          if (!entry.datePaid) {
            return {
              detail: entry.chargeType.display,
              amount: entry.itemCharge,
              date: MyAccount.formatDate(entry.assessedDate),
            }
          }
        }),
      }
    } catch (e) {
      throw new MyAccountModelError("building fines", e)
    }
  }
  /**
   * getDueDate
   * Returns date in readable string ("Month day, year")
   */
  static formatDate(date) {
    if (!date) return null
    const d = new Date(date)
    const year = d.getFullYear()
    const day = d.getDate()
    const month = d.toLocaleString("default", { month: "long" })
    return `${month} ${day}, ${year}`
  }

  /**
   * getHoldStatus
   * Returns user-friendly status message
   */
  static getHoldStatus(status: SierraCodeName) {
    if (status.code === "i") {
      return "READY FOR PICKUP"
    } else if (status.code === "t") {
      return "REQUEST CONFIRMED"
    } else {
      return "REQUEST PENDING"
    }
  }

  /**
   * getRecordId
   * Trims actual id number off of record (checkout or hold)
   */
  static getRecordId(recordLink: string) {
    const match = recordLink.match(/\/(\d+)$/)
    return match ? match[1] : null
  }
}

export const MyAccountFactory = async (id: string) => {
  client = await sierraClient()
  const baseQuery = `patrons/${id}`
  let holds, patron, fines, checkoutBibData, checkouts, holdBibData
  try {
    checkouts = await MyAccount.fetchCheckouts(baseQuery)
    holds = await MyAccount.fetchHolds(baseQuery)
    patron = await MyAccount.fetchPatron(baseQuery)
    fines = await MyAccount.fetchFines(baseQuery)
  } catch (e) {
    throw new MyAccountModelError("fetching patron data", e)
  }
  try {
    checkoutBibData = await MyAccount.fetchBibData(checkouts.entries, "item")
  } catch (e) {
    throw new MyAccountModelError("fetching bibs for checkouts", e)
  }
  try {
    holdBibData = await MyAccount.fetchBibData(holds.entries, "record")
  } catch (e) {
    throw new MyAccountModelError("fetching bibs for holds", e)
  }
  return new MyAccount({
    //  default to empty array to avoid hard to replicate error
    // where entries end up undefined in buildBibData.
    checkouts: checkouts.entries || [],
    holds: holds.entries || [],
    patron,
    fines,
    checkoutBibData: checkoutBibData.entries,
    holdBibData: holdBibData.entries,
  })
}

export const getPickupLocations = async () => {
  const locations = await fetchPickupLocations()
  return filterPickupLocations(locations)
}

const fetchPickupLocations = async () => {
  const client = await sierraClient()
  return await client.get("/branches/pickupLocations")
}

export const filterPickupLocations = (locations) => {
  const pickupLocationDisqualification = [
    "closed",
    "onsite",
    "staff only",
    "edd",
    "performing arts",
    "reopening",
  ]
  const disqualified = (locationName, testString) =>
    locationName.toLowerCase().includes(testString)
  const isOpenBranchLocation = ({ name }: SierraCodeName, i) =>
    !pickupLocationDisqualification.find((testString: string, j) =>
      disqualified(name, testString)
    )

  return locations.filter(isOpenBranchLocation)
}
