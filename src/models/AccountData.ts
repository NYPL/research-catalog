import type { Checkout, Hold, Patron, Fine } from "../types/accountTypes"

export default class AccountData {
  checkouts: Checkout[]
  holds: Hold[]
  patron: Patron
  fines: Fine
  constructor() {
    this.checkouts
  }
}
