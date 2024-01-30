import NyplApiClient from "@nypl/nypl-data-api-client"
import aws from "aws-sdk"

import { appConfig } from "../../config/config"

interface KMSCache {
  clients: string[]
  clientId: string
  clientSecret: string
}
const appEnvironment = process.env.APP_ENV || "production"
const clientId = process.env.PLATFORM_API_CLIENT_ID
const clientSecret = process.env.PLATFORM_API_CLIENT_SECRET

const keys = [clientId, clientSecret]
const CACHE: KMSCache = { clients: [], clientSecret, clientId }

const kms: aws.KMS = new aws.KMS({
  region: "us-east-1",
})

const decryptKMS = async (key: string) => {
  console.log("Decrypt func INPUT: " + key)
  const params = {
    CiphertextBlob: Buffer.from(key, "base64"),
  }
  const { Plaintext } = await kms.decrypt(params).promise()

  return await new Promise((resolve, reject) => {
    kms.decrypt(params, (err: Error) => {
      if (err) {
        console.log({ err })
        reject(err)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        resolve(Plaintext.toString())
      }
    })
  })
}

const nyplApiClient = async (options = { apiName: "platform" }) => {
  const { apiName } = options
  if (CACHE.clients[apiName]) {
    return await Promise.resolve(CACHE.clients[apiName])
  }

  const baseUrl = appConfig.apiUrls[apiName][appEnvironment]
  return await new Promise((resolve, reject) => {
    Promise.all(keys.map(decryptKMS))
      .then(([decryptedClientId, decryptedClientSecret]) => {
        const nyplApiClient = new NyplApiClient({
          base_url: baseUrl,
          oauth_key: decryptedClientId,
          oauth_secret: decryptedClientSecret,
          oauth_url: appConfig.tokenUrl,
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

export default nyplApiClient
