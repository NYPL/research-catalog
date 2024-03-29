import NyplApiClient from "@nypl/nypl-data-api-client"

import { appConfig } from "../../config/config"
import { kmsDecryptCreds } from "../kms"

interface KMSCache {
  clients: string[]
  id: string
  secret: string
}
const appEnvironment = appConfig.environment
const encryptedClientId = process.env.PLATFORM_API_CLIENT_ID
const encryptedClientSecret = process.env.PLATFORM_API_CLIENT_SECRET

const creds = [encryptedClientId, encryptedClientSecret]
const CACHE: KMSCache = { clients: [], secret: null, id: null }

export class NyplApiClientError extends Error {
  constructor(message: string) {
    super()
    this.message = "Error building NYPL data api client: " + message
  }
}

const nyplApiClient = async (options = { apiName: "platform" }) => {
  const { apiName } = options
  if (CACHE.clients[apiName]) {
    return CACHE.clients[apiName]
  }

  const baseUrl = appConfig.apiEndpoints[apiName][appEnvironment]

  let decryptedId: string
  let decryptedSecret: string
  if (CACHE.secret && CACHE.id) {
    decryptedId = CACHE.id
    decryptedSecret = CACHE.secret
  } else {
    try {
      ;[decryptedId, decryptedSecret] = await kmsDecryptCreds(creds)
      CACHE.id = decryptedId
      CACHE.secret = decryptedSecret
    } catch (exception) {
      throw new NyplApiClientError("Error decrypting creds")
    }
  }
  try {
    const nyplApiClient = new NyplApiClient({
      base_url: baseUrl,
      oauth_key: decryptedId,
      oauth_secret: decryptedSecret,
      oauth_url: appConfig.urls.tokenUrl,
    })
    CACHE.clients[apiName] = nyplApiClient
    return nyplApiClient
  } catch (error) {
    throw new NyplApiClientError(error.message)
  }
}

export default nyplApiClient
