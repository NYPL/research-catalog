import sierraClient from "../../src/server/sierraClient"

export async function fetchAccount(id: string) {
  const holdsQuery =
    "/holds?fields=pickupLocation,frozen,record,canFreeze,placed,notWantedBeforeDate,status,recordType,priority,pickupByDate,patron"
  const patronQuery =
    "?fields=names,barcodes,expirationDate,homeLibrary,emails,phones"
  const checkoutQuery = "/checkouts?expand=item"
  const finesQuery = "/fines"
  const baseQuery = "patrons/2772226"

  const client = await sierraClient()

  const checkouts = await client.get(`${baseQuery}${checkoutQuery}`)
  const holds = await client.get(`${baseQuery}${holdsQuery}`)
  const patron = await client.get(`${baseQuery}${patronQuery}`)
  const fines = await client.get(`${baseQuery}${finesQuery}`)
  return { checkouts: checkouts.entries, holds: holds.entries, patron, fines }
}

// Holds
// Checkout renewal
// Settings
