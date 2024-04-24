import wrapper from "@nypl/sierra-wrapper"
import { kmsDecryptCreds } from "../kms"
import logger from "../../../logger"

interface Cache {
  client: any
  key: string
  secret: string
}

const encryptedKey = process.env.SIERRA_KEY
const encryptedSecret = process.env.SIERRA_SECRET
const base = process.env.SIERRA_BASE

if (!encryptedKey || !base || !encryptedSecret) {
  logger.error("Missing Sierra credentials")
}
const creds = [encryptedKey, encryptedSecret]
const CACHE: Cache = { client: null, key: null, secret: null }

export class SierraClientError extends Error {
  constructor(message: string) {
    super()
    this.message = "Error building Sierra Client: " + message
  }
}

const sierraClient = async () => {
  if (CACHE.client) return CACHE.client
  let decryptedKey: string
  let decryptedSecret: string
  if (CACHE.key && CACHE.secret) {
    decryptedKey = CACHE.key
    decryptedSecret = CACHE.secret
  } else {
    try {
      ;[decryptedKey, decryptedSecret] = await kmsDecryptCreds(creds)
      CACHE.key = decryptedKey
      CACHE.secret = decryptedSecret
    } catch (error) {
      throw new SierraClientError("Error decrypting creds")
    }
  }
  try {
    await wrapper.config({
      key: decryptedKey,
      secret: decryptedSecret,
      base: base,
    })

    CACHE.client = wrapper
    return wrapper
  } catch (error) {
    throw new SierraClientError(error.message)
  }
}

export default sierraClient
