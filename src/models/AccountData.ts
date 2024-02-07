import type {
  Checkout,
  Hold,
  Patron,
  Fine,
  SierraAccountData,
  SierraCheckout,
} from "../types/accountTypes"

export default class AccountData {
  checkouts: Checkout[]
  holds: Hold[]
  patron: Patron
  fines: Fine
  constructor({ checkouts, holds, patron, fines }: SierraAccountData) {
    this.checkouts = this.buildCheckouts(checkouts)
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

  /**
   * getRecordId
   * Trims actual id number off of record (checkout or hold)
   */
  static getRecordId(recordLink: string) {
    const match = recordLink.match(/\/(\d+)$/)
    return match ? match[1] : null
  }
}
