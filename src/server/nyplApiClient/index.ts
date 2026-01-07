import NyplApiClient from "@nypl/nypl-data-api-client"

import { appConfig } from "../../config/config"
import { kmsDecryptCreds } from "../kms"
import logger from "../../../logger"

interface KMSCache {
  clients: object
  id: string
  secret: string
}
const appEnvironment = appConfig.environment
const encryptedClientId = process.env.PLATFORM_API_CLIENT_ID
const encryptedClientSecret = process.env.PLATFORM_API_CLIENT_SECRET

const creds = [encryptedClientId, encryptedClientSecret]
const CACHE: KMSCache = { clients: {}, secret: null, id: null }

export class NyplApiClientError extends Error {
  constructor(message: string) {
    super()
    this.message = "Error building NYPL data api client: " + message
  }
}

const nyplApiClient = async ({
  apiName = "platform",
  version = "v0.1",
} = {}) => {
  const clientCacheKey = `${apiName}${version}`
  if (CACHE.clients[clientCacheKey]) {
    return CACHE.clients[clientCacheKey]
  }

  const baseUrl = `${appConfig.apiEndpoints[apiName][appEnvironment]}/${version}`

  if (!encryptedClientId || !baseUrl || !encryptedClientSecret) {
    console.error("Missing Platform API credentials")
  }

  let decryptedId: string
  let decryptedSecret: string
  if (CACHE.secret && CACHE.id) {
    decryptedId = CACHE.id
    decryptedSecret = CACHE.secret
  } else {
    try {
      console.log("pre decryption", encryptedClientId, encryptedClientSecret)
      ;[decryptedId, decryptedSecret] = await kmsDecryptCreds(creds)

      CACHE.id = decryptedId
      CACHE.secret = decryptedSecret
    } catch (exception) {
      logger.info("Error decrypting creds")
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
    CACHE.clients[clientCacheKey] = nyplApiClient
    const get = nyplApiClient.get.bind(nyplApiClient)
    nyplApiClient.get = async function (path) {
      logger.info("Platform request", {
        path: `${baseUrl}${path}`,
        method: "GET",
      })
      return get(path)
    }
    const post = nyplApiClient.post.bind(nyplApiClient)
    nyplApiClient.post = async function (path, body) {
      logger.info("Platform request", {
        path: `${baseUrl}${path}`,
        method: "GET",
        body: JSON.stringify(body),
      })
      return post(path, body)
    }
    return nyplApiClient
  } catch (error) {
    logger.info(error.message)
    throw new NyplApiClientError(error.message)
  }
}

export default nyplApiClient
