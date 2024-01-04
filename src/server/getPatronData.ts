import { isEmpty } from "underscore"

import nyplApiClient from "./nyplApiClient"

type NoticePreference = "None" | "Email" | "Telephone"
interface PatronProps {
  isTokenValid: boolean
  userId: string
}
interface PatronObject {
  id: string
  names: string[]
  barcodes: string[]
  emails: string[]
  loggedIn: boolean
  moneyOwed?: number
  homeLibraryCode?: string
  patronType?: string
  expirationDate?: string
  phones?: string[]
  noticePreference?: NoticePreference
}

/**
 * extractNoticePreference(fixedFields)
 * Returns 'None', 'Email', or 'Telephone'.
 * @param {string} fixedFields - Object coming from patron object
 *  `fixedFields` property
 */
export function extractNoticePreference(fixedFields = {}): NoticePreference {
  if (isEmpty(fixedFields)) return "None"

  const noticePreferenceMapping = {
    z: "Email",
    p: "Telephone",
    "-": "None",
  }
  const noticePreferenceField = fixedFields["268"]

  if (!noticePreferenceField?.value) return "None"
  return noticePreferenceMapping[noticePreferenceField.value] || "None"
}

export async function getPatronData({
  isTokenValid = false,
  userId,
}: PatronProps) {
  let patron: PatronObject = {
    id: "",
    names: [],
    barcodes: [],
    emails: [],
    loggedIn: false,
  }

  if (isTokenValid && userId) {
    await nyplApiClient().then((client) => {
      client
        .get(`/patrons/${userId}`, { cache: false })
        .then((response) => {
          if (!isEmpty(response)) {
            const {
              id,
              names,
              emails,
              moneyOwed,
              homeLibraryCode,
              patronType,
              expirationDate,
              phones,
            } = response.data
            const barcodes = response.data.barCodes
            const noticePreference = extractNoticePreference(
              response.data.fixedFields
            )
            // Data exists for the Patron
            patron = {
              id,
              names,
              barcodes,
              emails,
              loggedIn: true,
              moneyOwed,
              homeLibraryCode,
              patronType,
              expirationDate,
              phones,
              noticePreference,
            }
          }
        })
        .catch((error) => {
          // TODO once logger is set up
          // logger.error(
          //   "Error attemping to make server side fetch call to patrons in getPatronData" +
          //     `, /patrons/${userId}`,
          //   error
          // )
          console.log("getPatronData", error)
        })
    })
  }

  return patron
}
