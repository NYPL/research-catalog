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
    const checkoutTitleMap = await this.fetchTitles(checkouts.entries, "item")
    const holdTitleMap = await this.fetchTitles(holds.entries, "record")
    return new this({
      checkouts,
      holds,
      patron,
      fines,
      checkoutTitleMap,
      holdTitleMap,
    })
  }

  buildCheckouts(checkouts: SierraCheckout[], titleMap): Checkout[] {
    return checkouts.map((checkout: SierraCheckout) => {
      return {
        id: MyAccount.getRecordId(checkout.id),
        callNumber: checkout.item.callNumber,
        barcode: checkout.item.barcode,
        dueDate: checkout.dueDate,
        patron: MyAccount.getRecordId(checkout.patron),
        title: titleMap[checkout.item.bibIds[0]],
      }
    })
  }

  static async fetchCheckouts(baseQuery) {
    const checkoutQuery = "/checkouts?expand=item"
    return await client.get(`${baseQuery}${checkoutQuery}`)
  }

  static async fetchHolds(baseQuery) {
    const holdsQuery = "/holds?expand=record"
    return await client.get(`${baseQuery}${holdsQuery}`)
  }

  static async fetchPatron(baseQuery) {
    const patronQuery =
      "?fields=names,barcodes,expirationDate,homeLibrary,emails,phones"
    return await client.get(`${baseQuery}${patronQuery}`)
  }

  static async fetchFines(baseQuery) {
    const finesQuery = "/fines"
    return await client.get(`${baseQuery}${finesQuery}`)
  }

  static async fetchTitles(holdOrCheckouts, itemOrRecord) {
    console.log(holdOrCheckouts)
    const checkoutBibIds = holdOrCheckouts.map((holdOrCheckout) => {
      console.log(holdOrCheckout)
      console.log(holdOrCheckout[itemOrRecord])
      return holdOrCheckout[itemOrRecord].bibIds[0]
    })
    console.log(checkoutBibIds)
    let defaultFields
    try {
      defaultFields = await client.get(
        `bibs?id=${checkoutBibIds}?fields=default`
      )
    } catch (e) {
      console.log("bib error")
    }

    return defaultFields.entries.reduce((bibIdTitleMap, defaultField) => {
      bibIdTitleMap[defaultField.id] = defaultField.title
      return bibIdTitleMap
    }, {})
  }

  buildHolds(holds: SierraHold[], titleMap): Hold[] {
    return holds.map((hold: SierraHold) => {
      return {
        patron: MyAccount.getRecordId(hold.patron),
        id: MyAccount.getRecordId(hold.id),
        pickupByDate: hold.pickupByDate,
        canFreeze: hold.canFreeze,
        frozen: hold.frozen,
        status: MyAccount.getStatus(hold.status),
        pickupLocation: hold.pickupLocation.name,
        title: titleMap[hold.record.bibIds[0]],
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
