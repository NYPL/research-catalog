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
} from "../types/accountTypes"

let client: any

class MyAccountModelError extends Error {
  constructor(errorDetail: string, error: Error) {
    super()
    this.message = `Error ${errorDetail}: ${error.message}`
  }
}

export default class MyAccount {
  client
  baseQuery: string
  constructor(client, patronId: string) {
    this.client = client
    this.baseQuery = `patrons/${patronId}`
  }

  async getCheckouts() {
    const checkouts = await this.client.get(
      `${this.baseQuery}"/checkouts?expand=item"`
    )
    const checkoutBibData = await this.fetchBibData(checkouts.entries, "item")
    const checkoutsWithBibData = this.buildCheckouts(
      checkouts.entries,
      checkoutBibData.entries
    )
    return checkoutsWithBibData
  }

  async getHolds() {
    const holds = await this.client.get(
      `${this.baseQuery}"/holds?expand=record"`
    )
    const holdBibData = await this.fetchBibData(holds.entries, "record")
    const holdsWithBibData = this.buildHolds(holds.entries, holdBibData.entries)
    return holdsWithBibData
  }

  async getPatron() {
    const patron = this.client.get(
      `${this.baseQuery}"?fields=names,barcodes,expirationDate,homeLibrary,emails,phones"`
    )
    return this.buildPatron(patron)
  }

  async getFines() {
    const fines = await this.client.get(`${this.baseQuery}/fines`)
    return this.buildFines(fines)
  }

  async fetchBibData(
    holdsOrCheckouts: any[],
    itemOrRecord: string
  ): Promise<{
    total?: number
    start?: number
    entries: SierraBibEntry[]
  }> {
    if (!holdsOrCheckouts?.length) return { entries: [] }
    const checkoutBibIds = holdsOrCheckouts.map(
      (holdOrCheckout: { [x: string]: { bibIds: any[] } }) => {
        return holdOrCheckout[itemOrRecord].bibIds[0]
      }
    )

    const bibData = await this.client.get(
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
        // RLOTF: "Research Library On The Fly", a code we add to OTF (aka "virtual") records,
        // to tag them as being Research OTF records
        isNyplOwned = !isResearch || nineTenContent !== "RLOTF"
      }
      bibDataMap[bibFields.id] = { title, isResearch, isNyplOwned }
      return bibDataMap
    }, {})
  }

  buildHolds(holds: SierraHold[], bibData: SierraBibEntry[]): Hold[] {
    let bibDataMap: BibDataMapType
    try {
      bibDataMap = MyAccount.buildBibData(bibData)
    } catch (e) {
      throw new MyAccountModelError("building bibData for holds", e)
    }
    try {
      return holds.map((hold: SierraHold) => {
        return {
          patron: MyAccount.getRecordId(hold.patron),
          id: MyAccount.getRecordId(hold.id),
          pickupByDate: MyAccount.formatDate(hold.pickupByDate) || null,
          canFreeze: hold.canFreeze,
          frozen: hold.frozen,
          status: MyAccount.getHoldStatus(hold.status),
          pickupLocation: hold.pickupLocation,
          title: bibDataMap[hold.record.bibIds[0]].title,
          isResearch: bibDataMap[hold.record.bibIds[0]].isResearch,
          bibId: hold.record.bibIds[0],
          isNyplOwned: bibDataMap[hold.record.bibIds[0]].isNyplOwned,
          catalogHref: bibDataMap[hold.record.bibIds[0]].isNyplOwned
            ? bibDataMap[hold.record.bibIds[0]].isResearch
              ? `https://nypl.org/research/research-catalog/bib/b${hold.record.bibIds[0]}`
              : `https://nypl.na2.iiivega.com/search/card?recordId=${hold.record.bibIds[0]}`
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
    let bibDataMap: BibDataMapType
    try {
      bibDataMap = MyAccount.buildBibData(bibData)
    } catch (e) {
      throw new MyAccountModelError("building bibData for checkouts", e)
    }
    try {
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
          href: bibDataMap[checkout.item.bibIds[0]].isNyplOwned
            ? bibDataMap[checkout.item.bibIds[0]].isResearch
              ? `https://nypl.org/research/research-catalog/bib/b${checkout.item.bibIds[0]}`
              : `https://nypl.na2.iiivega.com/search/card?recordId=${checkout.item.bibIds[0]}`
            : null,
        }
      })
    } catch (e) {
      throw new MyAccountModelError("building checkouts", e)
    }
  }

  buildPatron(patron: SierraPatron): Patron {
    try {
      return {
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
  static formatDate(date: string | number | Date) {
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

export const MyAccountFactory = async (id: string, client) => {
  const patronFetcher = new MyAccount(client, id)
  const sierraData = await Promise.allSettled([
    patronFetcher.getCheckouts(),
    patronFetcher.getHolds(),
    patronFetcher.getPatron(),
    patronFetcher.getFines(),
  ])
  const [checkouts, holds, patron, fines] = sierraData.map((data) => {
    console.log(data.status)
    return data.status === "fulfilled" ? data.value : []
  })
  return { checkouts, holds, patron, fines }
}
