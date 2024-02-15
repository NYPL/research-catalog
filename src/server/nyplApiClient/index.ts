import NyplApiClient from "@nypl/nypl-data-api-client"
import aws from "aws-sdk"

import { appConfig } from "../../config/config"
import { kmsDecryptCreds } from "../kms"

interface KMSCache {
  clients: string[]
  id: string
  secret: string
}
const appEnvironment = process.env.APP_ENV || "production"
const encryptedClientId = process.env.PLATFORM_API_CLIENT_ID
const encryptedClientSecret = process.env.PLATFORM_API_CLIENT_SECRET

const creds = [encryptedClientId, encryptedClientSecret]
const CACHE: KMSCache = { clients: [], secret: null, id: null }

const nyplApiClient = async (options = { apiName: "platform" }) => {
  const { apiName } = options
  if (CACHE.clients[apiName]) {
    return await Promise.resolve(CACHE.clients[apiName])
  }

  const baseUrl = appConfig.apiUrls[apiName][appEnvironment]

  let decryptedId: string
  let decryptedSecret: string
  if (CACHE.secret && CACHE.secret) {
    decryptedId = CACHE.id
    decryptedSecret = CACHE.secret
  } else {
    try {
      ;[decryptedId, decryptedSecret] = await kmsDecryptCreds(creds)
      CACHE.id = decryptedId
      CACHE.secret = decryptedSecret
    } catch (exception) {
      console.error("Error decrypting Sierra credentials")
    }
  }
  try {
    const nyplApiClient = new NyplApiClient({
      base_url: baseUrl,
      oauth_key: decryptedId,
      oauth_secret: decryptedSecret,
      oauth_url: appConfig.tokenUrl,
    })
    CACHE.clients[apiName] = nyplApiClient
    return nyplApiClient
  } catch (error) {
    console.error(error.message)
  }
}

export default nyplApiClient
