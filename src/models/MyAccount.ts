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
import { notificationPreferenceMap } from "../utils/myAccountData"

let client
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
      "/holds?expand=record&fields=canFreeze,record,status,pickupLocation,frozen,patron,pickupByDate"
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
    if (!holdsOrCheckouts.length) return { entries: [] }
    const checkoutBibIds = holdsOrCheckouts.map((holdOrCheckout) => {
      return holdOrCheckout[itemOrRecord].bibIds[0]
    })

    const bibData = await client.get(
      `bibs?id=${checkoutBibIds}&fields=default,varFields`
    )

    return bibData
  }

  static buildBibData(bibs: SierraBibEntry[]): BibDataMapType {
    return bibs.reduce((bibDataMap: BibDataMapType, bibFields) => {
      let isResearch: boolean
      let isNyplOwned: boolean
      const title = bibFields.title
      const nineTen = bibFields.varFields.find(
        (field) => field.marcTag === "910"
      )
      // if we are unsure of the research ness of a bib, default to true so
      // we don't let them renew or freeze the record
      if (!nineTen) {
        isResearch = true
        isNyplOwned = false
      } else {
        const nineTenContent = nineTen.subfields.find(
          (subfield: { tag: string; subfield: string }) => subfield.tag === "a"
        ).content
        isResearch = nineTenContent.startsWith("RL")
        isNyplOwned = nineTenContent !== "RLOTF"
      }
      bibDataMap[bibFields.id] = { title, isResearch, isNyplOwned }
      return bibDataMap
    }, {})
  }

  buildHolds(holds: SierraHold[], bibData: SierraBibEntry[]): Hold[] {
    const bibDataMap = MyAccount.buildBibData(bibData)
    return holds.map((hold: SierraHold) => {
      return {
        patron: MyAccount.getRecordId(hold.patron),
        id: MyAccount.getRecordId(hold.id),
        pickupByDate: hold.pickupByDate || null,
        canFreeze: hold.canFreeze,
        frozen: hold.frozen,
        status: MyAccount.getHoldStatus(hold.status),
        pickupLocation: hold.pickupLocation.name,
        title: bibDataMap[hold.record.bibIds[0]].title,
        isResearch: bibDataMap[hold.record.bibIds[0]].isResearch,
        bibId: hold.record.bibIds[0],
        isNyplOwned: bibDataMap[hold.record.bibIds[0]].isResearch,
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
        dueDate: checkout.dueDate,
        patron: MyAccount.getRecordId(checkout.patron),
        title: bibDataMap[checkout.item.bibIds[0]].title,
        isResearch: bibDataMap[checkout.item.bibIds[0]].isResearch,
        bibId: checkout.item.bibIds[0],
        isNyplOwned: bibDataMap[checkout.item.bibIds[0]].isNyplOwned,
      }
    })
  }

  buildPatron(patron: SierraPatron): Patron {
    const notificationPreference =
      notificationPreferenceMap[patron.fixedFields["268"].value]
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
            date: entry.assessedDate,
          }
        }
      }),
    }
  }

  /**
   * getHoldStatus
   * Returns user-friendly status message
   */
  static getHoldStatus(status: SierraCodeName) {
    if (status.code === "status:a") {
      return "REQUEST PLACED"
    } else if (status.name === "READY SOON") {
      return "READY FOR PICKUP"
    } else {
      return status.name
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
