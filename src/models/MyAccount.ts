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
} from "../types/accountTypes"

let client

export default class MyAccount {
  checkouts: Checkout[]
  holds: Hold[]
  patron: Patron
  fines: Fine
  checkoutTitleMap: Record<string, string>
  holdTitleMap: Record<string, string>
  constructor({
    checkouts,
    holds,
    patron,
    fines,
    checkoutTitleMap,
    holdTitleMap,
  }: SierraAccountData) {
    this.checkouts = this.buildCheckouts(checkouts, checkoutTitleMap)
    this.holds = this.buildHolds(holds, holdTitleMap)
    this.patron = this.buildPatron(patron)
    this.fines = this.buildFines(fines)
  }

  static async fetchAll(id) {
    client = await sierraClient()
    const baseQuery = `patrons/${id}`
    const checkouts = await this.fetchCheckouts(baseQuery)
    const holds = await this.fetchHolds(baseQuery)
    const patron = await this.fetchPatron(baseQuery)
    const fines = await this.fetchFines(baseQuery)
    const checkoutTitleMap = await this.fetchBibData(checkouts.entries, "item")
    const holdTitleMap = await this.fetchBibData(holds.entries, "record")
    return new this({
      checkouts: checkouts.entries,
      holds: holds.entries,
      patron,
      fines,
      checkoutTitleMap,
      holdTitleMap,
    })
  }

  buildCheckouts(checkouts: SierraCheckout[], bibDataMap): Checkout[] {
    return checkouts.map((checkout: SierraCheckout) => {
      return {
        id: MyAccount.getRecordId(checkout.id),
        callNumber: checkout.item.callNumber,
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

  static async fetchCheckouts(baseQuery: string) {
    const checkoutQuery = "/checkouts?expand=item"
    return await client.get(`${baseQuery}${checkoutQuery}`)
  }

  static async fetchHolds(baseQuery: string) {
    const holdsQuery = "/holds?expand=record"
    return await client.get(`${baseQuery}${holdsQuery}`)
  }

  static async fetchPatron(baseQuery: string) {
    const patronQuery =
      "?fields=names,barcodes,expirationDate,homeLibrary,emails,phones"
    return await client.get(`${baseQuery}${patronQuery}`)
  }

  static async fetchFines(baseQuery: string) {
    const finesQuery = "/fines"
    return await client.get(`${baseQuery}${finesQuery}`)
  }

  static async fetchBibData(
    holdsOrCheckouts: (SierraHold | SierraCheckout)[],
    itemOrRecord: string
  ) {
    if (!holdsOrCheckouts.length) return []
    const checkoutBibIds = holdsOrCheckouts.map((holdOrCheckout) => {
      return holdOrCheckout[itemOrRecord].bibIds[0]
    })
    const defaultFields = await client.get(
      `bibs?id=${checkoutBibIds}&fields=default,varFields`
    )

    return defaultFields.entries.reduce(
      (
        bibDataMap: Record<
          string,
          { title: string; isResearch: boolean; isNyplOwned: boolean }
        >,
        bibFields
      ) => {
        let isResearch
        let isNyplOwned
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
            (subfield: { tag: string; subfield: string }) =>
              subfield.tag === "a"
          ).content
          isResearch = nineTenContent.startsWith("RL")
          isNyplOwned = nineTenContent !== "RLOTF"
        }
        bibDataMap[bibFields.id] = { title, isResearch, isNyplOwned }
        return bibDataMap
      },
      {}
    )
  }

  buildHolds(holds: SierraHold[], bibDataMap): Hold[] {
    return holds.map((hold: SierraHold) => {
      return {
        patron: MyAccount.getRecordId(hold.patron),
        id: MyAccount.getRecordId(hold.id),
        pickupByDate: hold.pickupByDate,
        canFreeze: hold.canFreeze,
        frozen: hold.frozen,
        status: MyAccount.getStatus(hold.status),
        pickupLocation: hold.pickupLocation.name,
        title: bibDataMap[hold.record.bibIds[0]].title,
        isResearch: bibDataMap[hold.record.bibIds[0]].isResearch,
        bibId: hold.record.bibIds[0],
        isNyplOwned: bibDataMap[hold.record.bibIds[0]].isResearch,
      }
    })
  }

  buildPatron(patron: SierraPatron): Patron {
    return {
      name: patron.names[0],
      barcode: patron.barcodes[0],
      expirationDate: patron.expirationDate,
      primaryEmail: patron.emails[0],
      emails: patron.emails,
      primaryPhone: patron.phones[0].number,
      phones: patron.phones,
      homeLibrary: patron.homeLibrary.name,
      id: patron.id,
    }
  }

  buildFines(fines: SierraFine): Fine {
    return {
      total: fines.total,
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

  patronCookieMatchesCheckoutOrHold(cookieId: string) {
    return cookieId
  }

  static getStatus(status: SierraCodeName) {
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
