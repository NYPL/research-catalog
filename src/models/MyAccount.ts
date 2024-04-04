import sierraClient from "../server/sierraClient"
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
import { appConfig } from "../config/config"

let client

export const notificationPreferenceMap = {
  z: "Email",
  a: "Print",
  p: "Phone",
  m: "Mobile",
  "-": null,
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
        (subfield) => subfield.tag === "a"
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
    const bibDataMap = MyAccount.buildBibData(bibData)
    return holds.map((hold: SierraHold) => {
      // Hold without bibIds is a bib level id.
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
            : `${appConfig.urls.circulatingCatalog}/search/card?recordId=${bibId}`
          : null,
      }
    })
  }

  buildCheckouts(
    checkouts: SierraCheckout[],
    bibData: SierraBibEntry[]
  ): Checkout[] {
    const bibDataMap = MyAccount.buildBibData(bibData)
    return checkouts.map((checkout: SierraCheckout) => {
      return {
        id: MyAccount.getRecordId(checkout.id),
        // Partner items do not have call numbers. Null has to be explicitly
        // returned for JSON serialization in getServerSideProps
        callNumber: checkout.item.callNumber || null,
        barcode: checkout.item.barcode,
        dueDate: MyAccount.formatDate(checkout.dueDate),
        patron: MyAccount.getRecordId(checkout.patron),
        title: bibDataMap[checkout.item.bibIds[0]].title,
        isResearch: bibDataMap[checkout.item.bibIds[0]].isResearch,
        bibId: checkout.item.bibIds[0],
        isNyplOwned: bibDataMap[checkout.item.bibIds[0]].isNyplOwned,
        catalogHref: bibDataMap[checkout.item.bibIds[0]].isNyplOwned
          ? bibDataMap[checkout.item.bibIds[0]].isResearch
            ? `https://nypl.org/research/research-catalog/bib/b${checkout.item.bibIds[0]}`
            : `${appConfig.urls.circulatingCatalog}/search/card?recordId=${checkout.item.bibIds[0]}`
          : null,
      }
    })
  }

  buildPatron(patron: SierraPatron): Patron {
    const notificationPreference =
      notificationPreferenceMap[patron.fixedFields["268"].value]
    return {
      notificationPreference: notificationPreference || null,
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
  }

  buildFines(fines: SierraFine): Fine {
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
  const checkouts = await MyAccount.fetchCheckouts(baseQuery)
  const holds = await MyAccount.fetchHolds(baseQuery)
  const patron = await MyAccount.fetchPatron(baseQuery)
  const fines = await MyAccount.fetchFines(baseQuery)
  const checkoutBibData = await MyAccount.fetchBibData(
    checkouts.entries,
    "item"
  )
  const holdBibData = await MyAccount.fetchBibData(holds.entries, "record")
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
