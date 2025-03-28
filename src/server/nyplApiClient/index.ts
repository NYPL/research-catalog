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
  // Hotfix to avoid adding v0.1 to DRB endpoint url.
  // TODO: Investigate the configuring of alternate versions of same endpoint without implicit appending of version number to url
  const baseUrl = `${appConfig.apiEndpoints[apiName][appEnvironment]}${
    version.length ? `/${version}` : ""
  }`

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
    CACHE.clients[clientCacheKey] = nyplApiClient
    const get = nyplApiClient.get.bind(nyplApiClient)
    nyplApiClient.get = async function (path) {
      logger.info(`GET ${baseUrl}/${path}`)
      return get(path)
    }
    const post = nyplApiClient.post.bind(nyplApiClient)
    nyplApiClient.post = async function (path, body) {
      logger.info(`POSTing ${JSON.stringify(body)} to ${baseUrl}/${path}`)
      return post(path, body)
    }
    return nyplApiClient
  } catch (error) {
    throw new NyplApiClientError(error.message)
  }
}

export default nyplApiClient
