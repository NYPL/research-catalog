import type {
  Checkout,
  Hold,
  Patron,
  Fine,
  SierraCodeName,
  SierraPatron,
  SierraFine,
  SierraFineEntry,
  PatronServicesHold,
  PatronServicesCheckout,
  PlatformBib,
} from "../types/myAccountTypes"
import { logger } from "@nypl/node-utils"

import { buildPatron, formatDate } from "../utils/myAccountUtils"
import { getPickupLocations } from "../utils/pickupLocationsUtils"
import type { List, ListRecord, ListResult, ListSort } from "../types/listTypes"
import { formatMMDDYYYY } from "../utils/dateUtils"
import { fetchLists, createList } from "../server/api/lists"
import { buildListRecordWithBibData } from "../utils/listUtils"
import { logServerError } from "../utils/logUtils"
import { callMethodWithRetries } from "../utils/serverUtils"

class MyAccountModelError extends Error {
  constructor(errorDetail: string, error: Error) {
    super()
    this.message = `Error ${errorDetail}: ${error.message}`
  }
}

export default class MyAccount {
  sierraClient
  platformClient
  sierraBaseQuery: string
  platformBaseQuery: string
  patronId: string
  constructor({ patronId, sierraClient = null, platformClient = null }) {
    this.sierraClient = sierraClient
    this.platformClient = platformClient
    this.sierraBaseQuery = `patrons/${patronId}`
    this.platformBaseQuery = `/${this.sierraBaseQuery}`
    this.patronId = patronId
  }

  async fetchWithRetries(
    clientForRequest: "platform" | "sierra",
    endpoint: string,
    operation: string,
    retries = 3
  ) {
    let client
    let baseQuery
    if (clientForRequest === "platform") {
      client = this.platformClient
      baseQuery = this.platformBaseQuery
    } else {
      client = this.sierraClient
      baseQuery = this.sierraBaseQuery
    }
    try {
      return await callMethodWithRetries<any>(
        () => client.get(`${baseQuery}${endpoint}`),
        `MyAccount#${operation}`,
        { retries }
      )
    } catch (e) {
      logServerError(
        `MyAccount#${operation}`,
        `Error after ${retries} retries: ${e.message}`
      )
      throw new MyAccountModelError(`MyAccount#${operation} error: `, e)
    }
  }

  async fetchCheckouts() {
    return await this.fetchWithRetries(
      "platform",
      "/checkouts",
      "fetchCheckouts"
    )
  }

  async getCheckouts() {
    const checkouts = await this.fetchCheckouts()
    return this.buildCheckouts(checkouts.entries)
  }

  async fetchHolds() {
    return await this.fetchWithRetries("platform", "/holds", "fetchHolds")
  }

  async getHolds() {
    const holds = await this.fetchHolds()
    const builtHolds = this.buildHolds(holds.entries)
    return MyAccount.sortHolds(builtHolds)
  }

  async fetchPatron() {
    return await this.fetchWithRetries(
      "sierra",
      "?fields=names,barcodes,expirationDate,homeLibrary,emails,phones,fixedFields,varFields",
      "fetchPatron"
    )
  }

  async getPatron() {
    const patron = await this.fetchPatron()
    return this.buildPatron(patron)
  }

  async fetchFines() {
    return await this.fetchWithRetries("sierra", "/fines", "fetchFines")
  }

  async getFines() {
    const fines = await this.fetchFines()
    return this.buildFines(fines)
  }

  async getLists(patronId: string, sort?: ListSort) {
    const listsResult = await fetchLists({ patronId, sort })
    const lists = listsResult?.lists

    // Check if the default list exists based on its unique name
    const hasDefaultList = lists?.some(
      (list) => list.listName === "My workspace (default list)"
    )

    // If patron doesn't have the default list, provision it
    if (lists && !hasDefaultList) {
      const createResult = await createList({
        patronId,
        listName: "My workspace (default list)",
      })
      if (createResult.status === 200 && createResult.list) {
        lists.push(createResult.list)
      }
    }

    const builtLists = this.buildLists(lists || [])

    // Set the isDefaultList prop
    if (lists && lists.length > 0) {
      // Use name + oldest id to confirm
      const defaultLists = lists.filter(
        (list) => list.listName === "My workspace (default list)"
      )
      const candidateLists = defaultLists.length > 0 ? defaultLists : lists

      const defaultListId = candidateLists.reduce((oldest, current) => {
        const currentDate = new Date(current.createdDate).getTime() || 0
        const oldestDate = new Date(oldest.createdDate).getTime() || 0
        return currentDate < oldestDate ? current : oldest
      }).id

      builtLists.forEach((list) => {
        list.isDefaultList = list.id === defaultListId
      })
    }

    return builtLists
  }

  static getIsNyplOwned(platformBib: PlatformBib) {
    if (!platformBib) return false
    const { nyplSource } = platformBib
    return nyplSource === "sierra-nypl"
  }

  static getTitleDisplay(platformBib: PlatformBib, isNyplOwned: boolean) {
    if (!platformBib) return null
    const { title, author } = platformBib
    return `${title}${author && isNyplOwned ? ` / ${author}` : ""}`
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

  buildHolds(holds: PatronServicesHold[]): Hold[] {
    return holds.map((hold: PatronServicesHold) => {
      try {
        const {
          sierraHold,
          platformBib,
          platformItem,
          pickupLocation,
          pickupByDate,
        } = hold

        const bibId = platformBib?.id || null
        const isNyplOwned = MyAccount.getIsNyplOwned(platformBib)

        return {
          itemId: platformItem?.id || null,
          patron: this.patronId,
          id: sierraHold?.id || null,
          pickupByDate: MyAccount.formatDate(pickupByDate) || null,
          canFreeze: sierraHold?.canFreeze || false,
          frozen: sierraHold?.frozen || false,
          status: sierraHold?.status
            ? MyAccount.getHoldStatus(sierraHold.status)
            : null,
          pickupLocation: pickupLocation,
          title: MyAccount.getTitleDisplay(platformBib, isNyplOwned),
          volume: platformItem?.volume || null,
          isResearch: platformBib?.isResearch || false,
          bibId,
          isNyplOwned: isNyplOwned,
          catalogHref: isNyplOwned
            ? platformBib.isResearch
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

  buildCheckouts(checkouts: PatronServicesCheckout[]): Checkout[] {
    try {
      return checkouts
        .map((checkout: PatronServicesCheckout) => {
          const {
            dueDate,
            numberOfRenewals,
            sierraItem,
            platformItem,
            platformBib,
          } = checkout

          const bibId = platformBib?.id || null
          const isNyplOwned = MyAccount.getIsNyplOwned(platformBib)

          return {
            numberOfRenewals: numberOfRenewals,
            id: sierraItem?.id || null,
            callNumber: platformItem?.callNumber || null,
            barcode: platformItem?.barcode || null,
            dueDate: MyAccount.formatDate(dueDate),
            patron: this.patronId,
            title: MyAccount.getTitleDisplay(platformBib, isNyplOwned),
            volume: platformItem?.volume || null,
            isResearch: platformBib?.isResearch || false,
            bibId: bibId,
            isNyplOwned: isNyplOwned,
            catalogHref: isNyplOwned
              ? platformBib.isResearch
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

  buildLists = (
    listResults: ListResult[],
    bibDataMap: Record<string, any> = {}
  ): List[] => {
    return listResults.map((list: ListResult) => {
      return {
        id: list.id,
        patronId: list.patronId,
        listName: list.listName,
        description: list.description,
        recordCount: list.records?.length || 0,
        createdDate: formatMMDDYYYY(list.createdDate),
        modifiedDate: formatMMDDYYYY(list.modifiedDate),
        records: this.buildRecordsFromListResult(list, bibDataMap),
        isDefaultList: false,
      }
    })
  }

  buildRecordsFromListResult(
    result: ListResult,
    bibData?: Record<string, any>
  ): ListRecord[] {
    return result?.records?.length
      ? result.records.map((record) => {
          const bib = bibData?.[record.uri] || {}
          return buildListRecordWithBibData(record, bib)
        })
      : []
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

export const MyAccountFactory = async ({
  patronId,
  sierraClient = null,
  platformClient = null,
}) => {
  const patronFetcher = new MyAccount({
    sierraClient,
    platformClient,
    patronId,
  })
  const sierraData = await Promise.allSettled([
    getPickupLocations(sierraClient),
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
  const lists = await patronFetcher.getLists(patron.id.toString())
  return { pickupLocations, checkouts, holds, patron, fines, lists }
}
