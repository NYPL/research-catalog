import type { MarcSubfield } from "../types/bibDetailsTypes"
import type {
  Checkout,
  Hold,
  Patron,
  Fine,
  SierraCheckout,
  SierraHold,
  SierraCodeName,
  SierraPatron,
  SierraFine,
  SierraFineEntry,
  SierraBibEntry,
  BibDataMapType,
} from "../types/myAccountTypes"
import logger from "../../logger"

import { buildPatron, formatDate } from "../utils/myAccountUtils"
import { getPickupLocations } from "../utils/pickupLocationsUtils"

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

  async fetchCheckouts() {
    try {
      return await this.client.get(`${this.baseQuery}/checkouts?expand=item`)
    } catch (e) {
      logger.error("MyAccount#fetchCheckouts error:", e)
      throw new MyAccountModelError(
        "MyAccount#fetchCheckouts error: ",
        e.message
      )
    }
  }

  async getCheckouts() {
    const checkouts = await this.fetchCheckouts()
    const { bibEntries, itemEntries } = await this.fetchBibItemData(
      checkouts.entries,
      "item"
    )
    return this.buildCheckouts(checkouts.entries, bibEntries, itemEntries)
  }

  async fetchHolds() {
    return await this.client.get(
      `${this.baseQuery}/holds?expand=record&fields=canFreeze,status,pickupLocation,frozen,patron,pickupByDate,recordType,record`
    )
  }

  async getHolds() {
    const holds = await this.fetchHolds()
    const { bibEntries, itemEntries } = await this.fetchBibItemData(
      holds.entries,
      "record"
    )
    const holdsWithBibData = this.buildHolds(
      holds.entries,
      bibEntries,
      itemEntries
    )
    return MyAccount.sortHolds(holdsWithBibData)
  }

  async fetchPatron() {
    return await this.client.get(
      `${this.baseQuery}?fields=names,barcodes,expirationDate,homeLibrary,emails,phones,fixedFields,varFields`
    )
  }

  async getPatron() {
    const patron = await this.fetchPatron()
    return this.buildPatron(patron)
  }

  async fetchFines() {
    return await this.client.get(`${this.baseQuery}/fines`)
  }

  async getFines() {
    const fines = await this.fetchFines()
    return this.buildFines(fines)
  }

  async fetchBibItemData(
    holdsOrCheckouts: (SierraHold | SierraCheckout)[],
    itemOrRecord: "item" | "record"
  ): Promise<{
    total?: number
    start?: number
    bibEntries: SierraBibEntry[]
    itemEntries: Record<string, any[]>
  }> {
    if (!holdsOrCheckouts?.length) return { bibEntries: [], itemEntries: {} }

    const { bibLevelHolds, itemLevelHoldsorCheckouts } =
      MyAccount.filterBibLevelHolds(holdsOrCheckouts, itemOrRecord)

    const bibEntries = [...bibLevelHolds]
    let itemEntries = {}

    if (itemLevelHoldsorCheckouts.length) {
      try {
        // Fetch bibs
        const itemLevelBibData = await this.client.get(
          `bibs?id=${itemLevelHoldsorCheckouts.map(
            (x) => x.bibId
          )}&fields=default,varFields`
        )
        bibEntries.push(...itemLevelBibData.entries)

        // Fetch items
        itemEntries = await this.fetchItemVarFields(itemLevelHoldsorCheckouts)
      } catch (e) {
        throw new Error(`Error fetching bib/item data: ${e}`)
      }
    }

    return { bibEntries, itemEntries }
  }

  async fetchItemVarFields(
    itemLevelHoldsorCheckouts: {
      itemId: string
      bibId: string
    }[]
  ) {
    const itemEntries: Record<string, any[]> = {}

    const itemIds = itemLevelHoldsorCheckouts.map((x) => x.itemId)
    const itemLevelData = await this.client.get(
      `items?id=${itemIds}&fields=varFields`
    )

    itemLevelData.entries.forEach((item) => {
      itemEntries[item.id] = item.varFields || []
    })

    return itemEntries
  }

  /**
   * getResearchAndOwnership
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

  static getItemVolume(itemVarFields) {
    const volume = itemVarFields.find((field) => field.fieldTag === "v")
    return volume?.content ?? null
  }

  static filterBibLevelHolds(
    holdsOrCheckouts: (SierraHold | SierraCheckout)[],
    itemOrRecord: "item" | "record"
  ) {
    const itemLevelHoldsorCheckouts: { itemId: string; bibId: string }[] = []
    const bibLevelHolds = []

    holdsOrCheckouts.forEach((hc) => {
      if (itemOrRecord === "record" && "record" in hc) {
        const isItemLevel = hc.record.bibIds?.length
        if (isItemLevel) {
          itemLevelHoldsorCheckouts.push({
            itemId: hc.record.id,
            bibId: hc.record.bibIds[0],
          })
        } else {
          bibLevelHolds.push(hc.record)
        }
      } else if (itemOrRecord === "item" && "item" in hc) {
        const isItemLevel = hc.item.bibIds?.length
        if (isItemLevel) {
          itemLevelHoldsorCheckouts.push({
            itemId: hc.item.id,
            bibId: hc.item.bibIds[0],
          })
        }
      }
    })

    return { bibLevelHolds, itemLevelHoldsorCheckouts }
  }

  static buildBibData(bibs): BibDataMapType {
    return bibs.reduce((map: BibDataMapType, bib) => {
      const { isResearch, isNyplOwned } = this.getResearchAndOwnership(bib)
      const title = `${bib.title}${
        bib.author && isNyplOwned ? ` / ${bib.author}` : ""
      }`
      map[bib.id] = { title, isResearch, isNyplOwned }
      return map
    }, {})
  }

  static sortHolds(holds: Hold[]) {
    const holdsWithNoPickupByDates = holds.filter((hold) => !hold.pickupByDate)
    const holdsWithPickupByDates = holds.filter((hold) => hold.pickupByDate)
    const sortedHoldsWithDates = holdsWithPickupByDates.sort((a, b) => {
      return (
        new Date(b.pickupByDate).valueOf() - new Date(a.pickupByDate).valueOf()
      )
    })
    return [...sortedHoldsWithDates, ...holdsWithNoPickupByDates]
  }

  buildHolds(
    holds: SierraHold[],
    bibData: SierraBibEntry[],
    itemData: Record<string, any[]>
  ): Hold[] {
    let bibDataMap: BibDataMapType
    try {
      bibDataMap = MyAccount.buildBibData(bibData)
    } catch (e) {
      logger.error(
        "Error building bibData in MyAccount#buildHolds: " + e.message
      )
      throw new MyAccountModelError("building bibData for holds", e)
    }
    return holds.map((hold: SierraHold) => {
      try {
        const bibId =
          hold.recordType === "i" ? hold.record.bibIds[0] : hold.record.id
        const bibForHold = bibDataMap[bibId]
        const itemVarFields = itemData[hold.record.id] || []
        const volumeForItem = MyAccount.getItemVolume(itemVarFields)

        return {
          itemId: hold.record.id,
          patron: MyAccount.getRecordId(hold.patron),
          id: MyAccount.getRecordId(hold.id),
          pickupByDate: MyAccount.formatDate(hold.pickupByDate) || null,
          canFreeze: hold.canFreeze,
          frozen: hold.frozen,
          status: MyAccount.getHoldStatus(hold.status),
          pickupLocation: hold.pickupLocation,
          title: `${bibForHold.title}${
            volumeForItem ? `\n${volumeForItem}` : ""
          }`,
          isResearch: bibForHold.isResearch,
          bibId,
          isNyplOwned: bibForHold.isNyplOwned,
          catalogHref: bibForHold.isNyplOwned
            ? bibForHold.isResearch
              ? `https://nypl.org/research/research-catalog/bib/b${bibId}`
              : `https://borrow.nypl.org/search/card?recordId=${bibId}`
            : null,
        }
      } catch (e) {
        logger.error(
          "Error building hold in MyAccount#buildHolds: " + e.message
        )
        throw new MyAccountModelError("building holds", e)
      }
    })
  }

  buildCheckouts(
    checkouts: SierraCheckout[],
    bibData: SierraBibEntry[],
    itemData: Record<string, any[]> = {}
  ): Checkout[] {
    let bibDataMap: BibDataMapType
    try {
      bibDataMap = MyAccount.buildBibData(bibData)
    } catch (e) {
      logger.error(
        "MyAccount#buildCheckouts: Error building bib data for checkouts: ",
        e.message
      )
      throw new MyAccountModelError("building bibData for checkouts", e)
    }
    try {
      return checkouts
        .map((checkout: SierraCheckout) => {
          const bibId = checkout.item.bibIds[0]
          const bibForCheckout = bibDataMap[bibId]
          const itemVarFields = itemData[checkout.item.id] || []
          const volumeForItem = MyAccount.getItemVolume(itemVarFields)
          return {
            numberOfRenewals: checkout.numberOfRenewals,
            id: MyAccount.getRecordId(checkout.id),
            // Partner items do not have call numbers. Null has to be explicitly
            // returned for JSON serialization in getServerSideProps
            callNumber: checkout.item.callNumber || null,
            barcode: checkout.item.barcode,
            dueDate: MyAccount.formatDate(checkout.dueDate),
            patron: MyAccount.getRecordId(checkout.patron),
            title: `${bibForCheckout.title}${
              volumeForItem ? `\n${volumeForItem}` : ""
            }`,
            isResearch: bibForCheckout.isResearch,
            bibId: bibId,
            isNyplOwned: bibForCheckout.isNyplOwned,
            catalogHref: bibForCheckout.isNyplOwned
              ? bibForCheckout.isResearch
                ? `https://nypl.org/research/research-catalog/bib/b${bibId}`
                : `https://borrow.nypl.org/search/card?recordId=${bibId}`
              : null,
          }
        })
        .sort((a, b) => {
          return new Date(b.dueDate).valueOf() - new Date(a.dueDate).valueOf()
        })
    } catch (e) {
      throw new MyAccountModelError("building checkouts", e)
    }
  }

  buildPatron(patron: SierraPatron): Patron {
    try {
      return buildPatron(patron)
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
    return formatDate(date)
  }

  /**
   * getHoldStatus
   * Returns user-friendly status message
   */
  static getHoldStatus(status: SierraCodeName) {
    if (status.code === "i" || status.code === "b") {
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
    getPickupLocations(client),
    patronFetcher.getCheckouts(),
    patronFetcher.getHolds(),
    patronFetcher.getPatron(),
    patronFetcher.getFines(),
  ])
  const [pickupLocations, checkouts, holds, patron, fines] = sierraData.map(
    (data) => {
      if (data.status === "fulfilled") return data.value
      else return null
    }
  ) as [SierraCodeName[], Checkout[], Hold[], Patron, Fine]
  return { pickupLocations, checkouts, holds, patron, fines }
}
