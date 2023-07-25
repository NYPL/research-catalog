import NyplApiClient from "@nypl/nypl-data-api-client"
import aws from "aws-sdk"

interface KMSCache {
  clients: string[]
  clientId: string
  clientSecret: string
}

const config: any = {
  api: {
    platform: {
      development:
        process.env.PLATFORM_API_BASE_URL ||
        "https://qa-platform.nypl.org/api/v0.1",
      production:
        process.env.PLATFORM_API_BASE_URL ||
        "https://platform.nypl.org/api/v0.1",
    },
    // The 'discovery' base URL should use DISCOVERY_API_BASE_URL if set,
    // falling back on PLATFORM_API_BASE_URL if set,
    // and finally falling back on a sensible default.
    discovery: {
      development:
        process.env.DISCOVERY_API_BASE_URL ||
        process.env.PLATFORM_API_BASE_URL ||
        "https://qa-platform.nypl.org/api/v0.1",
      production:
        process.env.DISCOVERY_API_BASE_URL ||
        process.env.PLATFORM_API_BASE_URL ||
        "https://platform.nypl.org/api/v0.1",
    },
    drbb: {
      development:
        process.env.DRB_API_BASE_URL || "http://drb-api-qa.nypl.org/search/",
      production:
        process.env.DRB_API_BASE_URL ||
        "https://digital-research-books-api.nypl.org/v3/sfr/search",
    },
  },
  tokenUrl: "https://isso.nypl.org/",
}
const appEnvironment = process.env.APP_ENV || "production"
const kmsEnvironment = process.env.KMS_ENV || "encrypted"
let decryptKMS
let kms

if (kmsEnvironment === "encrypted") {
  kms = new aws.KMS({
    region: "us-east-1",
  })
  // console.log({kms})

  decryptKMS = async (key: string) => {
    console.log("Decrypt func INPUT: " + key)
    const params = {
      CiphertextBlob: Buffer.from(key, "base64"),
    }
    const { Plaintext } = await kms.decrypt(params).promise()

    return await new Promise((resolve, reject) => {
      kms.decrypt(params, (err, data) => {
        if (err) {
          console.log({ err })
          reject(err)
        } else {
          resolve(Plaintext.toString())
        }
      })
    })
  }
}

const clientId = process.env.PLATFORM_API_CLIENT_ID
const clientSecret = process.env.PLATFORM_API_CLIENT_SECRET

const keys = [clientId, clientSecret]
const CACHE: KMSCache = { clients: [], clientSecret, clientId }

const nyplApiClient = async (options = { apiName: "platform" }) => {
  const { apiName } = options
  if (CACHE.clients[apiName]) {
    return await Promise.resolve(CACHE.clients[apiName])
  }

  const baseUrl = config.api[apiName][appEnvironment]

  if (kmsEnvironment === "encrypted") {
    return await new Promise((resolve, reject) => {
      Promise.all(keys.map(decryptKMS))
        .then(([decryptedClientId, decryptedClientSecret]) => {
          const nyplApiClient = new NyplApiClient({
            base_url: baseUrl,
            oauth_key: decryptedClientId,
            oauth_secret: decryptedClientSecret,
            oauth_url: config.tokenUrl,
          })

          CACHE.clientId = clientId
          CACHE.clientSecret = clientSecret
          CACHE.clients[apiName] = nyplApiClient

          resolve(nyplApiClient)
        })
        .catch((error) => {
          // TODO: add this once the Winston config is added.
          // logger.error('ERROR trying to decrypt using KMS.', error);
          reject(error)
        })
    })
  }

  const nyplApiClient = new NyplApiClient({
    base_url: baseUrl,
    oauth_key: clientId,
    oauth_secret: clientSecret,
    oauth_url: config.tokenUrl,
  })

  CACHE.clientId = clientId
  CACHE.clientSecret = clientSecret
  CACHE.clients[apiName] = nyplApiClient

  return await Promise.resolve(nyplApiClient)
}

export default nyplApiClient
