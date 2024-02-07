import type {
  Checkout,
  Hold,
  Patron,
  Fine,
  SierraMyAccount,
  SierraCheckout,
  SierraHold,
  SierraCodeName,
  SierraPatron,
  SierraFine,
  SierraFineEntry,
} from "../types/accountTypes"

export default class MyAccount {
  checkouts: Checkout[]
  holds: Hold[]
  patron: Patron
  fines: Fine
  constructor({ checkouts, holds, patron, fines }: SierraMyAccount) {
    this.checkouts = this.buildCheckouts(checkouts)
    this.holds = this.buildHolds(holds)
    this.patron = this.buildPatron(patron)
    this.fines = this.buildFines(fines)
  }

  buildCheckouts(checkouts: SierraCheckout[]): Checkout[] {
    return checkouts.map((checkout: SierraCheckout) => {
      return {
        id: MyAccount.getRecordId(checkout.id),
        callNumber: checkout.callNumber,
        barcode: checkout.barcode,
        dueDate: checkout.dueDate,
      }
    })
  }

  buildHolds(holds: SierraHold[]): Hold[] {
    return holds.map((hold: SierraHold) => {
      return {
        id: MyAccount.getRecordId(hold.id),
        pickupByDate: hold.pickupByDate,
        canFreeze: hold.canFreeze,
        frozen: hold.frozen,
        status: MyAccount.getStatus(hold.status),
        pickupLocation: hold.pickupLocation.name,
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
