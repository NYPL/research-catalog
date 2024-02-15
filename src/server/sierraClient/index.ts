import wrapper from "@nypl/sierra-wrapper"
import { kmsDecryptCreds } from "../kms"

interface Cache {
  client: any
  key: string
  secret: string
}

const encryptedKey = process.env.SIERRA_KEY
const encryptedSecret = process.env.SIERRA_SECRET
const base = process.env.SIERRA_BASE

if (!encryptedKey || !base || !encryptedSecret) {
  console.error("Missing Sierra credentials")
}
const creds = [encryptedKey, encryptedSecret]
const CACHE: Cache = { client: null, key: null, secret: null }

const sierraClient = async () => {
  if (CACHE.client) return await Promise.resolve(CACHE.client)
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
    } catch (exception) {
      console.error("Error decrypting Sierra credentials")
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
    console.error(error.message)
  }
}

export default sierraClient
