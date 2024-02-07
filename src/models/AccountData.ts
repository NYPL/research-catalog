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

export default class AccountData {
  checkouts: Checkout[]
  holds: Hold[]
  patron: Patron
  fines: Fine
  constructor({ checkouts, holds, patron, fines }: SierraAccountData) {
    this.checkouts = this.buildCheckouts(checkouts)
    this.holds = this.buildHolds(holds)
    this.patron = this.buildPatron(patron)
    this.fines = this.buildFines(fines)
  }

  buildCheckouts(checkouts: SierraCheckout[]) {
    return checkouts.map((checkout: SierraCheckout) => {
      return {
        id: AccountData.getRecordId(checkout.id),
        callNumber: checkout.callNumber,
        barcode: checkout.barcode,
        dueDate: checkout.dueDate,
      }
    })
  }

  buildHolds(holds: SierraHold[]) {
    return holds.map((hold: SierraHold) => {
      return {
        id: AccountData.getRecordId(hold.id),
        pickupByDate: hold.pickupByDate,
        canFreeze: hold.canFreeze,
        frozen: hold.frozen,
        status: AccountData.getStatus(hold.status),
        pickupLocation: hold.pickupLocation.name,
      }
    })
  }

  buildPatron(patron: SierraPatron) {
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

  buildFines(fines: SierraFine) {
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
      return "READY FOR PICK UP"
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
